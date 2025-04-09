import React, { useState, useEffect } from 'react'
import { View, Text, Button} from 'react-native'
import styles from './HomeStyle.js'
import { logic } from '../../logic/index.js'

const Home = ({ navigation }) => {
  const [username, setUsername] = useState('')

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
    } catch (error) {
      console.error(error)
      Alert.alert('Error ❌', error.message)
    }
  }, [])

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
        <Button title="Add a Game" onPress={handleAddGameClick} />
      </View>
    </View>
  )
}

export default Home
