import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './CreateGame.styles.js'
import { logic } from '../../logic'
import { CustomModal, NavBar } from '../../components'

export default function CreateGameScreen({ navigation }) {
  const [title, setTitle] = useState('')
  const [season, setSeason] = useState('')
  const [place, setPlace] = useState('')
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [seasonOptions, setSeasonOptions] = useState([])

  useEffect(() => {
    logic.getLatestSeason()
      .then(season => {
        const options = season ? [
          { label: season.name, value: season.name },
          { label: 'Casual', value: 'casual' }
        ] : [
          { label: 'Casual', value: 'casual' }
        ]
        setSeasonOptions(options)
      })
      .catch(error => {
        console.error(error)
        window.alert(`Error cargando season activa: ${error.message}`)
        setSeasonOptions([{ label: 'Casual', value: 'casual' }])
      })
  }, [])

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
    setShowDatePicker(Platform.OS === 'ios')
    setDate(currentDate)
  }

  const handleSeasonSelect = (value) => {
    setSeason(value)
    setModalVisible(false)
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

      <Button title={season ? `Season: ${season}` : 'Select Season'} onPress={() => setModalVisible(true)} />

      <TextInput
        style={styles.input}
        placeholder="Place"
        value={place}
        onChangeText={setPlace}
      />

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

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleSeasonSelect}
        inputValue={season}
        setInputValue={setSeason}
        title="Select Season"
        showInput={false}
        options={seasonOptions}
      />
      <NavBar navigation={navigation} />
    </View>
  )
}
 


/*
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

*/