import * as assert from "assert";
import * as vscode from "vscode";

suite("Haskell Completion Contributor Test Suite", () => {
  test("Module Import Completions", async () => {

    const document = await vscode.workspace.openTextDocument({
      language: "haskell",
      content: "import ",
    });

    await vscode.window.showTextDocument(document);

    const completions = await getCompletions(
      document,
      new vscode.Position(0, 7)
    );

    // Check if "import" exists in completions
    assert.ok(
      completions.some((item: string) => item === "import"),
      'Completions should contain "import"'
    );
  });
});

/**
 * Helper function to get completion items at a specific position in the document.
 * @param document - The current text document.
 * @param position - The position to check for completions.
 * @returns An array of strings representing completion labels.
 */
async function getCompletions(
  document: vscode.TextDocument,
  position: vscode.Position
): Promise<any> {
  const completionList =
    await vscode.commands.executeCommand<vscode.CompletionList>(
      "vscode.executeCompletionItemProvider",
      document.uri,
      position
    );

  if (completionList && completionList.items) {
      return completionList.items.map((item) => item.label);
  }

  return [];
}
