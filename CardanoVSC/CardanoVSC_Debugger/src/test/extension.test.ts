jest.mock('vscode', () => {
    const original = jest.requireActual('vscode');
    return {
      ...original,
      window: {
        ...original.window,
        showInformationMessage: jest.fn(),
        showErrorMessage: jest.fn(),
        showWarningMessage: jest.fn(),
        createStatusBarItem: jest.fn(() => ({
          text: '',
          show: jest.fn(),
        })),
        activeTextEditor: {
          document: {
            languageId: 'haskell',
            fileName: '/path/to/file/Main.hs',
          },
        },
      },
      commands: {
        ...original.commands,
        registerCommand: jest.fn(),
      },
      debug: {
        ...original.debug,
        registerDebugConfigurationProvider: jest.fn(),
        registerDebugAdapterDescriptorFactory: jest.fn(),
      },
      DebugAdapterInlineImplementation: jest.fn().mockImplementation(() => {
        return {};
      }),
    };
  });
  
  jest.mock('../diagnostics', () => ({
    startGhcidOnHaskellOpen: jest.fn(),
  }));
  
  import * as vscode from 'vscode';
  import {
    activate,
    deactivate,
    HaskellConfigurationProvider,
    InlineDebugAdapterFactory,
  } from '../extension';
  import { startGhcidOnHaskellOpen } from '../diagnostics';
  
  const mockContext: any = {
    subscriptions: [],
    extensionPath: '/path/to/extension',
  };
  
  describe('Extension Activation', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('registers commands, providers, and diagnostics', async () => {
      await activate(mockContext);
  
      expect(vscode.commands.registerCommand).toHaveBeenCalledWith(
        'cardanovscDebugger.helloWorld',
        expect.any(Function)
      );
      expect(vscode.debug.registerDebugConfigurationProvider).toHaveBeenCalledWith(
        'haskell',
        expect.any(HaskellConfigurationProvider)
      );
      expect(vscode.debug.registerDebugAdapterDescriptorFactory).toHaveBeenCalledWith(
        'haskell',
        expect.any(InlineDebugAdapterFactory)
      );
      expect(startGhcidOnHaskellOpen).toHaveBeenCalledWith(mockContext);
    });
  });
  
  describe('Extension Deactivation', () => {
    it('logs deactivation message', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      deactivate();
      expect(logSpy).toHaveBeenCalledWith('Haskell Debugger extension deactivated');
    });
  });
  
  describe('HaskellConfigurationProvider', () => {
    let provider: HaskellConfigurationProvider;
  
    beforeEach(() => {
      jest.clearAllMocks();
      provider = new HaskellConfigurationProvider();
    });
  
    it('returns default config for Haskell files', async () => {
      const config = await provider.resolveDebugConfiguration(undefined, {
        type: 'haskell',
        name: 'Debug Haskell',
        request: 'launch',
      });
  
      expect(config).toEqual(
        expect.objectContaining({
          type: 'haskell',
          request: 'launch',
          program: 'cabal repl --repl-no-load',
          showIO: true,
        })
      );
    });
  
    it('returns undefined and shows error for non-Haskell files', async () => {
      Object.defineProperty(vscode.window, 'activeTextEditor', {
        value: {
          document: {
            languageId: 'javascript',
            fileName: 'index.js',
          },
        },
        configurable: true,
      });
  
      const showErrorMessageSpy = jest.spyOn(vscode.window, 'showErrorMessage');
  
      const config = await provider.resolveDebugConfiguration(undefined, {
        type: undefined,
        name: undefined,
        request: undefined,
      } as any);
  
      expect(showErrorMessageSpy).toHaveBeenCalledWith(
        "Please open a Haskell file or specify 'program' in your launch configuration"
      );
      expect(config).toBeUndefined();
    });
  });
  
  describe('InlineDebugAdapterFactory', () => {
    it('creates debug adapter descriptor successfully', () => {
      const factory = new InlineDebugAdapterFactory();
      const session = {} as vscode.DebugSession;
      const descriptor = factory.createDebugAdapterDescriptor(session);
      expect(descriptor).toBeDefined();
    });
  
    it('throws error when descriptor creation fails', () => {
      (vscode.DebugAdapterInlineImplementation as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Failed to create adapter');
      });
  
      const factory = new InlineDebugAdapterFactory();
  
      expect(() => factory.createDebugAdapterDescriptor({} as any)).toThrow(
        'Failed to create adapter'
      );
    });
  });
  