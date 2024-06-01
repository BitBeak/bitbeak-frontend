import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LevelHexagon = ({ level, status }) => {
  const getBackgroundColor = () => {
    if (status === 'locked') return '#f0e68c'; // Hexágono bloqueado
    return '#FFED61'; // Hexágono desbloqueado
  };

  return (
    <View style={[styles.hexagon, { backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.levelText}>{level}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  hexagon: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFED61',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    shadowColor: '#3610A6',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    position: 'relative',
  },
  hexagonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  hexagonBefore: {
    position: 'absolute',
    top: -40,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 40,
    borderLeftColor: 'transparent',
    borderRightWidth: 40,
    borderRightColor: 'transparent',
    borderBottomWidth: 40,
    borderBottomColor: '#FFED61',
  },
  hexagonAfter: {
    position: 'absolute',
    bottom: -40,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 40,
    borderLeftColor: 'transparent',
    borderRightWidth: 40,
    borderRightColor: 'transparent',
    borderTopWidth: 40,
    borderTopColor: '#FFED61',
  },
  levelText: {
    color: '#0033cc',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LevelHexagon;
