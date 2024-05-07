import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
        'Mulish-Bold': require('./assets/fonts/Mulish-Bold.ttf'),
        'Mulish': require('./assets/fonts/Mulish-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#012768', '#006FC2']} style={styles.gradient}>
        <Image source={require('./assets/bitbeak-logo.png')} style={styles.logo} />
        <Text style={styles.title}>LOGIN</Text>
        <TextInput
          style={styles.inputEmail}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#012768"
        />
        <TextInput
          style={styles.inputPassword}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Senha"
          placeholderTextColor="#012768"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>INICIAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Cadastre-se</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>Esqueceu sua senha?</Text>
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
  logo: {
    width: 210,
    height: 212.64,
    marginBottom: 15,
  },
  title: {
    color: '#FFD21F',
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    lineHeight: 54,
    textAlign: 'center',
    marginBottom: 15,
  },
  inputEmail: {
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
  inputPassword: {
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
  button: {
    width: 319,
    height: 63,
    backgroundColor: '#FFD21F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 31.5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#012768',
    fontSize: 24,
    fontFamily: 'Mulish-Bold',
  },
  registerButton: {
    width: 319,
    height: 63,
    backgroundColor: 'rgba(200, 196, 183, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 31.5,
    marginBottom: 10,
  },
  registerButtonText: {
    color: '#012768',
    fontSize: 20,
    fontFamily: 'Mulish',
  },
  footerText: {
    color: '#FFD21F',
    fontSize: 16,
    fontFamily: 'Mulish',
    fontWeight: '300',
    lineHeight: 21,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default LoginScreen;