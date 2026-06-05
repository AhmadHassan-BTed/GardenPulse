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

module.exports = config;
