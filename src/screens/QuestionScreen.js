import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext'; // Ajuste o caminho conforme necessário

const questionsByLevel = {
  1: [
    {
      question: "O que é uma variável?",
      options: [
        "Um espaço na memória para armazenar dados temporários",
        "Uma constante que não pode ser alterada",
        "Uma função que retorna valores",
        "Uma estrutura de repetição"
      ],
      correctOption: 0,
    },
    {
      question: "Qual palavra-chave usamos para declarar uma variável em JavaScript?",
      options: [
        "var",
        "let",
        "const",
        "function"
      ],
      correctOption: 1,
    },
    {
      question: "O que é uma constante?",
      options: [
        "Um espaço na memória para armazenar dados que não podem ser alterados",
        "Um tipo de loop",
        "Uma função que retorna valores",
        "Uma estrutura condicional"
      ],
      correctOption: 0,
    },
    {
      question: "Qual palavra-chave usamos para declarar uma constante em JavaScript?",
      options: [
        "let",
        "var",
        "const",
        "loop"
      ],
      correctOption: 2,
    },
    {
      question: "O que acontece se você tentar alterar o valor de uma constante?",
      options: [
        "O valor será alterado normalmente",
        "O programa entra em loop infinito",
        "Um erro será gerado",
        "Nada acontece"
      ],
      correctOption: 2,
    },
  ],
  2: [
    {
      question: "O que é uma estrutura condicional?",
      options: [
        "Uma estrutura que permite repetir um bloco de código",
        "Uma estrutura que permite tomar decisões baseadas em condições",
        "Uma estrutura que define constantes",
        "Uma estrutura que cria arrays"
      ],
      correctOption: 1,
    },
    {
      question: "Qual instrução usamos para criar uma estrutura condicional em JavaScript?",
      options: [
        "for",
        "while",
        "const",
        "if"
      ],
      correctOption: 3,
    },
    {
      question: "O que a seguinte condição retorna: `if (10 > 5)`?",
      options: [
        "true",
        "false",
        "undefined",
        "null"
      ],
      correctOption: 0,
    },
    {
      question: "O que acontece se a condição de um `if` não for satisfeita?",
      options: [
        "O bloco de código dentro do `if` será executado",
        "Nada acontece",
        "O bloco de código dentro do `else` será executado, se houver",
        "Um erro é gerado"
      ],
      correctOption: 2,
    },
    {
      question: "Como verificamos várias condições em uma estrutura condicional?",
      options: [
        "Usando vários `if` separados",
        "Usando `if` e `else if`",
        "Usando `for` e `while`",
        "Usando `var` e `let`"
      ],
      correctOption: 1,
    },
  ],
  3: [
    {
      question: "O que é uma estrutura de repetição?",
      options: [
        "Um bloco de código que define uma função",
        "Um bloco de código que define uma constante",
        "Um bloco de código que permite repetir ações",
        "Um bloco de código que cria variáveis"
      ],
      correctOption: 2,
    },
    {
      question: "Qual estrutura usamos para repetir um bloco de código um número específico de vezes?",
      options: [
        "if",
        "const",
        "let",
        "for"
      ],
      correctOption: 3,
    },
    {
      question: "O que a seguinte instrução faz: `for (let i = 0; i < 3; i++) { console.log(i); }`?",
      options: [
        "Repete o bloco de código 3 vezes",
        "Repete o bloco de código indefinidamente",
        "Repete o bloco de código 2 vezes",
        "Não repete o bloco de código"
      ],
      correctOption: 0,
    },
    {
      question: "Qual estrutura usamos para repetir um bloco de código enquanto uma condição for verdadeira?",
      options: [
        "if",
        "const",
        "let",
        "while"
      ],
      correctOption: 3,
    },
    {
      question: "O que acontece se a condição em um `while` nunca se tornar falsa?",
      options: [
        "O bloco de código será executado indefinidamente",
        "O bloco de código será executado uma vez",
        "O bloco de código não será executado",
        "Um erro é gerado"
      ],
      correctOption: 0,
    },
  ],
  4: [
    {
      question: "O que é um array?",
      options: [
        "Um tipo de variável",
        "Uma função que retorna valores",
        "Uma estrutura de dados que armazena uma coleção de itens",
        "Uma estrutura condicional"
      ],
      correctOption: 2,
    },
    {
      question: "Como acessamos o primeiro elemento de um array em JavaScript?",
      options: [
        "array(0)",
        "array[0]",
        "array{0}",
        "array.0"
      ],
      correctOption: 1,
    },
    {
      question: "Como adicionamos um item no final de um array?",
      options: [
        "array.add(item)",
        "array.push(item)",
        "array.insert(item)",
        "array.append(item)"
      ],
      correctOption: 1,
    },
    {
      question: "O que a seguinte instrução retorna: `array.length`?",
      options: [
        "O primeiro item do array",
        "O último item do array",
        "O número de itens no array",
        "Um erro"
      ],
      correctOption: 2,
    },
    {
      question: "Como removemos o último item de um array?",
      options: [
        "array.pop()",
        "array.remove()",
        "array.delete()",
        "array.shift()"
      ],
      correctOption: 0,
    },
  ],
  5: [
    {
      question: "O que é uma função?",
      options: [
        "Uma variável que armazena dados",
        "Um bloco de código que realiza uma tarefa específica",
        "Uma estrutura de repetição",
        "Uma estrutura condicional"
      ],
      correctOption: 1,
    },
    {
      question: "Como definimos uma função em JavaScript?",
      options: [
        "let func() {}",
        "function func() {}",
        "const func() {}",
        "var func() {}"
      ],
      correctOption: 1,
    },
    {
      question: "O que a seguinte instrução faz: `return valor` dentro de uma função?",
      options: [
        "Encerrar a função e retornar o valor especificado",
        "Continua a execução da função",
        "Inicia um loop",
        "Define uma constante"
      ],
      correctOption: 0,
    },
    {
      question: "Como chamamos uma função chamada `saudacao`?",
      options: [
        "saudacao()",
        "call saudacao()",
        "execute saudacao()",
        "invoke saudacao()"
      ],
      correctOption: 0,
    },
    {
      question: "O que acontece se uma função não tiver um `return`?",
      options: [
        "Ela retorna `undefined`",
        "Ela retorna `null`",
        "Ela retorna 0",
        "Um erro é gerado"
      ],
      correctOption: 0,
    },
  ],
};

const QuestionScreen = ({ route }) => {
  const { level } = route.params;
  const questions = questionsByLevel[level];
  const navigation = useNavigation();
  const { addXp, addFeathers, updateTrailProgress } = useContext(AuthContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = (index) => {
    setSelectedOption(index);
    const correct = index === currentQuestion.correctOption;
    setIsCorrect(correct);
    if (correct) {
      setCorrectAnswers(correctAnswers + 1);
      addXp(10); // Add 10 XP for each correct answer
      addFeathers(10); // Add 10 feathers for each correct answer
    } else {
      setIncorrectQuestions([...incorrectQuestions, currentQuestion]);
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
        updateTrailProgress(1, level); // Atualiza o progresso da trilha
      }
      navigation.navigate('FeedbackScreen', { scorePercentage, incorrectQuestions });
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
            <Text style={styles.headerText}>TRILHA {level} - Q{currentQuestionIndex + 1}</Text>
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
