import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
    })();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }


  return (
    <LinearGradient colors={['#012768', '#006FC2']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#012768" />
      <View style={styles.header}>
        <Image source={require('./assets/icons/character-icon.png')} style={styles.icon} />
        <View style={styles.expBarContainer}>
          <View style={styles.expBarBackground}>
            <View style={styles.expBar} />
          </View>
          <View style={styles.levelCircle}>
            <Text style={styles.levelText}>XX</Text>
          </View>
        </View>
        <View style={styles.expDetails}>
          <Image source={require('./assets/icons/feather-icon.png')} style={styles.featherIcon} />
          <Text style={styles.expPoints}>XXX</Text>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleHeader}>TRILHAS</Text>
      </View>
      <View style={styles.trailContainer}>
        <Text style={styles.trailTitle}>Trilha I: Lógica de Programação</Text>
        <Text style={styles.trailLevel}>X / X Níveis</Text>
        <TouchableOpacity style={styles.trailButton}>
          <Text style={styles.trailButtonText}>ENTRAR NA TRILHA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.trailButton}>
          <Text style={styles.trailButtonText}>GUIA DE ESTUDO</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navBar}>
        <Image source={require('./assets/icons/trail-icon.png')} style={styles.navIcon} />
        <Image source={require('./assets/icons/mission-icon.png')} style={styles.navIcon} />
        <Image source={require('./assets/icons/challenge-icon.png')} style={styles.navIcon} />
        <Image source={require('./assets/icons/rewards-icon.png')} style={styles.navIcon} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
  },
  icon: {
    width: 90,
    height: 100,
    marginTop: 10,
    marginLeft: 10,
  },
  expBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  expBarBackground: {
    width: 150,
    height: 14,
    backgroundColor: '#ddd',
    borderRadius: 7,
    overflow: 'hidden',
  },
  expBar: {
    width: '75%',
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 7,
  },
  levelCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -12,
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  expDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 20,
  },
  featherIcon: {
    width: 25,
    height: 25,
    marginBottom: 5,
    marginLeft: 10,
  },
  expPoints: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  titleHeader: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  trailContainer: {
    backgroundColor: '#74a7cc',
    borderRadius: 40,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Esta é uma propriedade CSS, no React Native, use elevation
    elevation: 5,
    marginBottom: 20,
    marginTop: 45,
    marginLeft: 15,
    marginRight: 15,
  },
  trailTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  trailLevel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
  },
  trailButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 10,
    width: '80%',
    elevation: 2,
    alignItems: 'center',
  },
  trailButtonText: {
    color: '#0064a4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    paddingVertical: 10,
  },
  navIcon: {
    width: 25,
    height: 25,
  },
});

export default App;
