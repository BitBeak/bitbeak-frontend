import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const App = () => {
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
            <Text style={styles.levelText}>12</Text>
          </View>
        </View>
        <Text style={styles.expPoints}>156</Text>
        <Image source={require('./assets/icons/feather-icon.png')} style={styles.featherIcon} />
      </View>
      <View style={styles.main}>
        <Text style={styles.title}>Trilha I: Lógica de Programação</Text>
        <Text style={styles.level}>5 / 6 Níveis</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ENTRAR NA TRILHA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>GUIA DE ESTUDO</Text>
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
    justifyContent: 'flex-start', // Adjust alignment to bring elements closer
    padding: 10,
    backgroundColor: 'transparent',
  },
  icon: {
    width: 70,
    height: 70,
    marginTop: 10,
    marginLeft: 10,
  },
  expBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5, // Reduced margin to bring the bar closer to the icon
  },
  expBarBackground: {
    width: 150, // Adjusted width if needed
    height: 14, // Adjusted height for a smaller bar
    backgroundColor: '#ddd',
    borderRadius: 7,
    overflow: 'hidden',
  },
  expBar: {
    width: '75%', // Adjust percentage as needed
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
    marginLeft: -12, // Adjusted to make the circle overlap the bar more
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  expPoints: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5, // Added small margin for spacing
  },
  featherIcon: {
    width: 25, // Set appropriate size
    height: 25, // Set appropriate size
    marginLeft: 10, // Space from the points text
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  level: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0064a4',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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
