const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

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

// Custom resolveRequest logic
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Alias react-native-google-mobile-ads to mock on Web to prevent native module import errors
  if (platform === 'web' && moduleName === 'react-native-google-mobile-ads') {
    const mockPath = path.resolve(__dirname, 'services/admob-mock.js');
    return context.resolveRequest(context, mockPath, platform);
  }

  // Force Zustand to use CommonJS to avoid 'import.meta' error in browser
  if (moduleName === 'zustand' || moduleName.startsWith('zustand/')) {
    const result = require.resolve(moduleName);
    return context.resolveRequest(context, result, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;

