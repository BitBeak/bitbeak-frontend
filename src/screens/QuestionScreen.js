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
  2: [
    {
      type: 'quizz',
      question: "Qual é o valor de x após executar o seguinte código? \nlet x = 10; \nx += 5;",
      options: [
        "10",
        "15",
        "5",
        "20"
      ],
      correctOption: 1,
    },
    {
      type: 'match',
      question: "Combine os operadores com suas funções:",
      options: [
        { left: "+", right: "Adição" },
        { left: "-", right: "Subtração" },
        { left: "*", right: "Multiplicação" },
        { left: "/", right: "Divisão" },
      ],
      correctPairs: [
        { left: "+", right: "Adição" },
        { left: "-", right: "Subtração" },
        { left: "*", right: "Multiplicação" },
        { left: "/", right: "Divisão" },
      ],
    },
    {
      type: 'code',
      prompt: 'Em JavaScript, escreva um código que some os números de 1 a 5 e imprima o resultado no console.',
      correctCode: 'let sum = 0; for (let i = 1; i <= 5; i++) { sum += i; } console.log(sum);'
    },
    {
      type: 'quizz',
      question: "Qual operador usamos para comparação estrita em JavaScript?",
      options: [
        "==",
        "===",
        "=",
        "!=="
      ],
      correctOption: 1,
    },
    {
      type: 'match',
      question: "Combine os tipos de loop com suas descrições:",
      options: [
        { left: "for", right: "Loop com início, condição e incremento definidos" },
        { left: "while", right: "Loop que continua enquanto a condição for verdadeira" },
        { left: "do...while", right: "Loop que executa pelo menos uma vez antes de verificar a condição" },
        { left: "for...in", right: "Loop através das propriedades de um objeto" },
      ],
      correctPairs: [
        { left: "for", right: "Loop com início, condição e incremento definidos" },
        { left: "while", right: "Loop que continua enquanto a condição for verdadeira" },
        { left: "do...while", right: "Loop que executa pelo menos uma vez antes de verificar a condição" },
        { left: "for...in", right: "Loop através das propriedades de um objeto" },
      ],
    },
    {
      type: 'code',
      prompt: 'Em JavaScript, escreva um código que multiplique os números de 1 a 5 e imprima o resultado no console.',
      correctCode: 'let product = 1; for (let i = 1; i <= 5; i++) { product *= i; } console.log(product);'
    },
  ],
  3: [
    {
      type: 'quizz',
      question: "Qual é o resultado de 3 + '3' em JavaScript?",
      options: [
        "6",
        "33",
        "NaN",
        "undefined"
      ],
      correctOption: 1,
    },
    {
      type: 'match',
      question: "Combine as funções de array com suas descrições:",
      options: [
        { left: "push", right: "Adiciona um elemento ao final do array" },
        { left: "pop", right: "Remove o último elemento do array" },
        { left: "shift", right: "Remove o primeiro elemento do array" },
        { left: "unshift", right: "Adiciona um elemento ao início do array" },
      ],
      correctPairs: [
        { left: "push", right: "Adiciona um elemento ao final do array" },
        { left: "pop", right: "Remove o último elemento do array" },
        { left: "shift", right: "Remove o primeiro elemento do array" },
        { left: "unshift", right: "Adiciona um elemento ao início do array" },
      ],
    },
    {
      type: 'code',
      prompt: 'Em JavaScript, escreva um código que encontre o maior número em um array [1, 2, 3, 4, 5].',
      correctCode: 'let arr = [1, 2, 3, 4, 5]; let max = Math.max(...arr); console.log(max);'
    },
    {
      type: 'quizz',
      question: "Qual método de array é usado para adicionar um ou mais elementos ao final de um array?",
      options: [
        "push()",
        "pop()",
        "shift()",
        "unshift()"
      ],
      correctOption: 0,
    },
    {
      type: 'match',
      question: "Combine os métodos de string com suas descrições:",
      options: [
        { left: "slice", right: "Extrai uma parte da string e retorna uma nova string" },
        { left: "toUpperCase", right: "Converte todos os caracteres para maiúsculas" },
        { left: "toLowerCase", right: "Converte todos os caracteres para minúsculas" },
        { left: "charAt", right: "Retorna o caractere no índice especificado" },
      ],
      correctPairs: [
        { left: "slice", right: "Extrai uma parte da string e retorna uma nova string" },
        { left: "toUpperCase", right: "Converte todos os caracteres para maiúsculas" },
        { left: "toLowerCase", right: "Converte todos os caracteres para minúsculas" },
        { left: "charAt", right: "Retorna o caractere no índice especificado" },
      ],
    },
    {
      type: 'code',
      prompt: 'Em JavaScript, escreva um código que inverta uma string "hello".',
      correctCode: 'let str = "hello"; let reversed = str.split("").reverse().join(""); console.log(reversed);'
    },
  ],
  4: [
    {
      type: 'quizz',
      question: "O que é uma função de ordem superior em JavaScript?",
      options: [
        "Uma função que retorna outra função",
        "Uma função que chama outras funções",
        "Uma função que aceita uma ou mais funções como argumento",
        "Todas as alternativas acima"
      ],
      correctOption: 3,
    },
    {
      type: 'match',
      question: "Combine os métodos de objeto com suas descrições:",
      options: [
        { left: "keys", right: "Retorna um array com as chaves do objeto" },
        { left: "values", right: "Retorna um array com os valores do objeto" },
        { left: "entries", right: "Retorna um array com pares chave-valor do objeto" },
        { left: "assign", right: "Copia todas as propriedades de um ou mais objetos para um objeto destino" },
      ],
      correctPairs: [
        { left: "keys", right: "Retorna um array com as chaves do objeto" },
        { left: "values", right: "Retorna um array com os valores do objeto" },
        { left: "entries", right: "Retorna um array com pares chave-valor do objeto" },
        { left: "assign", right: "Copia todas as propriedades de um ou mais objetos para um objeto destino" },
      ],
    },
    {
      type: 'code',
      prompt: 'Em JavaScript, escreva um código que remova todos os valores falsy de um array [0, 1, false, 2, "", 3].',
      correctCode: 'let arr = [0, 1, false, 2, "", 3]; let filtered = arr.filter(Boolean); console.log(filtered);'
    },
    {
      type: 'quizz',
      question: "Qual método de array cria um novo array com todos os elementos que passaram no teste implementado pela função fornecida?",
      options: [
        "map()",
        "filter()",
        "reduce()",
        "forEach()"
      ],
      correctOption: 1,
    },
    {
      type: 'match',
      question: "Combine os conceitos de programação funcional com suas descrições:",
      options: [
        { left: "Imutabilidade", right: "Os dados não podem ser modificados após serem criados" },
        { left: "Funções puras", right: "Funções que não têm efeitos colaterais e retornam o mesmo resultado para os mesmos argumentos" },
        { left: "Composição de funções", right: "Combinar funções simples para construir funções mais complexas" },
        { left: "Recursão", right: "Uma função que chama a si mesma" },
      ],
      correctPairs: [
        { left: "Imutabilidade", right: "Os dados não podem ser modificados após serem criados" },
        { left: "Funções puras", right: "Funções que não têm efeitos colaterais e retornam o mesmo resultado para os mesmos argumentos" },
        { left: "Composição de funções", right: "Combinar funções simples para construir funções mais complexas" },
        { left: "Recursão", right: "Uma função que chama a si mesma" },
      ],
    },
    {
      type: 'code',
      prompt: 'Em JavaScript, escreva um código que conte a frequência de cada elemento em um array ["a", "b", "a", "c", "b", "a"].',
      correctCode: `let arr = ["a", "b", "a", "c", "b", "a"];
      let freq = arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});
      console.log(freq);`
    },
  ],
  5: [
    {
      type: 'quizz',
      question: "Qual é a diferença entre 'undefined' e 'null' em JavaScript?",
      options: [
        "'undefined' é um valor que não foi atribuído a uma variável, 'null' é um valor vazio intencional",
        "'null' é um valor que não foi atribuído a uma variável, 'undefined' é um valor vazio intencional",
        "'undefined' e 'null' são equivalentes",
        "Nenhuma das alternativas"
      ],
      correctOption: 0,
    },
    {
      type: 'match',
      question: "Combine os padrões de projeto com suas descrições:",
      options: [
        { left: "Singleton", right: "Garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global a ela" },
        { left: "Observer", right: "Define uma dependência um-para-muitos entre objetos para que quando um objeto muda de estado, todos os seus dependentes sejam notificados e atualizados automaticamente" },
        { left: "Factory", right: "Define uma interface para criar um objeto, mas deixa as subclasses decidirem qual classe instanciar" },
        { left: "Decorator", right: "Anexa responsabilidades adicionais a um objeto dinamicamente" },
      ],
      correctPairs: [
        { left: "Singleton", right: "Garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global a ela" },
        { left: "Observer", right: "Define uma dependência um-para-muitos entre objetos para que quando um objeto muda de estado, todos os seus dependentes sejam notificados e atualizados automaticamente" },
        { left: "Factory", right: "Define uma interface para criar um objeto, mas deixa as subclasses decidirem qual classe instanciar" },
        { left: "Decorator", right: "Anexa responsabilidades adicionais a um objeto dinamicamente" },
      ],
    },
    {
      type: 'code',
      prompt: 'Em JavaScript, escreva um código que implemente o padrão Singleton.',
      correctCode: `class Singleton {
        constructor() {
          if (!Singleton.instance) {
            Singleton.instance = this;
          }
          return Singleton.instance;
        }
      }
      const instance = new Singleton();
      Object.freeze(instance);
      console.log(instance);`
    },
    {
      type: 'quizz',
      question: "Qual é a diferença entre '==' e '===' em JavaScript?",
      options: [
        "'==' compara valores após converter para o mesmo tipo, '===' compara valores e tipos sem conversão",
        "'===' compara valores após converter para o mesmo tipo, '==' compara valores e tipos sem conversão",
        "'==' e '===' são equivalentes",
        "Nenhuma das alternativas"
      ],
      correctOption: 0,
    },
    {
      type: 'match',
      question: "Combine os tipos de erro em JavaScript com suas descrições:",
      options: [
        { left: "ReferenceError", right: "Ocorre quando uma referência inválida é usada" },
        { left: "TypeError", right: "Ocorre quando uma operação é realizada em um tipo incompatível" },
        { left: "RangeError", right: "Ocorre quando um valor não está no conjunto ou intervalo de valores permitidos" },
        { left: "SyntaxError", right: "Ocorre quando há um erro na sintaxe do código" },
      ],
      correctPairs: [
        { left: "ReferenceError", right: "Ocorre quando uma referência inválida é usada" },
        { left: "TypeError", right: "Ocorre quando uma operação é realizada em um tipo incompatível" },
        { left: "RangeError", right: "Ocorre quando um valor não está no conjunto ou intervalo de valores permitidos" },
        { left: "SyntaxError", right: "Ocorre quando há um erro na sintaxe do código" },
      ],
    },
    {
      type: 'code',
      prompt: 'Em JavaScript, escreva um código que use recursão para calcular o fatorial de um número.',
      correctCode: `function factorial(n) {
        if (n === 0) {
          return 1;
        }
        return n * factorial(n - 1);
      }
      console.log(factorial(5));`
    },
  ],
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
        trailNumber,
        level,
      });
    }
  }, [currentQuestion, correctAnswers, incorrectQuestions, navigation, questions.length, trailNumber, level]);

  if (!currentQuestion) {
    return null;
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
