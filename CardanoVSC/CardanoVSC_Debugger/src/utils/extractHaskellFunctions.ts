import * as fs from "fs/promises";

interface HaskellFunction {
  name: string;
  args: string[];
  body: string[];
}


export async function extractHaskellFunctions(filePath: string): Promise<HaskellFunction[]> {
  const content = await fs.readFile(filePath, "utf8");
  const lines = content.split("\n");

  const functionRegex = /^([a-zA-Z_][a-zA-Z0-9_']*)\s+((?:[^=]*)?)=\s*(.*)$/;

  const skipKeywords = ["data", "type", "newtype", "instance", "class", "module", "import", "{-#", "--"];

  const functions: HaskellFunction[] = [];
  let currentFunc: HaskellFunction | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed || skipKeywords.some((kw) => trimmed.startsWith(kw))) {
      continue;
    }

    const match = trimmed.match(functionRegex);

    if (match) {
      if (currentFunc) {
        functions.push(currentFunc);
      }

      const name = match[1];
      const rawArgs = match[2].trim();
      const bodyLine = match[3].trim();

      const args = rawArgs
        ? extractArguments(rawArgs)
        : [];

      currentFunc = {
        name,
        args,
        body: [bodyLine],
      };
    } else if (currentFunc && /^\s+/.test(line)) {
      currentFunc.body.push(trimmed);
    } else {
      if (currentFunc) {
        functions.push(currentFunc);
        currentFunc = null;
      }
    }
  }

  if (currentFunc) {
    functions.push(currentFunc);
  }

  return functions;
}


function extractArguments(argStr: string): string[] {
  const args: string[] = [];
  let buffer = "";
  let parens = 0;

  for (const char of argStr) {
    if (char === "(") {parens++;}
    if (char === ")") {parens--;}

    if (char === " " && parens === 0) {
      if (buffer) {
        args.push(buffer);
        buffer = "";
      }
    } else {
      buffer += char;
    }
  }

  if (buffer) {args.push(buffer);}

  return args;
}
