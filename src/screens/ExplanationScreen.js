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
    title: "Estruturas Condicionais",
    content: `
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

Você também pode usar else if para verificar múltiplas condições:

Exemplo:
\`\`\`javascript
let nota = 85;
if (nota >= 90) {
  console.log("A");
} else if (nota >= 80) {
  console.log("B");
} else if (nota >= 70) {
  console.log("C");
} else {
  console.log("D");
}
\`\`\`
    `,
  },
  3: {
    title: "Estruturas de Repetição",
    content: `
Estruturas de repetição permitem que um bloco de código seja executado várias vezes. O loop for é uma das estruturas mais utilizadas e é ideal quando você sabe quantas vezes deseja executar um bloco de código.

Exemplo de loop for:
\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
\`\`\`

O loop while é usado quando você quer repetir um bloco de código enquanto uma condição for verdadeira.

Exemplo de loop while:
\`\`\`javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
\`\`\`
    `,
  },
  4: {
    title: "Arrays",
    content: `
Um array é uma estrutura de dados que armazena uma coleção de itens, como números ou strings, em uma única variável. Os itens são acessados usando índices.

Exemplo de array:
\`\`\`javascript
let frutas = ["maçã", "banana", "laranja"];
console.log(frutas[0]); // saída: maçã
\`\`\`

Você pode adicionar itens a um array usando o método push e remover itens usando o método pop.

Exemplo:
\`\`\`javascript
frutas.push("uva"); // adiciona "uva" ao final do array
frutas.pop(); // remove o último item do array
\`\`\`
    `,
  },
  5: {
    title: "Funções",
    content: `
Uma função é um bloco de código projetado para realizar uma tarefa específica. As funções são definidas com a palavra-chave function seguida por um nome, parênteses e um bloco de código.

Exemplo de função:
\`\`\`javascript
function saudacao(nome) {
  return \`Olá, \${nome}!\`;
}
console.log(saudacao("João")); // saída: Olá, João!
\`\`\`

Funções podem receber parâmetros e retornar valores. O return dentro de uma função encerra a função e retorna o valor especificado.

Exemplo:
\`\`\`javascript
function soma(a, b) {
  return a + b;
}
console.log(soma(3, 4)); // saída: 7
\`\`\`
    `,
  },
};

const ExplanationScreen = ({ route }) => {
  const { level } = route.params;
  const navigation = useNavigation();

  const handleNextPress = () => {
    navigation.navigate('QuestionScreen', { level });
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
          <Text style={styles.nextButtonText}>Ir para as Perguntas</Text>
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
