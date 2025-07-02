import { extensionCommand } from "./registerCommand";
import vscode from "vscode";
import { haskellProvider } from "./completion";
import { integrateCardanoAPI } from "./config/cardanoApiIntegration";
import { MyWebviewViewProvider } from "./webviewProvider";
import { createStatusBarItem, registerDeleteNetworkCommand, registerNetworkCommand } from "./config/cardanoNodeIntegration";
import { data } from "./export_data/data";


export function activate(context: vscode.ExtensionContext) {
  

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      MyWebviewViewProvider.viewType,
      new MyWebviewViewProvider(context,context.extensionUri)
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("cardanovsc.helloWorld", () => {
      vscode.window.showInformationMessage("Hello World from CardanoVSC!");
    })
  );
  context.subscriptions.push(haskellProvider);
  context.subscriptions.push(
    vscode.commands.registerCommand("cardano.apiIntegration", async () => {
     const valid= await integrateCardanoAPI(vscode, context);
     
    })
  );
  new extensionCommand(context);
  //status bar
  createStatusBarItem(context);
  registerNetworkCommand(context,context.extensionUri);
  registerDeleteNetworkCommand(context,context.extensionUri);
 
  return data(context);
 
}
export function deactivate() {}