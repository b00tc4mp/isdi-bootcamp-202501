import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert } from 'react-native'
import styles from './CreateGame.styles.js'
import { logic } from '../../logic/index.js'

const CreateGameScreen = ({ navigation }) => {
  const [title, setTitle] = useState('')
  const [season, setSeason] = useState('')
  const [date, setDate] = useState('')
  const [place, setPlace] = useState('')
  
  const handleSubmitCreateGame = () => {
    logic.createGame( title, season, date, place )
      .then(() => {
        //Alert.alert('Success', 'Game created successfully 🎉')
        window.alert('Success\nGame created successfully 🎉')
        navigation.navigate('Home')
      })
      .catch(error => {
        console.error(error)
        //Alert.alert('Error ❌', error.message)
        window.alert(`Error ❌\n${error.message}`)
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
        placeholder="Season"
        value={season}
        onChangeText={setSeason}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (DD-MM-YYYY)"
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