import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const FeedbackScreen = ({ route }) => {
  const { scorePercentage, incorrectQuestions } = route.params;
  const navigation = useNavigation();

  const handleBackToMap = () => {
    navigation.navigate('MapScreen');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#012768', '#006FC2']} style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.feedbackTitle}>Seu desempenho</Text>
          <Text style={styles.scoreText}>Você acertou {scorePercentage}% das perguntas!</Text>
          {incorrectQuestions.length > 0 && (
            <View style={styles.feedbackContainer}>
              <Text style={styles.feedbackSubtitle}>Você precisa revisar:</Text>
              {incorrectQuestions.map((question, index) => (
                <Text key={index} style={styles.feedbackText}>{question.question}</Text>
              ))}
            </View>
          )}
          <TouchableOpacity style={styles.backButton} onPress={handleBackToMap}>
            <Text style={styles.backButtonText}>Voltar ao Mapa</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  feedbackContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginBottom: 20,
  },
  feedbackSubtitle: {
    color: '#D32F2F',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feedbackText: {
    color: '#005288',
    fontSize: 16,
    marginBottom: 5,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#FDD835',
    borderRadius: 20,
  },
  backButtonText: {
    color: '#005288',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;
