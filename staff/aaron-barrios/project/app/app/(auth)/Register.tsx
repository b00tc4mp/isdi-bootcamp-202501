import { useState } from 'react'
import { TextInput, StyleSheet, Button, Alert } from 'react-native'
import { Text, View } from '@/components/Themed'
import { useRouter } from 'expo-router'

import registerUser from '@/services/registerUser'
import { errors } from '@/com'

const { SystemError, ValidationError } = errors

export default function Register() {
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleRegister = () => {
    try {
      // Lógica asíncrona
      registerUser(alias, email, password)
        .then(() => {
          setAlias('');
          setEmail('');
          setPassword('');

          Alert.alert('✅ Registro exitoso', 'Ya puedes iniciar sesión');
          router.replace('/(auth)/Login' as any)
          //se pone replace y no push por que push añade la nueva ruta al historial de navegacion
          //mientras que el replace la sustituye, lo cual hace que el usuario no pueda volver atrás con el back button
        })
        .catch((error) => {
          console.error(error);

          if (error instanceof SystemError)
            Alert.alert('⛔', error.message);
          else
            Alert.alert('⚠️ Error inesperado', error.message || 'Ups...');
        });
    } catch (error) {
      console.error(error);

      if (error instanceof ValidationError)
        Alert.alert('❌ Validación', error.message);
      else
        Alert.alert('⛔ Error fatal', error instanceof Error ? error.message : 'Algo salió mal');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>

      <TextInput
        placeholder="ALIAS"
        onChangeText={setAlias}
        value={alias}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="EMAIL"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="PASSWORD"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        style={styles.input}
      />

      <Button title="REGISTER" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 12
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff'
  }
});
