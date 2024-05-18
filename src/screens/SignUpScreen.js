import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';

const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleRegistration = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Validation Error", "Password should be at least 8 characters long.");
      return;
    }

    // Proceed with registration logic here
    Alert.alert("Success", "You have successfully registered.");
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
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#012768"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Senha"
          placeholderTextColor="#012768"
        />
        <TextInput
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
          placeholder="Confirme a senha"
          placeholderTextColor="#012768"
        />
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
