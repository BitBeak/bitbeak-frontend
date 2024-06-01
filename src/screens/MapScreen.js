import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import LevelHexagon from '../components/LevelHexagon';
import GiftHexagon from '../components/GiftHexagon';
import * as Font from 'expo-font';

const loadFonts = () => {
  return Font.loadAsync({
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Mulish-Bold': require('../../assets/fonts/Mulish-Bold.ttf'),
    'Mulish': require('../../assets/fonts/Mulish-Regular.ttf'),
  });
};

const MapScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [levels, setLevels] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
    // Simulação da chamada ao back-end
    setLevels([
      { level: 1, status: 'unlocked', isSpecial: false },    
      // Adicione mais níveis conforme necessário
    ]);
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <LinearGradient colors={['#012768', '#006FC2']} style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/icons/backButton.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Image source={require('../../assets/icons/dots.png')} style={styles.dotsImage} />
        <Text style={styles.title}>TRILHA I</Text>
        <Text style={styles.subtitle}>LÓGICA DE PROGRAMAÇÃO</Text>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {levels.map((level) =>
            level.isSpecial ? (
              <GiftHexagon
                key={level.level}
                status={level.status}
              />
            ) : (
              <LevelHexagon
                key={level.level}
                level={level.level}
                status={level.status}
              />
            )
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 80, // Ajuste a posição para baixo sem afetar o título
    left: 20,
  },
  backImage: {
    width: 30,
    height: 30,
  },
  dotsImage: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 30,
    height: 30,
  },
  title: {
    color: 'white',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    marginTop: 62,
    textAlign: 'center',
  },
  subtitle: {
    color: 'white',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  scrollView: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default MapScreen;
