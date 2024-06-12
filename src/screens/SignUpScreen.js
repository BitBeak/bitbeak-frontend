import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Text, TouchableOpacity, Alert, Image, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext'; // Ajuste o caminho conforme necessário

const SignUpScreen = ({ navigation }) => {
  const { registerUser, validateUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
        'Mulish-Bold': require('../../assets/fonts/Mulish-Bold.ttf'),
        'Mulish': require('../../assets/fonts/Mulish-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Clear inputs when the screen gains focus
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }, [])
  );

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleRegistration = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Erro de validação", "Por favor, preencha todos os campos.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Erro de validação", "Por favor, insira um e-mail válido.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erro de validação", "As senhas não coincidem.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Erro de validação", "A senha precisa possuir no mínimo 8 caracteres.");
      return;
    }

    // Verificar se o usuário já está cadastrado
    if (validateUser(email, password)) {
      Alert.alert("Erro de validação", "Este e-mail já está cadastrado.");
      return;
    }

    // Registrar o usuário
    registerUser(email, password);
    Alert.alert("Sucesso", "Você se registrou com sucesso.");
    navigation.navigate('LoginScreen');
  };

  const navigateToLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#012768', '#006FC2']} style={styles.gradient}>
        <Text style={styles.title}>CADASTRO</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Nome de Usuário"
          placeholderTextColor="#012768"
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="E-mail"
          keyboardType="email-address"
          placeholderTextColor="#012768"
        />
        <View style={styles.inputPasswordContainer}>
          <TextInput
            style={styles.inputPassword}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!passwordVisible}
            placeholder="Senha"
            placeholderTextColor="#012768"
          />
          <TouchableWithoutFeedback onPress={() => setPasswordVisible(!passwordVisible)}>
            <Image
              source={passwordVisible ? require('../../assets/icons/showPassword.png') : require('../../assets/icons/hidePassword.png')}
              style={styles.toggleIcon}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.inputPasswordContainer}>
          <TextInput
            style={styles.inputPassword}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry={!confirmPasswordVisible}
            placeholder="Confirme a senha"
            placeholderTextColor="#012768"
          />
          <TouchableWithoutFeedback onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <Image
              source={confirmPasswordVisible ? require('../../assets/icons/showPassword.png') : require('../../assets/icons/hidePassword.png')}
              style={styles.toggleIcon}
            />
          </TouchableWithoutFeedback>
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegistration}>
          <Text style={styles.registerButtonText}>CADASTRAR-SE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectButton} onPress={navigateToLoginScreen}>
          <Text style={styles.connectButtonText}>Tem uma conta? {"\n\t\t"} Conecte-se</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#FFD21F',
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    lineHeight: 54,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: 319,
    height: 63,
    backgroundColor: '#FFFFFF',
    borderRadius: 31.5,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Mulish',
    color: '#012768',
  },
  inputPasswordContainer: {
    flexDirection: 'row',
    width: 319,
    height: 63,
    backgroundColor: '#FFFFFF',
    borderRadius: 31.5,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  inputPassword: {
    flex: 1,
    fontFamily: 'Mulish',
    fontSize: 18,
    color: '#012768',
  },
  toggleIcon: {
    width: 34,
    height: 34,
  },
  registerButton: {
    width: 319,
    height: 63,
    backgroundColor: '#FFD21F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 31.5,
    marginTop: 10,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#012768',
    fontFamily: 'Mulish-Bold',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  connectButton: {
    width: 319,
    height: 63,
    backgroundColor: 'rgba(200, 196, 183, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 31.5,
    marginBottom: 10,
  },
  connectButtonText: {
    color: '#012768',
    fontSize: 20,
    fontFamily: 'Mulish',
  },
});

export default SignUpScreen;
