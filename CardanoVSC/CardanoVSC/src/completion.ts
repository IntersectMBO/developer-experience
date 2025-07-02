import * as vscode from "vscode";
import * as path from "path";
import * as glob from "glob";
import fs from "fs";
export const haskellProvider = vscode.languages.registerCompletionItemProvider(
  { language: "haskell", scheme: "file" },
  {
    async provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position,
      _token: vscode.CancellationToken,
      _context: vscode.CompletionContext
    ): Promise<vscode.CompletionItem[]> {
      const completions: vscode.CompletionItem[] = [];

      //module name after import or qualified
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        return completions;
      }
      let linePrefix = document
        .lineAt(position)
        .text.substr(0, position.character)
        .trim();

      if (
        linePrefix.startsWith("import") ||
        linePrefix.startsWith("import qualified")
      ) {
        const rootPath = workspaceFolders[0].uri.fsPath;
        // const hsFiles = glob.sync(path.join(rootPath, '/**/*.hs')); // Search for .hs files in all folders
        const hsFiles = glob.sync("**/*.hs", {
          cwd: rootPath,
          absolute: true,
          windowsPathsNoEscape: true,
        });
        hsFiles.forEach((file: string) => {
          const filePath = path.normalize(file);

          let moduleName = extractModuleName(filePath);

          if (moduleName) {
            const completionItem = new vscode.CompletionItem(
              moduleName,
              vscode.CompletionItemKind.Module
            );
            completionItem.insertText = moduleName; // Insert the module name
            completionItem.sortText = "0";
            completionItem.detail = `Module: ${moduleName}`;
            // Convert file path to a clickable link
            const fileUri = vscode.Uri.file(filePath);
            completionItem.documentation = new vscode.MarkdownString(
              `[Open File](${fileUri.toString()})`
            );

            completions.push(completionItem);
          }
        });

        // Modules
        const modules = [
          "Caradano.Api",
          "Data.List",
          "Control.Monad",
          "Prelude",
          "Plutus.Contract",
          "Plutus.V2.Ledger.Contexts",
          "Data.Maybe",
          "Data.Either",
          "Control.Applicative",
          "Data.Functor",
          "Data.Tuple",
          "Control.Concurrent",
          "System.IO",
          "Data.Text",
          "Data.Map",
          "Data.Set",
          "Control.Monad.Trans",
          "Control.Monad.State",
          "Ledger.Value",
          "Plutus.V2.Ledger.Api",
          "Data.ByteString",
          "PlutusTx.Builtins.Internal",
        ];
        modules.forEach((module) => {
          const item = new vscode.CompletionItem(
            module,
            vscode.CompletionItemKind.Module
          );
          item.insertText = module;
          item.detail = "Haskell Module";
          item.sortText = "1";
          item.documentation = `Import the ${module} module into your Haskell file.`;
          completions.push(item);
        });
      }
      // Functions
      const functions = [
        {
          label: "map",
          detail: "Applies a function to each element of a list.",
        },
        { label: "filter", detail: "Filters a list based on a predicate." },
        { label: "foldl", detail: "Left fold." },
        { label: "foldr", detail: "Right fold." },
        { label: "fold", detail: "Fold operation." },
        { label: "length", detail: "Returns the length of a list." },
        { label: "sum", detail: "Calculates the sum of a list of numbers." },
        {
          label: "txSignedBy",
          detail: "Checks if a transaction is signed by a given public key.",
        },
        { label: "concat", detail: "Concatenates a list of lists." },
        { label: "zip", detail: "Combines two lists into a list of pairs." },
        { label: "take", detail: "Takes the first n elements from a list." },
        { label: "drop", detail: "Drops the first n elements from a list." },
        { label: "reverse", detail: "Reverses a list." },
        { label: "elem", detail: "Checks if an element is in a list." },
        { label: "not", detail: "Logical negation." },
        { label: "&&", detail: "Logical conjunction." },
        { label: "||", detail: "Logical disjunction." },
        { label: "mapM", detail: "Maps a monadic function over a list." },
        {
          label: "sequence",
          detail:
            "Transforms a list of actions into an action that produces a list.",
        },
        { label: "liftM", detail: "Lifts a function to a monadic context." },
        { label: "join", detail: "Flattens a monadic value." },
        { label: "Num", detail: "haskell function" },
        { label: "GT", detail: "haskell function" },
        { label: "LT", detail: "haskell function" },

        { label: "getLine", detail: "haskell function" },
        { label: "Nothing", detail: "haskell function" },
        { label: "compile", detail: "haskell function" },
      ];
      functions.forEach((fn) => {
        const item = new vscode.CompletionItem(
          fn.label,
          vscode.CompletionItemKind.Function
        );
        item.detail = fn.detail;
        item.documentation = `Usage: ${fn.label}(...)`;
        completions.push(item);
      });

      // Pragmas
      const pragmas = [
        "LANGUAGE ",
        "WARNING ",
        "DEPRECATED ",
        "INLINE ",
        "NOINLINE ",
        "INLINABLE ",
        "RULES ",
        "ANN ",
        "LINE ",
        "SPECIALIZE ",
        "UNPACK ",
        "SOURCE ",
        "SCC ",
        "LANGUAGE GADTs",
        "LANGUAGE TypeFamilies",
        "LANGUAGE MultiParamTypeClasses",
        "#-}",
        "{-#",
        "Prelude",
      ];
      pragmas.forEach((pragma) => {
        const item = new vscode.CompletionItem(
          pragma,
          vscode.CompletionItemKind.Snippet
        );
        item.detail = "Haskell Pragma";
        item.documentation = `Insert the ${pragma.trim()} pragma.`;
        item.insertText = pragma;
        completions.push(item);
      });

      // Keywords
      const keywords = [
        "BuiltinData",
        "Float",
        "Integer",
        "True",
        "False",
        "ordering",
        "do",
        "elem",
        "notElem",
        "data",
        "type",
        "where",
        "module",
        "let",
        "in",
        "case",
        "of",
        "import",
        "instance",
        "newtype",
        "deriving",
        "if",
        "then",
        "else",
        "do",
        "as",
        "qualified",
        "hiding",
        "forall",
        "infix",
        "infixl",
        "infixr",
        "class",
        "instance",
        "default",
        "foreign",
        "inline",
        "noinline",
        "typeClass",
        "typefamily",
        "let",
        "in",
        "if",
        "then",
        "else",
        "submitTx",
        "all",
        "abs",
        "accum",
        "alreadyInUseErrorType",
        "alreadyExistsErrorType",
        "acos",
        "accumArray",
        "annotateIOError",
        "array",
        "asTypeOf",
        "partition",
        "permissionErrorType",
        "permutations",
        "phase",
        "pi",
        "polar",
        "posixTimeFromIso8601",
        "print",
        "printDataToJSON",
        "product",
        "program",
        "properFraction",
        "pure",
        "putChar",
        "putStr",
        "bit",
        "bitSize",
        "bounds",
        "break",
        "calculate",
        "catch",
        "catMaybes",
        "ceiling",
        "clearBit",
        "compare",
        "complement",
        "concat",
        "concatMap",
        "const",
        "curry",
        "cycle",
        "writePolicyToFile",
        "writeCodeToFile",
        "toBuiltinData",
        "writeValidatorToFile",
        "unstableMakeIsData",
        "traceIfFalse",
        "unless",
        "untypedValidator",
        "displayError",
        "from",
        "deadline",
        "getTxId",
        "mkValidator",
        "txSignedBy",
        "decodeFloat",
        "delete",
        "deleteBy",
        "deleteFirstBy",
        "digitToInt",
        "div",
        "divMod",
        "doesNotExistErrorType",
        "drop",
        "dropWhile",
        "elemIndex",
        "encodeFloat",
        "enumFrom",
        "enumFromThen",
        "enumFromTo",
        "eofErrorType",
        "error",
        "exitFailure",
        "exitSuccess",
        "exitWith",
        "exp",
        "exponent",
        "fail",
        "filterM",
        "find",
        "findIndex",
        "fixIO",
        "flip",
        "floatDigits",
        "floatRadix",
        "floatRange",
        "floor",
        "foldM",
        "foreign",
        "forM",
        "fromEnum",
        "fromIntegral",
        "fromJust",
        "fromMaybe",
        "fromRat",
        "fromRational",
        "fullErrorType",
        "genericIndex",
        "genericLength",
        "genericReplicate",
        "genericSplitAt",
        "genericTake",
        "getArgs",
        "getContents",
        "getEnv",
        "getProgName",
        "guard",
        "groupBy",
        "inRange",
        "insertBy",
        "interact",
        "intersect",
        "intersectBy",
        "intersperse",
        "intToDigit",
        "ioeGetErrorString",
        "ioeGetFileName",
        "ioeGetHandle",
        "ioError",
        "isAlpha",
        "isAlreadyExistsError",
        "isAlreadyInUseError",
        "isAscii",
        "isControl",
        "isDigit",
        "isFullError",
        "isHexDigit",
        "isLetter",
        "isLower",
        "isMark",
        "isNegativeZero",
        "isNothing",
        "isNumber",
        "isOctDigit",
        "isSpace",
        "isUpper",
        "isSymbol",
        "join",
        "last",
        "lcm",
        "length",
        "lex",
        "lexDigits",
        "letLitChar",
        "lines",
        "list",
        "listArray",
        "log",
        "lookup",
        "magnitude",
        "max",
        "maxBound",
        "maximum",
        "mkIOError",
        "mkPolar",
        "mod",
        "minimum",
        "min",
        "max",
        "not",
        "numerator",
        "odd",
        "openFile",
        "otherwise",
        "partition",
        "pi",
        "pkh",
        "plutus",
        "printVestingDatumJSON",
        "product",
        "qualified",
        "range",
        "raedHex",
        "readInt",
        "readIO",
        "readList",
        "readOct",
        "repeat",
        "readSigned",
        "return",
        "rotate",
        "tail",
        "take",
        "time",
        "toInteger",
        "toEnum",
        "then",
        "toInteger",
        "try",
        "txInfoValidRange",
        "txSignedBy",
        "union",
        "unionBy",
        "unless",
        "unstableMakeIsData",
        "unzip",
        "unzip3",
        "unzip4",
        "useError",
        "useErrorType",
        "validator",
        "vesting",
        "void",
        "vestingAddressBech32",
        "validatorAddressBech32",
        "wrapValidator",
        "writeFile",
        "writeValidatorToFile",
        "xor",
        "zip3",
        "zip4",
        "Num",
        "foldl'",
      ];
      keywords.forEach((keyword) => {
        const item = new vscode.CompletionItem(
          keyword,
          vscode.CompletionItemKind.Keyword
        );
        item.label = keyword;
        item.sortText = "2";

        item.detail = "haskell keyword";
        completions.push(item);
      });

      // Operators
      const operators = [
        // Arithmetic Operators
        { label: "+", detail: "Addition" },
        { label: "-", detail: "Subtraction" },
        { label: "*", detail: "Multiplication" },
        { label: "/", detail: "Division" },
        { label: "`mod`", detail: "Modulo operation" },
        { label: "`div`", detail: "Integer division" },

        // Comparison Operators
        { label: "==", detail: "Equality" },
        { label: "/=", detail: "Inequality" },
        { label: "<", detail: "Less than" },
        { label: ">", detail: "Greater than" },
        { label: "<=", detail: "Less than or equal to" },
        { label: ">=", detail: "Greater than or equal to" },

        // Logical Operators
        { label: "&&", detail: "Logical AND" },
        { label: "||", detail: "Logical OR" },
        { label: "not", detail: "Logical negation" },

        // List Operators
        { label: "++", detail: "List concatenation" },
        { label: ":", detail: "Cons (prepend an element to a list)" },

        // Function Operators
        { label: "$", detail: "Function application" },
        { label: ".", detail: "Function composition" },

        // Other Operators
        { label: ">>", detail: "Monadic sequence" },
        { label: ">>=", detail: "Monadic bind" },
        { label: "<-", detail: "Do-notation binding" },
        { label: "~", detail: "Lazy pattern match" },
        { label: "->", detail: "Function type or lambda expression" },
        { label: "<*>", detail: "Applicative function application" },
        { label: "<|>", detail: "Alternative choice" },
      ];

      operators.forEach((op) => {
        const item = new vscode.CompletionItem(
          op.label,
          vscode.CompletionItemKind.Operator
        );
        item.detail = op.detail;
        item.sortText = "3";

        completions.push(item);
      });

      // Plutus Identifiers
      const plutusIdentifiers = [
        { label: "Ledger", detail: "Represents the on-chain ledger system" },
        {
          label: "PlutusTx",
          detail: "Contains functions and utilities for Plutus code",
        },
        { label: "Contract", detail: "Defines a Plutus smart contract" },
        { label: "mkValidator", detail: "Creates a custom validator script" },
        {
          label: "txSignedBy",
          detail: "Checks if a transaction is signed by a specific public key",
        },
        {
          label: "BuiltinByteString",
          detail: "Represents a built-in byte string",
        },
        { label: "Validator", detail: "A Plutus validator script" },
        { label: "Redeemer", detail: "The redeemer type for a script" },
        { label: "Datum", detail: "The datum type for a script" },
        {
          label: "TxOutRef",
          detail: "Represents a reference to a transaction output",
        },
        {
          label: "ScriptContext",
          detail: "Provides contextual information about the transaction",
        },
        { label: "PubKeyHash", detail: "Represents a public key hash" },
        { label: "Address", detail: "Represents a blockchain address" },
        { label: "TxInfo", detail: "Details about the transaction" },
      ];

      plutusIdentifiers.forEach((identifier) => {
        const item = new vscode.CompletionItem(
          identifier.label,
          vscode.CompletionItemKind.Class
        );
        item.detail = identifier.detail;
        completions.push(item);
      });

      // Type Classes
      const typeClasses = [
        {
          label: "Eq",
          detail:
            "Equality type class for types that can be compared for equality",
        },
        {
          label: "Ord",
          detail:
            "Ordering type class for types that can be compared for ordering",
        },
        {
          label: "Show",
          detail: "Type class for converting values to strings",
        },
        {
          label: "Functor",
          detail: "Type class for types that can be mapped over",
        },
        {
          label: "Monad",
          detail: "Type class for types supporting monadic operations",
        },
      ];

      typeClasses.forEach((typeClass) => {
        const item = new vscode.CompletionItem(
          typeClass.label,
          vscode.CompletionItemKind.Class
        );
        item.detail = typeClass.detail;
        completions.push(item);
      });

      // Haskell Types
      const types = [
        { label: "Int", detail: "Represents integers" },
        { label: "Bool", detail: "Represents boolean values (True or False)" },
        { label: "Char", detail: "Represents a single character" },
        {
          label: "String",
          detail: "Represents a sequence of characters (i.e., text)",
        },
        { label: "Float", detail: "Represents floating point numbers" },
        {
          label: "Double",
          detail: "Represents double precision floating point numbers",
        },
        {
          label: "Maybe",
          detail: "Represents a value that may or may not exist",
        },
        { label: "List", detail: "Represents a list of elements" },
        {
          label: "Tuple",
          detail: "Represents a tuple, a fixed-size collection of elements",
        },
        {
          label: "Either",
          detail:
            "Represents a value that can be one of two types (a disjunction)",
        },
        {
          label: "IO",
          detail:
            "Represents a computation that performs I/O and produces a result",
        },
        { label: "Function", detail: "Represents a function type" },
        { label: "Map", detail: "Represents a collection of key-value pairs" },
        { label: "Set", detail: "Represents a collection of unique values" },
        { label: "CustomType", detail: "Represents a user-defined type" },
        {
          label: "User DefinedType",
          detail: "Represents any user-defined type in Haskell",
        },
        { label: "Monad", detail: "Represents a type class for monads" },
        { label: "Functor", detail: "Represents a type class for functors" },
        {
          label: "Applicative",
          detail: "Represents a type class for applicatives",
        },
      ];

      types.forEach((type) => {
        const item = new vscode.CompletionItem(
          type.label,
          vscode.CompletionItemKind.Class
        );
        item.detail = type.detail;
        completions.push(item);
      });

      return completions;
    },
  },
  ".",
  " "
);

// Function to extract the module name from the Haskell source file
function extractModuleName(filePath: string) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const moduleMatch = fileContent.match(
      /^\s*module\s+([\w\.]+)\s*(?:where)?/m
    );
    if (moduleMatch && moduleMatch[1]) {
      return moduleMatch[1]; // Return the module name
    }
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
  }
  return null;
}
