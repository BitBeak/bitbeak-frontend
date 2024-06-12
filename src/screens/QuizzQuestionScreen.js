import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext'; // Ajuste o caminho conforme necessário
import Icon from 'react-native-vector-icons/MaterialIcons';

const QuizzQuestionScreen = ({ route }) => {
  const { question, nextScreenParams, currentQuestionIndex, trailNumber, correctAnswers = 0, incorrectQuestions = [] } = route.params;
  const navigation = useNavigation();
  const { addXp, addFeathers } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false); // Definindo o estado showFeedback

  const handleOptionPress = (index) => {
    setSelectedOption(index);
    const correct = index === question.correctOption;
    setIsCorrect(correct);
    if (correct) {
      addXp(10); // Add 10 XP for each correct answer
      addFeathers(10); // Add 10 feathers for each correct answer
      nextScreenParams.correctAnswers = correctAnswers + 1;
    } else {
      // Certifique-se de que `nextScreenParams.incorrectQuestions` seja sempre um array
      if (!Array.isArray(nextScreenParams.incorrectQuestions)) {
        nextScreenParams.incorrectQuestions = [];
      }
      nextScreenParams.incorrectQuestions.push(question);
      nextScreenParams.correctAnswers = correctAnswers;
    }
    setShowFeedback(true); // Atualizando o estado showFeedback
  };

  const handleNextPress = () => {
    setShowFeedback(false); // Resetando o estado showFeedback
    navigation.navigate('QuestionScreen', nextScreenParams);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#012768', '#006FC2']} style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>TRILHA {trailNumber} - Q{currentQuestionIndex + 1}</Text>
            <Icon name="more-vert" size={30} color="#fff" />
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <LinearGradient
                colors={['#FDD835', '#FBC02D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: `${((currentQuestionIndex + 1) / 5) * 100}%` }]}
              />
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.question}</Text>
          </View>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                selectedOption === index && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress(index)}
              disabled={selectedOption !== null}
            >
              <Text style={[
                styles.buttonText,
                selectedOption === index && styles.selectedButtonText,
              ]}>{option}</Text>
            </TouchableOpacity>
          ))}
          {selectedOption !== null && (
            <View style={[
              styles.modal,
              isCorrect ? styles.correctModal : styles.incorrectModal,
            ]}>
              <Text style={styles.modalText}>{isCorrect ? 'EXCELENTE!' : 'ERRADO!'}</Text>
              <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
                <Text style={styles.nextButtonText}>Próxima →</Text>
              </TouchableOpacity>
            </View>
          )}
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
  headerContainer: {
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: -30,
  },
  progressBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#BDBDBD',
    borderRadius: 5,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 55,
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  questionText: {
    color: '#005288',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginBottom: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
  },
  selectedOption: {
    backgroundColor: '#FDD835',
    borderColor: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedButtonText: {
    color: '#005288',
  },
  modal: {
    position: 'absolute',
    bottom: -10,
    width: '107%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  correctModal: {
    backgroundColor: '#00C853',
  },
  incorrectModal: {
    backgroundColor: '#D32F2F',
  },
  modalText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizzQuestionScreen;
