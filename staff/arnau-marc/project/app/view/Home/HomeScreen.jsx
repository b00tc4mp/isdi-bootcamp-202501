import React, { useState, useEffect } from 'react'
import { View, Text, Button, FlatList, Alert} from 'react-native'
import styles from './HomeStyle.js'
import { logic } from '../../logic/index.js'

const Home = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [games, setGames] = useState([])
  const [userId, setUserId] = useState('')

  // Usamos useEffect para cargar el username cuando el componente se monta
  useEffect(() => {
    console.debug('Home -> useEffect')

    try {
      logic.getUsername()
        .then((username) => setUsername(username))
        .catch((error) => {
          console.error(error)
          Alert.alert('Error ❌', error.message)
        })
        const userId = logic.getUserId()
        setUserId(userId)

        fetchGames()
    } catch (error) {
      console.error(error)
      Alert.alert('Error ❌', error.message)
    }
  }, [])

  const fetchGames = () => {
    logic.getGames()
      .then(({games}) => setGames(games))
      .catch(error => Alert.alert('Error ❌', error.message))
  }

  // Función para manejar el logout
  const handleLogoutClick = () => {
    try {
      logic.logoutUser()
      navigation.navigate('Login')  // Navegamos a la pantalla de Login
      Alert.alert('Bye, See You soon!!')
    } catch (error) {
      console.error(error)
      Alert.alert('Error ❌', error.message)
    }
  }

  // Función para navegar a la pantalla de perfil
  const handleUserClick = () => {
    try {
      const userId = logic.getUserId()
      navigation.navigate('Profile', { userId })  // Navegamos a la pantalla de Profile
    } catch (error) {
      console.error(error)
      Alert.alert('Error ❌', error.message)
    }
  }

  // Función para navegar a la pantalla de clasificación
  const handleClassificationClick = () => {
    navigation.navigate('Classification')  // Navegamos a la pantalla de Classification
  }

  // Función para navegar a la pantalla de crear juego
  const handleAddGameClick = () => {
    navigation.navigate('CreateGame')  // Navegamos a la pantalla de CreateGame
  }

  console.debug('Home -> render')

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.homeClick} onPress={() => navigation.navigate('Home')}>
          HOME
        </Text>
        <Text style={styles.profileClick} onPress={handleUserClick}>
          🙋 {username}
        </Text>

        <Button title="Logout" onPress={handleLogoutClick} />
      </View>

      <View style={styles.main}>
        <Button title="Go to Profile" onPress={handleUserClick} />
        <Button title="Go to Classification" onPress={handleClassificationClick} />
        <Button title="Create Game" onPress={handleAddGameClick} />
      </View>
        {/* Lista de partidas */}
        <FlatList



        data={games}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const isParticipant = item.participants.includes(userId)

          return (
            <View style={{ marginVertical: 10 }}>
              <Text>{item.title} - {item.date}</Text>
              <Button
                title={isParticipant ? 'Cancel' : 'Participate'}
                onPress={() => {
                  logic.toggleParticipation(item._id)
                    .then(() => fetchGames())
                    .catch(error => Alert.alert('Error ❌', error.message))
                }}
              />
            </View>
          )
        }}
      />
    </View>

  )
}

export default Home
