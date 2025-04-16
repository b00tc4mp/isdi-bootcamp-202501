import React, { useState } from 'react'
import { View, Text, TextInput, Button, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './CreateGame.styles.js'
import { logic } from '../../logic'

export default function CreateGameScreen({ navigation }) {
  const [title, setTitle] = useState('')
  const [season, setSeason] = useState('')
  const [place, setPlace] = useState('')
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleCreateGame = () => {
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    logic.createGame(title, season, place, formattedDate)
      .then(() => {
        window.alert('Game created successfully 🎉')
        navigation.navigate('Home')
      })
      .catch(error => {
        window.alert(`Error ❌\n${error.message}`)
      })
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowDatePicker(Platform.OS === 'ios') // solo sigue visible en iOS
    setDate(currentDate)
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
        placeholder="Place"
        value={place}
        onChangeText={setPlace}
      />

      {/* Date Picker adaptado */}
      <View style={styles.input}>
        {Platform.OS === 'web' ? (
          <>
            <Text>Select Date</Text>
            <input
              type="date"
              value={date.toISOString().split('T')[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
              style={{ padding: 8 }}
            />
          </>
        ) : (
          <>
            <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
            <Text style={{ marginTop: 8 }}>
              Selected Date: {date.toLocaleDateString()}
            </Text>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </>
        )}
      </View>

      <Button title="Create Game" onPress={handleCreateGame} />
    </View>
  )
}

/*
import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert, Platform} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './CreateGame.styles.js'
import { logic } from '../../logic/index.js'

const CreateGameScreen = ({ navigation }) => {
  const [title, setTitle] = useState('')
  const [season, setSeason] = useState('')
  const [date, setDate] = useState(new Date())
  const [place, setPlace] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  
  const handleSubmitCreateGame = () => {
    logic.createGame( title, season, date.toISOString(), place )
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

  const formattedDate = date.toLocaleDateString('es-ES', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  })

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Create Game</Text>

    <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
    <TextInput style={styles.input} placeholder="Season" value={season} onChangeText={setSeason} />
    <TextInput style={styles.input} placeholder="Place" value={place} onChangeText={setPlace} />

    <Button title={`Select Date: ${formattedDate}`} onPress={() => setShowPicker(true)} />

    {showPicker && (
      <DateTimePicker
        value={date}
        mode="date"
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onChange={(event, selectedDate) => {
          setShowPicker(false)
          if (selectedDate) setDate(selectedDate)
        }}
      />
    )}

    <Button title="Create" onPress={handleSubmitCreateGame} />
  </View>
)
}

export default CreateGameScreen
*/