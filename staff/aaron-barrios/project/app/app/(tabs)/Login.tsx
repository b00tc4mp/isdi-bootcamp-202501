import {TextInput, Button, Alert, StyleSheet} from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View} from '@/components/Themed';

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TZEND</Text>
      <Text style={styles.subtitle}>LOGIN</Text>

      <TextInput
          placeholder="ALIAS"
          // onChangeText={setAlias}
          // value={alias}
          style={styles.input}
          autoCapitalize="none"
      />
      <TextInput
          placeholder="PASSWORD"
          // onChangeText={setPassword}
          // value={password}
          secureTextEntry
          style={styles.input}
      />

      {/*<Button title="LOG IN" onPress={handleLogin} />*/}
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
    alignSelf: 'center',
    marginBottom: 12
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center'
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff'
  },
  link: {
    color: 'blue',
    marginTop: 8,
    textAlign: 'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  }
})
