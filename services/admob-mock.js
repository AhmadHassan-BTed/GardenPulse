// Mock implementation of react-native-google-mobile-ads for the web platform
// to prevent Metro from trying to bundle native modules on Web.

const TestIds = {
  SIGN_IN_WITH_GOOGLE: 'test-id',
  BANNER: 'test-id',
  INTERSTITIAL: 'test-id',
  REWARDED: 'test-id',
  REWARDED_INTERSTITIAL: 'test-id',
  APP_OPEN: 'test-id',
};

const RewardedAdEventType = {
  LOADED: 'loaded',
  EARNED_REWARD: 'earned_reward',
  ERROR: 'error',
};

const AdEventType = {
  LOADED: 'loaded',
  CLOSED: 'closed',
  ERROR: 'error',
};

class MockAd {
  static createForAdRequest() {
    return new MockAd();
  }
  addAdEventListener(event, callback) {
    return () => {};
  }
  load() {}
  show() {}
}

const RewardedAd = MockAd;
const InterstitialAd = MockAd;

const mobileAds = () => ({
  initialize: () => Promise.resolve({}),
});

module.exports = {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
  InterstitialAd,
  AdEventType,
  default: mobileAds,
};
