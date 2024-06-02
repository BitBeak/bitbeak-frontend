import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const LevelHexagon = ({ level, status }) => {
  const getImageSource = () => {
    if (status === 'locked') return require('../../assets/icons/hexagon_locked.png');
    return require('../../assets/icons/hexagon_unlocked.png');
  };

  return (
    <View style={styles.container}>
      <Image source={getImageSource()} style={styles.hexagonImage} />
      {status !== 'locked' && (
        <Text style={styles.levelText}>{level}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 130, // Tamanho do hexágono
    height: 130, // Tamanho do hexágono
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    position: 'relative',
  },
  hexagonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  levelText: {
    position: 'absolute',
    top: '50%', // Centraliza verticalmente
    transform: [{ translateY: -30 }], // Ajusta a posição vertical
    color: '#0033cc',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LevelHexagon;
