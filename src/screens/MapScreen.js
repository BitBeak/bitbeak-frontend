import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import LevelHexagon from '../components/LevelHexagon';
import GiftHexagon from '../components/GiftHexagon';
import Line from '../components/Line';
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
  const scrollViewRef = useRef(null);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
    // Simulação da chamada ao back-end
    const levelsData = [
      { level: 1, status: 'unlocked', isSpecial: false },
      { level: 2, status: 'locked', isSpecial: false },
      { level: 3, status: 'locked', isSpecial: false },
      { level: 4, status: 'locked', isSpecial: false },
      { level: 5, status: 'locked', isSpecial: false },
      // Adicione mais níveis conforme necessário
    ].reverse(); // Inverter a ordem dos níveis
    setLevels(levelsData);
  }, []);

  const handlePressLevel = (level) => {
    navigation.navigate('QuestionScreen', { level });
  };

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
        <ScrollView
          contentContainerStyle={styles.scrollView}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
        >
          {levels.map((level, index) => (
            <View key={index} style={styles.hexagonContainer}>
              {level.isSpecial ? (
                <GiftHexagon status={level.status} />
              ) : (
                <LevelHexagon level={level.level} status={level.status} onPress={handlePressLevel} />
              )}
              {index < levels.length - 1 && <Line />}
            </View>
          ))}
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
    top: 60,
    left: 20,
  },
  backImage: {
    width: 30,
    height: 30,
  },
  dotsImage: {
    position: 'absolute',
    top: 60,
    right: 20,
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
    justifyContent: 'flex-end', // Alinhar conteúdo no final
  },
  hexagonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapScreen;
