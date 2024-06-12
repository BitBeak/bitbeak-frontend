import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const GiftHexagon = ({ status }) => {
  const getBackgroundColor = () => {
    if (status === 'locked') return '#add8e6';
    return '#00bfff';
  };

  return (
    <View style={[styles.hexagon, { backgroundColor: getBackgroundColor() }]}>
      <Icon name="gift" size={30} color="#ffffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  hexagon: {
    width: 70,
    height: 70,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: '#00bfff',
  },
});

export default GiftHexagon;
