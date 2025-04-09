import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert } from 'react-native'
import styles from './CreateGameStyles'
import { logic } from '../../logic/index'

const CreateGameScreen = ({ navigation }) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [place, setPlace] = useState('')
  
  const handleSubmitCreateGame = () => {
    logic.createGame( title, date, place )
      .then(() => {
        Alert.alert('Success', 'Game created successfully 🎉')
        navigation.navigate('Home')
      })
      .catch(error => {
        console.error(error)
        Alert.alert('Error ❌', error.message)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Game</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Place"
        value={place}
        onChangeText={setPlace}
      />

      <Button title="Create" onPress={handleSubmitCreateGame} />
    </View>
  )
}

export default CreateGameScreen