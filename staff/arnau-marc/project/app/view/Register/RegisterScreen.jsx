import React, { useState } from 'react';
import { View, Text, TextInput, Button} from 'react-native';
import styles from './RegisterStyles'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = () => {
    console.log('Register:', name, email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

