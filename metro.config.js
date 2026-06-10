const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const blacklistRE = /[\\/\\\\]\.agents[\\/\\\\]/;

if (Array.isArray(config.resolver.blockList)) {
  config.resolver.blockList.push(blacklistRE);
} else if (config.resolver.blockList) {
  const originalBlockList = config.resolver.blockList;
  config.resolver.blockList = [blacklistRE, originalBlockList];
} else {
  config.resolver.blockList = [blacklistRE];
}

// Force Zustand to use CommonJS to avoid 'import.meta' error in browser
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'zustand' || moduleName.startsWith('zustand/')) {
    const result = require.resolve(moduleName);
    return context.resolveRequest(context, result, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
