// export_data/data.ts
import { ExtensionContext } from "vscode";
import { getFirstNetworkConfig } from "../config/cardanoNodeIntegration";
import { initializeLucid } from "../implementation/implementation";

export const data = (context: ExtensionContext) => ({
  getFirstNetworkConfig: () => getFirstNetworkConfig(context),
  initializeLucid,
});
