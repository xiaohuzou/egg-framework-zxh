'use strict';

const path = require('path');
const egg = require('egg');
const EGG_PATH = Symbol.for('egg#eggPath');
const EGG_LOADER = Symbol.for('egg#loader');

class EggFrameworkZxhAppWorkerLoader extends egg.AppWorkerLoader {
  load() {
    super.load();
    // 自己扩展
  }
}

class Application extends egg.Application {
  get [EGG_PATH]() {
    return path.dirname(__dirname);
  }
  // 覆盖 Egg 的 loader，启动时使用这个 Loader
  get [EGG_LOADER]() {
    return EggFrameworkZxhAppWorkerLoader;
  }
}

class EggFrameworkZxhAgentWorkerLoader extends egg.AgentWorkerLoader {
  load() {
    super.load();
    // 自己扩展
  }
}

class Agent extends egg.Agent {
  get [EGG_PATH]() {
    return path.dirname(__dirname);
  }
  // 覆盖 Egg 的 loader，启动时使用这个 Loader
  get [EGG_LOADER]() {
    return EggFrameworkZxhAgentWorkerLoader;
  }
}

module.exports = Object.assign(egg, {
  Application,
  // 自定义的 Loader 也需要 export，上层框架需要基于这个扩展
  AppWorkerLoader: EggFrameworkZxhAppWorkerLoader,
  Agent,
  // 自定义的 Loader 也需要 export，上层框架需要基于这个扩展
  AgentWorkerLoader: EggFrameworkZxhAgentWorkerLoader,
});
