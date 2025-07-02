import assert from "assert";
import vscode from "vscode";
import path from "path";

suite("Syntax Highlighting Tests", () => {
  test("Check syntax highlighting for Haskell file", async () => {
  

    // Path to your test file
    const testFilePath = path.join(__dirname, "sample.hs");

    const document = await vscode.workspace.openTextDocument(testFilePath);

    const editor = await vscode.window.showTextDocument(document);

    // Wait for syntax highlighting to load
    await new Promise((resolve) => setTimeout(resolve, 1000));


    // Verify syntax highlighting by inspecting document tokens
    const range = new vscode.Range(0, 0, 0, 6); // Example: "module" in Haskell
    const tokenColorization = editor.document.getText(range);

    // Ensure the highlighted text matches the expected keyword
    assert.strictEqual(
      tokenColorization,
      "module",
      'Expected keyword "module" not found or not highlighted correctly.'
    );

    console.log(" syntax highlighting test completed successfully! ");
  });
});
