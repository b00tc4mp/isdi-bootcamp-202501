import React, { useState, useEffect } from 'react'
import { View, Text, Button, FlatList, Alert, ActivityIndicator} from 'react-native'

import styles from './Home.styles.js'
import { logic } from '../../logic/index.js'

import { CustomModal, NavBar } from '../../components/index.js'

const Home = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [games, setGames] = useState([])
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState('')
  
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)
  const [userMap, setUserMap] = useState({})

  // Usamos useEffect para cargar el username cuando el componente se monta

    useEffect(() => {
      console.debug('Home -> useEffect')
    
      // Cargamos todo en paralelo
      Promise.all([
        logic.getUsername(),
        logic.getUserId(),
        logic.getUserRole(),
        logic.getGames(),
        setLoading(false)
      ])
        .then(([username, userId, role, { games }]) => {
          setUsername(username)
          setUserId(userId)
          setUserRole(role)
          setGames(games)
          navigation.setOptions({
            headerTitle: () => (
              <View style={styles.usernameText}>
                 <Button title= {username} onPress={handleUserClick} />
              </View>
            ),
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerLeft: () => (
              <Text style={styles.homeText}>
                HOME
              </Text>
            ),
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                <Button title="Logout" onPress={handleLogoutClick} />
              </View>
            ),
          })
        })
        .catch(error => {
          console.error(error)
          setLoading(false)
          //Alert.alert('Error ❌', error.message)
          window.alert(`Error ❌\n${error.message}`)
        })
    }, [])

    const fetchGames = () => {
      logic.getGames()
        .then(({ games }) => setGames(games))
        .catch(error => window.alert(`Error ❌\n${error.message}`))
        //Alert.alert('Error ❌', error.message))
    }

  // Función para manejar el logout
  const handleLogoutClick = () => {
    try {
      logic.logoutUser()
      navigation.navigate('Login')  // Navegamos a la pantalla de Login
      Alert.alert('Bye, See You soon!!')
    } catch (error) {
      console.error(error)
      //Alert.alert('Error ❌', error.message)
      window.alert(`Error ❌\n${error.message}`)
    }
  }

  // Función para navegar a la pantalla de perfil
  const handleUserClick = () => {
    try {
      const userId = logic.getUserId()
      navigation.navigate('Profile', { userId })  // Navegamos a la pantalla de Profile
    } catch (error) {
      console.error(error)
      //Alert.alert('Error ❌', error.message)
      window.alert(`Error ❌\n${error.message}`)
    }
  }

  // Función para navegar a la pantalla de clasificación
  const handleClassificationClick = () => {
    navigation.navigate('Classification')  // Navegamos a la pantalla de Classification
  }

  // Función para navegar a la pantalla de crear juego
  const handleAddGameClick = () => {
    navigation.navigate('CreateGame') // Navegamos a la pantalla de CreateGame
  }

  const openWinnerModal = (game) => {
    setSelectedGame(game)
    logic.getUsernamesByIds(game.participants)
      .then(userArray => {
        const map = {}
        userArray.forEach(({ id, username }) => map[id] = username)
        setUserMap(map)
        setModalVisible(true)
      })
      .catch(error => window.alert('Error cargando participantes\n' + error.message))
      //Alert.alert('Error cargando participantes', error.message))
  }

  const handleConfirmWinner = (winnerId) => {
    logic.setGameWinner(selectedGame._id, winnerId)
      .then(() => {
        setModalVisible(false)
        setSelectedGame(null)
        fetchGames()
        Alert.alert('✅ Ganador asignado correctamente')
      })
      .catch(error => {
        //Alert.alert('Error ❌', error.message)
        window.alert(`Error ❌\n${error.message}`)
        setModalVisible(false)
      })
  }

  const handleDeleteGame = (gameId) => {
    if(window.confirm('Delete Game?')){
    return logic.deleteGame(gameId)
      .catch(error => {
        Alert.alert(error.message)
      })
      .then(() =>{
        return logic.getGames()
          .then(({games}) => setGames(games))
          .catch(error => window.alert(`Error ❌\n${error.message}`))
          //Alert.alert('Error ❌', error.message))
      }
      )
    } else { return }
  }
  
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text> ♥️ ♠️ ♣️ ♦️ Cargando Pokapp...  🂽 🂡</Text>
      </View>
    )
  }

  console.debug('Home -> render')

  return (
    <View style={styles.container}>
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
                    .then(() => logic.getGames().then(({ games }) => setGames(games)))
                    .catch(error => Alert.alert('Error ❌', error.message))
                }}
              />
              {userRole === 'admin' && item.status === 'scheduled' &&  (
              <Button
              title="Set Winner"
              onPress={() => openWinnerModal(item)}
              color="#d2691e"
              />
              )
              }
               {userRole === 'admin' && item.status === 'scheduled' &&  (
              <Button
              title="Delete Game"
              onPress={() => handleDeleteGame(item._id)}
              color="#d2691e"
              />
              )
              }
            </View>
          )
        }}
        />
      <CustomModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false)
          setSelectedGame(null)
        }}
        onConfirm={handleConfirmWinner}
        title="Selecciona al ganador"
        cancelText="Cancelar"
        showInput={false}
        options={selectedGame?.participants.map(id => ({
          label: userMap[id] || `ID: ${id.slice(0, 4)}`,
          value: id
        })) || []}
      />
      <NavBar navigation={navigation} />
    </View>
  )
}

export default Home
