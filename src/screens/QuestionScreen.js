import React, { useEffect } from 'react';
import QuizzQuestionScreen from './QuizzQuestionScreen';
import MatchColumnsScreen from './MatchColumnsScreen';
import CodeQuestionScreen from './CodeQuestionScreen';

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
      type: 'code',
      prompt: 'Em JavaScript, escreva um código que execute um loop de 1 a 10. Para cada número nesse intervalo, o seu código deve imprimir no console a mensagem "Número atual: X", substituindo o "X" pelo número atual do loop.',
      correctCode: 'for (let i = 1; i <= 10; i++) { console.log(`Número atual: ${i}`); }'
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
      type: 'code',
      prompt: 'Em JavaScript, escreva um código que imprima os números pares de 1 a 10. O código deve usar uma estrutura de repetição e uma condicional.',
      correctCode: 'for (let i = 1; i <= 10; i++) { if (i % 2 === 0) { console.log(i); } }'
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

  switch (currentQuestion.type) {
    case 'quizz':
      return (
        <QuizzQuestionScreen
          navigation={navigation}
          route={{ params: { ...route.params, question: currentQuestion, nextScreenParams, currentQuestionIndex, trailNumber } }}
        />
      );
    case 'match':
      return (
        <MatchColumnsScreen
          navigation={navigation}
          route={{ params: { ...route.params, question: currentQuestion, nextScreenParams, currentQuestionIndex, trailNumber } }}
        />
      );
    case 'code':
      return (
        <CodeQuestionScreen
          navigation={navigation}
          route={{ params: { ...route.params, question: currentQuestion, nextScreenParams, currentQuestionIndex, trailNumber } }}
        />
      );
    default:
      return null;
  }
};

export default QuestionScreen;
