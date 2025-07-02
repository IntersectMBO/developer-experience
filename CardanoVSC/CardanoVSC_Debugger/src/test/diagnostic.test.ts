
import * as vscode from 'vscode';
import { spawn } from 'child_process';
import {
  startGhcidOnHaskellOpen,
  stopGhcid,
  updateErrorDecorations,
  diagnosticCollection,
  parseCabalErrors,
} from '../diagnostics';

jest.mock('vscode', () => {
  const actualVscode = jest.requireActual('vscode');

  const mockTextDocument = {
    uri: actualVscode.Uri.file('/home/kunal-kumar/cardanovsc_debugger/test/app/Main.hs'),
    fileName: '/home/kunal-kumar/cardanovsc_debugger/test/app/Main.hs',
    languageId: 'haskell',
    lineAt: jest.fn(() => ({ text: 'import Something' })),
    getText: jest.fn(() => ''),
    isClosed: false,
    version: 1,
    isDirty: false,
    isUntitled: false,
    eol: 1,
    save: jest.fn(),
    lineCount: 10,
  } as unknown as vscode.TextDocument;

  const mockEditor = {
    document: mockTextDocument,
    setDecorations: jest.fn(),
  } as unknown as vscode.TextEditor;

  return {
    ...actualVscode,
    StatusBarAlignment: { Left: 1, Right: 2 },
    OverviewRulerLane: { Left: 1, Center: 2, Right: 4 },
    window: {
      ...actualVscode.window,
      createStatusBarItem: jest.fn(() => ({
        show: jest.fn(),
        text: '',
        tooltip: '',
      })),
      createTextEditorDecorationType: jest.fn(() => ({
        dispose: jest.fn(),
      })),
      onDidChangeActiveTextEditor: jest.fn(),
      showErrorMessage: jest.fn(),
      get activeTextEditor() {
        return mockEditor;
      },
    },
    languages: {
      createDiagnosticCollection: jest.fn(() => mockDiagnosticCollection),
    },
    workspace: {
      ...actualVscode.workspace,
      rootPath: '/home/kunal-kumar/cardanovsc_debugger/test/app',
      onDidOpenTextDocument: jest.fn(),
      onDidChangeTextDocument: jest.fn(),
      textDocuments: [mockTextDocument],
    },
  };
});

// Mock Diagnostic Collection
export const mockDiagnosticCollection: vscode.DiagnosticCollection = {
  clear: jest.fn(),
  set: jest.fn(),
  get: jest.fn(() => [
    new vscode.Diagnostic(
      new vscode.Range(0, 0, 0, 10),
      'Mock error',
      vscode.DiagnosticSeverity.Error
    ),
  ]),
  delete: jest.fn(),
  forEach: jest.fn(),
  has: jest.fn(),
  dispose: jest.fn(),
  name: '',
  [Symbol.iterator]
    : function (): Iterator<[uri: vscode.Uri, diagnostics: readonly vscode.Diagnostic[]], any, any> {
      throw new Error('Function not implemented.');
    }
};

jest.mock('child_process', () => ({
  spawn: jest.fn().mockReturnValue({
    stdout: { on: jest.fn() },
    stderr: { on: jest.fn() },
    on: jest.fn(),
    kill: jest.fn(),
  }),
}));

describe('diagnostics.ts', () => {
  let context: vscode.ExtensionContext;
  const mockGhcidProcess = {
    stdout: { on: jest.fn() },
    stderr: { on: jest.fn() },
    on: jest.fn(),
    kill: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    context = { subscriptions: [] } as unknown as vscode.ExtensionContext;

    (spawn as jest.Mock).mockReturnValue(mockGhcidProcess);
  });

  it('should stop ghcid process correctly', () => {
    startGhcidOnHaskellOpen(context);
    stopGhcid();
    expect(mockGhcidProcess.kill).toHaveBeenCalled();
  });

  it('should start ghcid process on Haskell file open', () => {
    const mockSpawn = jest.fn().mockReturnValue({
      stdout: { on: jest.fn() },
      stderr: { on: jest.fn() },
      on: jest.fn(),
    });

    (spawn as jest.Mock) = mockSpawn;
    startGhcidOnHaskellOpen(context);

    expect(mockSpawn).toHaveBeenCalledWith('ghcid', ['--command', 'cabal repl'], {
      cwd: '/home/kunal-kumar/cardanovsc_debugger/test/app',
      shell: true,
    });
  });

  it('should parse Cabal errors and call set diagnostics', () => {
    const output = `
      /home/kunal-kumar/cardanovsc_debugger/test/app/Main.hs:1:1: error: some error message
      /home/kunal-kumar/cardanovsc_debugger/test/app/Main.hs:2:5: warning: some warning message
    `;

    parseCabalErrors(
      output,
      '/home/kunal-kumar/cardanovsc_debugger/test/app/Main.hs',
      vscode,
      mockDiagnosticCollection as any
    );

    expect(mockDiagnosticCollection.set).toHaveBeenCalled(); // Check that diagnostics were set
  });

  it('should update error decorations in active editor', () => {
    const fakeRange = new vscode.Range(0, 0, 0, 5);
    const fakeDiagnostic = new vscode.Diagnostic(
      fakeRange,
      'Mock error',
      vscode.DiagnosticSeverity.Error
    );

    mockDiagnosticCollection.get = jest.fn(() => [fakeDiagnostic]);

    (diagnosticCollection as any) = mockDiagnosticCollection;

    
    updateErrorDecorations();

    const editor = vscode.window.activeTextEditor!;
    expect(editor.setDecorations).toHaveBeenCalledWith(expect.anything(), [fakeRange]);
  });
});