
import * as vscode from "vscode";
import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import * as path from "path";

let ghcidProcess: ChildProcessWithoutNullStreams | undefined;
let statusBarItem: vscode.StatusBarItem;
let errorDecorationType: vscode.TextEditorDecorationType;

export let diagnosticCollection =
  vscode.languages.createDiagnosticCollection("haskell");

export function startGhcidOnHaskellOpen(context: vscode.ExtensionContext) {
  
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  statusBarItem.text = "Haskell";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Create error decoration type
  errorDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(255,0,0,0.1)",
    overviewRulerColor: "rgba(255,0,0,0.5)",
    overviewRulerLane: vscode.OverviewRulerLane.Right,
    gutterIconSize: "contain",
  });
  context.subscriptions.push(errorDecorationType);

  context.subscriptions.push(diagnosticCollection);

  // Start ghcid when a Haskell file is opened or changed
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument((document) => {
      if (document.languageId === "haskell") {
        startGhcidIfNeeded();
      }
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document.languageId === "haskell") {
        startGhcidIfNeeded();
      }
    })
  );

  // Check active document on startup
  if (vscode.window.activeTextEditor?.document.languageId === "haskell") {
    startGhcidIfNeeded();
  }

 
  context.subscriptions.push({
    dispose: () => {
      stopGhcid();
      diagnosticCollection.clear();
    },
  });

  
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateErrorDecorations)
  );
}

function startGhcidIfNeeded() {
  if (!ghcidProcess) {
    runGhcid();
  }
}

export function stopGhcid() {
  if (ghcidProcess) {
    ghcidProcess.kill();
    ghcidProcess = undefined;
  }
  statusBarItem.text = "Haskell";
  statusBarItem.tooltip = undefined;
}

let buffer = "";

function runGhcid() {
  stopGhcid(); // Ensure any existing process is stopped

  const rootPath = vscode.workspace.rootPath;
  if (!rootPath) {
    vscode.window.showErrorMessage("No workspace folder open");
    return;
  }

  try {
    ghcidProcess = spawn("ghcid", ["--command", "cabal repl"], {
      cwd: rootPath,
      shell: true, // Helps with command lookup on Windows
    });

    statusBarItem.text = "Haskell $(sync~spin)";
    statusBarItem.tooltip = "Haskell GHCi is running";

    ghcidProcess.stdout.on("data", (data) => {
      buffer += data.toString();
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; // Save incomplete line for next chunk

      processGhcidOutput(lines);
    });

    ghcidProcess.stderr.on("data", (data) => {
      console.error(`ghcid stderr: ${data}`);
      statusBarItem.text = "Haskell $(error)";
      statusBarItem.tooltip = "Haskell GHCi encountered an error";
    });

    ghcidProcess.on("error", (err) => {
      vscode.window.showErrorMessage(`Failed to start ghcid: ${err.message}`);
      statusBarItem.text = "Haskell $(error)";
      statusBarItem.tooltip = "Failed to start GHCi";
    });

    ghcidProcess.on("close", (code) => {
      ghcidProcess = undefined;
      statusBarItem.text = "Haskell $(stop)";
      statusBarItem.tooltip = "Haskell GHCi is not running";
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to run ghcid: ${error}`);
    statusBarItem.text = "Haskell $(error)";
    statusBarItem.tooltip = "Failed to start GHCi";
  }
}

function processGhcidOutput(lines: string[]) {
  const diagnosticsMap: Map<string, vscode.Diagnostic[]> = new Map();
  let currentError: {
    file: string;
    line: number;
    col: number;
    severity: vscode.DiagnosticSeverity;
    message: string[];
  } | null = null;
  const flushCurrentError = () => {
    if (!currentError) {
      return;
    }
    const filePath = path.resolve(
      vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || "",
      currentError.file
    );
    const fileUri = vscode.Uri.file(filePath);
    const lineNum = Math.max(0, currentError.line - 1);
    const colNum = Math.max(0, currentError.col - 1);
    const document = vscode.workspace.textDocuments.find(
      (doc) => doc.uri.fsPath === fileUri.fsPath
    );
    let range: vscode.Range;
    let cleanedMessage = currentError.message
      .filter((line) => !/^\s*\d+\s*\|/.test(line)) // Remove code context lines
      .join("\n")
      .trim();
    if (document) {
      try {
        const lineText = document.lineAt(lineNum).text;
        
        if (lineText.trim().startsWith("import")) {
          const importStart = lineText.indexOf("import");
          range = new vscode.Range(
            lineNum,
            importStart,
            lineNum,
            lineText.length
          );
         
          cleanedMessage = `Import error: ${cleanedMessage}`;
        } else {
          
          let endCol = colNum + 1;
         
          while (endCol < lineText.length && !/\s/.test(lineText[endCol])) {
            endCol++;
          }
          range = new vscode.Range(lineNum, colNum, lineNum, endCol);
        }
      } catch {
        
        range = new vscode.Range(lineNum, colNum, lineNum, colNum + 1);
      }
    } else {
      
      range = new vscode.Range(lineNum, colNum, lineNum, colNum + 1);
    }
    const diagnostic = new vscode.Diagnostic(
      range,
      cleanedMessage,
      currentError.severity
    );
    diagnostic.source = "ghcid";
    diagnostic.code = "ghcid";
    const existing = diagnosticsMap.get(fileUri.fsPath) || [];
    existing.push(diagnostic);
    diagnosticsMap.set(fileUri.fsPath, existing);
    currentError = null;
  };

  let hasErrors = false;
  for (const line of lines) {
    if (line.includes("All good")) {
      statusBarItem.text = "Haskell $(check)";
      statusBarItem.tooltip = "Haskell: No errors";
      diagnosticCollection.clear();
      updateErrorDecorations();
      return;
    }
    if (line.includes("Loading...") || line.includes("Ok, modules loaded:")) {
      continue;
    }
   
    const errorMatch = line.match(
      /^(.+?):(\d+):(\d+)(?:-(\d+))?:\s*(error|warning|\[error\]|\[warning\]):?\s*(.*)/
    );
    if (errorMatch) {
      flushCurrentError();
      hasErrors = true;
      currentError = {
        file: errorMatch[1],
        line: parseInt(errorMatch[2]),
        col: parseInt(errorMatch[3]),
        severity: errorMatch[5].toLowerCase().includes("error")
          ? vscode.DiagnosticSeverity.Error
          : vscode.DiagnosticSeverity.Warning,
        message: [errorMatch[6].trim()],
      };
    } else if (currentError && line.trim()) {
      currentError.message.push(line.trim());
    }
  }
  flushCurrentError();
  if (hasErrors) {
    statusBarItem.text = "Haskell $(error)";
    statusBarItem.tooltip = "Haskell: Errors detected";
    // Update diagnostics
    diagnosticCollection.clear();
    diagnosticsMap.forEach((diags, file) => {
      diagnosticCollection.set(vscode.Uri.file(file), diags);
    });
  }
  updateErrorDecorations();
}

export function updateErrorDecorations() {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor || activeEditor.document.languageId !== "haskell") {
    return;
  }

  const diagnostics = diagnosticCollection.get(activeEditor.document.uri) || [];
  const errorRanges = diagnostics
    .filter((d) => d.severity === vscode.DiagnosticSeverity.Error)
    .map((d) => d.range);

  activeEditor.setDecorations(errorDecorationType, errorRanges);
}

export function parseCabalErrors(
  output: string,
  workspacePath: string,
  vscodeModule: typeof vscode = vscode,
  _diagCollection: vscode.DiagnosticCollection = diagnosticCollection
): vscode.Diagnostic[] {
  _diagCollection.clear();
  const diagnosticsMap: Map<string, vscode.Diagnostic[]> = new Map();
  let firstErrorUri: vscode.Uri | null = null;
  let firstErrorRange: vscode.Range | null = null;

  const errorRegex =
    /^\s*(?<file>.+):(?<line>\d+):(?<column>\d+):\s+(?<type>error|warning|info):\s+(?<message>[\s\S]+?)(?=\n\S|$)/gm;

  let match;
  while ((match = errorRegex.exec(output)) !== null) {
    const { file, line, column, type } = match.groups!;
    let message = match.groups!.message.trim();
    const severity = getDiagnosticSeverity(type, vscodeModule);

    const filePath = path.resolve(workspacePath, file);
    const fileUri = vscodeModule.Uri.file(filePath);

    const lineNum = parseInt(line) - 1;
    const colNum = parseInt(column) - 1;

    const document = vscodeModule.workspace.textDocuments.find(
      (doc) => doc.fileName === filePath
    );
    if (!document) {
      continue;
    }

    const lineText = document.lineAt(lineNum).text;
    const substringFromCol = lineText.substring(colNum);
    let nextSpaceIndex = substringFromCol.indexOf(" ");
    if (nextSpaceIndex === -1) {
      nextSpaceIndex = substringFromCol.length;
    }

    let errorLength = nextSpaceIndex;
    if (substringFromCol.startsWith("import")) {
      errorLength = substringFromCol.length;
    }

    const range = new vscodeModule.Range(
      lineNum,
      colNum,
      lineNum,
      colNum + errorLength
    );
    const diagnostic = new vscodeModule.Diagnostic(range, message, severity);

    if (!diagnosticsMap.has(fileUri.fsPath)) {
      diagnosticsMap.set(fileUri.fsPath, []);
    }
    diagnosticsMap.get(fileUri.fsPath)?.push(diagnostic);

    if (
      firstErrorUri === null &&
      severity === vscodeModule.DiagnosticSeverity.Error
    ) {
      firstErrorUri = fileUri;
      firstErrorRange = range;
    }
  }

  for (const [file, diagnostics] of diagnosticsMap.entries()) {
    _diagCollection.set(vscodeModule.Uri.file(file), diagnostics);
  }

  if (firstErrorUri && firstErrorRange) {
    vscodeModule.workspace.openTextDocument(firstErrorUri).then((doc) => {
      vscodeModule.window.showTextDocument(doc, { selection: firstErrorRange });
    });
  }

  return Array.from(diagnosticsMap.values()).flat();
}

function getDiagnosticSeverity(
  severity: string,
  vscodeModule: typeof vscode
): vscode.DiagnosticSeverity {
  switch (severity) {
    case "error":
      return vscodeModule.DiagnosticSeverity.Error;
    case "warning":
      return vscodeModule.DiagnosticSeverity.Warning;
    case "info":
      return vscodeModule.DiagnosticSeverity.Information;
    default:
      return vscodeModule.DiagnosticSeverity.Error;
  }
}
