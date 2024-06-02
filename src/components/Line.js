import React from 'react';
import { View, StyleSheet } from 'react-native';

const Line = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    width: 1,
    height: 120, // Ajuste a altura da linha conforme necessário
    backgroundColor: '#FFFFFF',
    marginVertical: -55, // Margem negativa para garantir que a linha toque as pontas dos hexágonos
  },
});

export default Line;
