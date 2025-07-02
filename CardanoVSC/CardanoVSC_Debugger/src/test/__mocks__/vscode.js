
const Range = class {
    constructor(startLine, startCol, endLine, endCol) {
      this.start = { line: startLine, character: startCol };
      this.end = { line: endLine, character: endCol };
    }
  };
  
  const Diagnostic = class {
    constructor(range, message, severity) {
      this.range = range;
      this.message = message;
      this.severity = severity;
    }
  };
  
  let  mockSet = jest.fn();
  
  let _activeTextEditor = undefined;

  module.exports = {
    languages: {
      createDiagnosticCollection: jest.fn(() => ({
        set: mockSet,
        clear: jest.fn(),
        delete: jest.fn(),
      })),
    },
    window: {
      showInformationMessage: jest.fn(),
      showErrorMessage: jest.fn(),
      showTextDocument: jest.fn(),
      get activeTextEditor() {
        // Default mock return value, can be undefined or a mock editor object
        return _activeTextEditor;;
      },
      set activeTextEditor(value) {
        _activeTextEditor = value;
      },
    },
    workspace: {
      onDidSaveTextDocument: jest.fn(),
      getConfiguration: jest.fn(() => ({
        get: jest.fn(),
      })),
      textDocuments: [],
      openTextDocument: jest.fn(() =>
        Promise.resolve({
          uri: { fsPath: 'home/kunal-kumar/cardanovsc_debugger/test/app/Main.hs' },
          fileName: 'home/kunal-kumar/cardanovsc_debugger/test/app/Main.hs',
          isUntitled: false,
          languageId: 'haskell',
          version: 1,
          isDirty: false,
          isClosed: false,
          save: jest.fn(),
          eol: 1,
          lineCount: 1,
          lineAt: () => ({
            text: 'import Something',
            range: new Range(0, 0, 0, 16),
            rangeIncludingLineBreak: new Range(0, 0, 0, 17),
            firstNonWhitespaceCharacterIndex: 0,
            isEmptyOrWhitespace: false,
          }),
          getText: jest.fn(() => 'import Something'),
          getWordRangeAtPosition: jest.fn(),
          validateRange: jest.fn(),
          validatePosition: jest.fn(),
        })
      ),
    },
    Uri: {
      file: jest.fn((filePath) => ({ fsPath: filePath })),
    },
    DiagnosticSeverity: {
      Error: 0,
      Warning: 1,
      Information: 2,
      Hint: 3,
    },
    Range,
    Diagnostic,
    __mockSet__: mockSet, // <- exposed for your test
  };