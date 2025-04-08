import React, { useState } from 'react';
import { View, Text, TextInput, Button} from 'react-native'
import styles from './CreateGameStyles'

export default function CreateGameScreen({ navigation }) {
  const [gameName, setGameName] = useState('');
  const [gameDate, setGameDate] = useState('');
  const [gameDescription, setGameDescription] = useState('');

  const handleCreateGame = () => {
    console.log('Game Created:', gameName, gameDate, gameDescription);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Game</Text>
      
      <TextInput
        value={gameName}
        onChangeText={setGameName}
        placeholder="Game Name"
        style={styles.input}
      />
      <TextInput
        value={gameDate}
        onChangeText={setGameDate}
        placeholder="Game Date (YYYY-MM-DD)"
        style={styles.input}
      />
      <TextInput
        value={gameDescription}
        onChangeText={setGameDescription}
        placeholder="Game Description"
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      
      <Button title="Create Game" onPress={handleCreateGame} />
    </View>
  );
}

