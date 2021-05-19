import { Button, StyleSheet, View } from 'react-native';

import React, { useEffect } from 'react';
import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';

const App = () => {
  useEffect(() => {
    checkPreviousSession();
  }, []);

  const checkPreviousSession = async () => {
    console.log('ici');
    const didCrash = await Crashes.hasCrashedInLastSession();
    console.log(didCrash);
    if (didCrash) {
      // const report = await Crashes.lastSessionCrashReport();
      // eslint-disable-next-line no-alert
      alert("Sorry about that crash, we're working on a solution");
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Calculate inflation"
        onPress={() =>
          Analytics.trackEvent('calculate_inflation', { internet: 'Wi-Fi' })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
