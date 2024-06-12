import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const explanations = {
  1: {
    title: "Variáveis e Constantes",
    content: `
Uma variável é um espaço na memória do computador onde armazenamos dados temporários que podem ser alterados durante a execução do programa. Em JavaScript, usamos a palavra-chave let para declarar uma variável.

Exemplo de variável:
\`\`\`javascript
let idade = 25; // variável
\`\`\`

Uma constante, por outro lado, é um espaço na memória onde armazenamos dados que não podem ser alterados depois de definidos. Usamos a palavra-chave const para declarar uma constante.

Exemplo de constante:
\`\`\`javascript
const nome = "João"; // constante
\`\`\`

Tente sempre usar const a menos que você saiba que a variável precisará mudar de valor, então use let.
    `,
  },
  2: {
    title: "Operadores e Estruturas Condicionais",
    content: `
Operadores são usados para realizar operações em variáveis e valores. Em JavaScript, temos operadores aritméticos, operadores de atribuição, operadores de comparação, entre outros.

Exemplo de operadores aritméticos:
\`\`\`javascript
let soma = 5 + 3; // soma = 8
let subtracao = 5 - 3; // subtracao = 2
let multiplicacao = 5 * 3; // multiplicacao = 15
let divisao = 5 / 3; // divisao = 1.666...
\`\`\`

Estruturas condicionais permitem que um programa tome decisões com base em certas condições. A instrução if é uma das mais comuns e verifica se uma condição é verdadeira, executando um bloco de código se for.

Exemplo:
\`\`\`javascript
let idade = 18;
if (idade >= 18) {
  console.log("Você é maior de idade.");
} else {
  console.log("Você é menor de idade.");
}
\`\`\`
    `,
  },
  3: {
    title: "Funções e Arrays",
    content: `
Funções são blocos de código projetados para realizar uma tarefa específica. Elas podem receber parâmetros e retornar valores. 

Exemplo de função:
\`\`\`javascript
function saudacao(nome) {
  return \`Olá, \${nome}!\`;
}
console.log(saudacao("João")); // saída: Olá, João!
\`\`\`

Arrays são estruturas de dados que armazenam uma coleção de itens, como números ou strings, em uma única variável. 

Exemplo de array:
\`\`\`javascript
let frutas = ["maçã", "banana", "laranja"];
console.log(frutas[0]); // saída: maçã
\`\`\`
    `,
  },
  4: {
    title: "Métodos de Arrays e Objetos",
    content: `
Métodos de arrays são funções que podemos usar para manipular arrays. Alguns métodos comuns são push, pop, shift, unshift, entre outros.

Exemplo de métodos de arrays:
\`\`\`javascript
let frutas = ["maçã", "banana", "laranja"];
frutas.push("uva"); // adiciona "uva" ao final do array
frutas.pop(); // remove o último item do array
\`\`\`

Objetos são coleções de propriedades, e uma propriedade é uma associação entre um nome (ou chave) e um valor. 

Exemplo de objeto:
\`\`\`javascript
let pessoa = {
  nome: "João",
  idade: 30,
  saudacao: function() {
    return \`Olá, meu nome é \${this.nome}\`;
  }
};
console.log(pessoa.saudacao()); // saída: Olá, meu nome é João
\`\`\`
    `,
  },
  5: {
    title: "Padrões de Projeto e Recursão",
    content: `
Padrões de projeto são soluções reutilizáveis para problemas comuns no desenvolvimento de software. Alguns padrões comuns são Singleton, Observer, Factory e Decorator.

Exemplo de padrão Singleton:
\`\`\`javascript
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
}
const instance = new Singleton();
Object.freeze(instance);
console.log(instance);
\`\`\`

Recursão é uma técnica onde uma função chama a si mesma para resolver um problema.

Exemplo de recursão:
\`\`\`javascript
function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}
console.log(factorial(5)); // saída: 120
\`\`\`
    `,
  },
};

const ExplanationScreen = ({ route }) => {
  const { level, trailNumber } = route.params;
  const navigation = useNavigation();

  const handleNextPress = () => {
    navigation.navigate('QuestionScreen', { level, currentQuestionIndex: 0, trailNumber });
  };

  const explanation = explanations[level];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#012768', '#006FC2']} style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={30} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{explanation.title}</Text>
            <Icon name="more-vert" size={30} color="#ffffff" />
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.explanationContainer}>
            <Text style={styles.content}>{explanation.content}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
          <Text style={styles.nextButtonText}>Ir para as perguntas</Text>
        </TouchableOpacity>
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
  scrollView: {
    paddingHorizontal: 20,
  },
  explanationContainer: {
    marginBottom: 30,
  },
  content: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  nextButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#FDD835',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  nextButtonText: {
    color: '#005288',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExplanationScreen;
