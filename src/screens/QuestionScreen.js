import React, { useEffect } from 'react';
import QuizzQuestionScreen from './QuizzQuestionScreen';
import MatchColumnsScreen from './MatchColumnsScreen';

const questionsByLevel = {
  1: [
    {
      type: 'quizz',
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
      type: 'match',
      question: "Combine as variáveis com suas descrições:",
      options: [
        { left: "let", right: "Uma variável que pode ser alterada" },
        { left: "const", right: "Uma constante que não pode ser alterada" },
        { left: "var", right: "Uma variável que pode ser alterada (mais antiga)" },
        { left: "function", right: "Uma função que executa um bloco de código" },
      ],
      correctPairs: [
        { left: "let", right: "Uma variável que pode ser alterada" },
        { left: "const", right: "Uma constante que não pode ser alterada" },
        { left: "var", right: "Uma variável que pode ser alterada (mais antiga)" },
        { left: "function", right: "Uma função que executa um bloco de código" },
      ],
    },
    {
      type: 'quizz',
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
      type: 'match',
      question: "Combine os tipos de dados com exemplos:",
      options: [
        { left: "String", right: '"Hello"' },
        { left: "Number", right: "42" },
        { left: "Boolean", right: "true" },
        { left: "Array", right: "[1, 2, 3]" },
      ],
      correctPairs: [
        { left: "String", right: '"Hello"' },
        { left: "Number", right: "42" },
        { left: "Boolean", right: "true" },
        { left: "Array", right: "[1, 2, 3]" },
      ],
    },
    {
      type: 'quizz',
      question: "O que é uma constante?",
      options: [
        "Um espaço na memória para armazenar dados que não podem ser alterados",
        "Um tipo de loop",
        "Uma função que retorna valores",
        "Uma estrutura condicional"
      ],
      correctOption: 0,
    },
  ],
  // Adicione mais níveis e questões conforme necessário
};

const QuestionScreen = ({ route, navigation }) => {
  const { level, currentQuestionIndex, trailNumber, correctAnswers = 0, incorrectQuestions = [] } = route.params;
  const questions = questionsByLevel[level];
  const currentQuestion = questions[currentQuestionIndex];

  const nextScreenParams = {
    level,
    currentQuestionIndex: currentQuestionIndex + 1,
    trailNumber,
    correctAnswers,
    incorrectQuestions,
  };

  useEffect(() => {
    if (!currentQuestion) {
      const scorePercentage = (correctAnswers / questions.length) * 100;
      navigation.navigate('FeedbackScreen', {
        scorePercentage,
        incorrectQuestions,
      });
    }
  }, [currentQuestion, correctAnswers, incorrectQuestions, navigation, questions.length]);

  if (!currentQuestion) {
    return null; // Renderizar nada enquanto a navegação está acontecendo
  }

  if (currentQuestion.type === 'quizz') {
    return (
      <QuizzQuestionScreen
        navigation={navigation}
        route={{ params: { ...route.params, question: currentQuestion, nextScreenParams, currentQuestionIndex, trailNumber } }}
      />
    );
  } else {
    return (
      <MatchColumnsScreen
        navigation={navigation}
        route={{ params: { ...route.params, question: currentQuestion, nextScreenParams, currentQuestionIndex, trailNumber } }}
      />
    );
  }
};

export default QuestionScreen;
