import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext'; // Ajuste o caminho conforme necessário

const questions = [
  {
    question: "Qual é a finalidade de um loop 'for' em uma linguagem de programação?",
    options: [
      "Conectar o programa à internet",
      "Executar um bloco de código um número específico de vezes",
      "Criar novas variáveis",
      "Desenhar gráficos na tela",
    ],
    correctOption: 1,
  },
  {
    question: "Qual a diferença entre uma variável e uma constante?",
    options: [
      "Variáveis podem mudar, constantes não",
      "Constantes podem mudar, variáveis não",
      "Variáveis são usadas para loops, constantes não",
      "Constantes são usadas para loops, variáveis não",
    ],
    correctOption: 0,
  },
  {
    question: "O que é um 'array'?",
    options: [
      "Um tipo de loop",
      "Uma função que retorna verdadeiro ou falso",
      "Uma coleção de itens armazenados em uma única variável",
      "Um método de ordenação",
    ],
    correctOption: 2,
  },
  {
    question: "Qual a função de um 'if statement'?",
    options: [
      "Executar um bloco de código repetidamente",
      "Verificar uma condição e executar um bloco de código se a condição for verdadeira",
      "Declarar uma variável",
      "Criar um loop",
    ],
    correctOption: 1,
  },
  {
    question: "O que é recursão em programação?",
    options: [
      "Quando uma função chama a si mesma",
      "Quando um loop não tem fim",
      "Quando uma variável é declarada várias vezes",
      "Quando um array contém outros arrays",
    ],
    correctOption: 0,
  },
];

const QuestionScreen = () => {
  const navigation = useNavigation();
  const { addXp, addFeathers, updateTrailProgress } = useContext(AuthContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0); // Estado para armazenar respostas corretas

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = (index) => {
    setSelectedOption(index);
    const correct = index === currentQuestion.correctOption;
    setIsCorrect(correct);
    if (correct) {
      setCorrectAnswers(correctAnswers + 1); // Incrementa respostas corretas
      addXp(10); // Add 10% XP for each correct answer
      addFeathers(10); // Add 10 feathers for each correct answer
    }
  };

  const handleNextPress = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(false);
    } else {
      const scorePercentage = (correctAnswers / questions.length) * 100;
      if (scorePercentage >= 70) {
        updateTrailProgress(1); // Atualiza o progresso da Trilha I
      }
      navigation.navigate('HomeScreen');
    }
  };

  const handleBackPress = () => {
    navigation.navigate('MapScreen'); // Ajuste conforme a sua tela de mapa
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#012768', '#006FC2']} style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            {currentQuestionIndex === 0 && (
              <TouchableOpacity onPress={handleBackPress}>
                <Image source={require('../../assets/icons/backButton.png')} style={styles.icon} />
              </TouchableOpacity>
            )}
            <Text style={styles.headerText}>TRILHA 1 - Q{currentQuestionIndex + 1}</Text>
            <Image source={require('../../assets/icons/dots.png')} style={styles.icon} />
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <LinearGradient
                colors={['#FDD835', '#FBC02D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }]}
              />
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </View>
          {currentQuestion.options.map((option, index) => (
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
  icon: {
    width: 30,
    height: 30,
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
    marginTop: 5,
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

export default QuestionScreen;
