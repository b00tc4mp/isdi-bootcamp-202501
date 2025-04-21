import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './CreateGame.styles.js'
import { logic } from '../../logic'
import { CustomModal, NavBar, PokerButton, PokerHeader, PokerBackground } from '../../components/index.js'

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
        navigation.setOptions(
          PokerHeader({
            onLogoutPress: handleLogoutClick,
            leftText: 'Create Game'
          })
        )
      })
      .catch(error => {
        console.error(error)
        window.alert(`Error cargando season activa: ${error.message}`)
        setSeasonOptions([{ label: 'Casual', value: 'casual' }])
      })
  }, [])

  const handleLogoutClick = () => {
    try {
      logic.logoutUser()
      navigation.navigate('Login')
      window.alert('Bye, See You soon!!')
    } catch (error) {
      console.error(error)
      window.alert(`Error ❌\n${error.message}`)
    }
  }

  const handleCreateGame = () => {
    const isoDate = date.toISOString()
    logic.createGame(title, season, place, isoDate)
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
    <PokerBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Create Game</Text>

        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#444"
          value={title}
          onChangeText={setTitle}
        />

        <PokerButton
          title={season ? `Season: ${season}` : 'Select Season'}
          onPress={() => setModalVisible(true)}
        />

        <TextInput
          style={styles.input}
          placeholder="Place"
          placeholderTextColor="#444"
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
            <View style={styles.dateContainer}>
            <PokerButton title="📅 Select Date" onPress={() => setShowDatePicker(true)} />
            <Text style={styles.dateText}>
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
          </View>

          )}
        </View>

        <PokerButton title="Create Game" onPress={handleCreateGame} />

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
      </View>

      <NavBar navigation={navigation} />
    </PokerBackground>
  )
}
