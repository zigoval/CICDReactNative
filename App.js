import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import React, { useEffect, useState } from 'react';
import Crashes from 'appcenter-crashes';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [inflationRate, setInflationRate] = useState(0.0);
  const [riskFreeRate, setRiskFreeRate] = useState(0.0);
  const [amount, setAmount] = useState(0.0);
  const [timeInYears, setTimeInYears] = useState(1);
  const [afterInflation, setAfterInflation] = useState(0.0);
  const [atRiskFree, setAtRiskFree] = useState(0.0);
  const [atRiskFreeAfterInflation, setAtRiskFreeAfterInflation] = useState(0.0);
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    checkPreviousSession();
  }, []);
  const calculateInflationImpact = (value, ir, time) => {
    return value / Math.pow(1 + ir, time);
  };
  const calculate = () => {
    const tempAfterInflation = calculateInflationImpact(
      amount,
      inflationRate / 100,
      timeInYears,
    );
    const tempAtRiskFree =
      amount * Math.pow(1 + riskFreeRate / 100, timeInYears);
    const tempAtRiskFreeAfterInflation = calculateInflationImpact(
      tempAtRiskFree,
      inflationRate / 100,
      timeInYears,
    );
    const tempDifference = tempAtRiskFreeAfterInflation - tempAfterInflation;

    setAfterInflation(tempAfterInflation);
    setAtRiskFree(tempAtRiskFree);
    setAtRiskFreeAfterInflation(tempAtRiskFreeAfterInflation);
    setDifference(tempDifference);
  };
  const checkPreviousSession = async () => {
    const didCrash = await Crashes.hasCrashedInLastSession();
    if (didCrash) {
      // const report = await Crashes.lastSessionCrashReport();
      // eslint-disable-next-line no-alert
      alert("Sorry about that crash, we're working on a solution");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Current inflation rate"
        style={styles.textBox}
        keyboardType="decimal-pad"
        onChangeText={value => setInflationRate(value)}
      />
      <TextInput
        placeholder="Current risk free rate"
        style={styles.textBox}
        keyboardType="decimal-pad"
        onChangeText={value => setRiskFreeRate(value)}
      />
      <TextInput
        placeholder="Amount you want to save"
        style={styles.textBox}
        keyboardType="decimal-pad"
        onChangeText={value => setAmount(value)}
      />
      <TextInput
        placeholder="For how long (in years) will you save?"
        style={[styles.textBox, styles.marginBottom]}
        keyboardType="decimal-pad"
        onChangeText={value => setTimeInYears(value)}
      />
      <Button
        title="Calculate inflation"
        onPress={() => {
          calculate();
          // Analytics.trackEvent('calculate_inflation', {
          //   Internet: 'WiFi',
          //   GPS: 'Off',
          // });
        }}
      />
      <Text style={styles.label}>
        {timeInYears} years from now you will still have ${amount} but it will
        only be worth ${afterInflation}.
      </Text>
      <Text style={styles.label}>
        But if you invest it at a risk free rate you will have ${atRiskFree}.
      </Text>
      <Text style={styles.label}>
        Which will be worth ${atRiskFreeAfterInflation} after inflation.
      </Text>
      <Text style={styles.label}>A difference of: ${difference}.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 16,
  },
  label: {
    marginTop: 10,
  },
  textBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  marginBottom: {
    marginBottom: 15,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
