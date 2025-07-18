import { IModulesConfig } from '../types';

import { QoqConfig } from '@/helpers/types';

interface IConfigHandler {
  getPrompts: () => Promise<void>;
  getConfigFromModules: () => QoqConfig;
  getModulesFromConfig: () => IModulesConfig;
}
export abstract class AbstractConfigHandler implements IConfigHandler {
  constructor(modulesConfig: IModulesConfig, config: QoqConfig) {
    this.modulesConfig = modulesConfig;
    this.config = config;
  }

  getPrompts(): Promise<void> {
    if (this.nextHandler) {
      return this.nextHandler.getPrompts();
    }

    return Promise.resolve();
  }
  getConfigFromModules(): QoqConfig {
    if (this.nextHandler) {
      return this.nextHandler.getConfigFromModules();
    }

    return this.config;
  }

  getModulesFromConfig(): IModulesConfig {
    if (this.nextHandler) {
      return this.nextHandler.getModulesFromConfig();
    }

    return this.modulesConfig;
  }

  setNext(handler: AbstractConfigHandler): AbstractConfigHandler {
    this.nextHandler = handler;

    return handler;
  }

  getPackages(): string[] {
    if (this.nextHandler) {
      return [...this.packages, ...this.nextHandler.getPackages()];
    }

    return this.packages;
  }

  protected modulesConfig: IModulesConfig;
  protected config: QoqConfig;
  private nextHandler: AbstractConfigHandler;
  protected packages: string[] = [];
}
