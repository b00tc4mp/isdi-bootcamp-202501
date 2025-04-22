import React, { useState, useEffect } from 'react'
import { View, Text, Button, FlatList, Alert, ActivityIndicator} from 'react-native'

import styles from './Home.styles.js'
import { logic } from '../../logic/index.js'

import { CustomModal, NavBar, PokerButton, PokerHeader, PokerBackground} from '../../components/index.js'

const Home = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [games, setGames] = useState([])
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState('')

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)
  const [userMap, setUserMap] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [username, userId, role, { games }] = await Promise.all([
          logic.getUsername(),
          logic.getUserId(),
          logic.getUserRole(),
          logic.getGames()
        ])
  
        setUsername(username)
        setUserId(userId)
        setUserRole(role)
        setGames(games)
  
        const allParticipantIds = [...new Set(games.flatMap(g => g.participants))]
        const usernamesMap = await logic.getUsernamesByIds(allParticipantIds)
        const map = {}
        usernamesMap.forEach(({ id, username }) => map[id] = username)
        setUserMap(map)
  
        navigation.setOptions(
          PokerHeader({
            username,
            onUserPress: handleUserClick,
            onLogoutPress: handleLogoutClick,
            leftText: 'HOME'
          })
        )
      } catch (error) {
        console.error(error)
        Alert.alert(`Error ❌\n${error.message}`)
      } finally {
        setLoading(false)
      }
    }
  
    fetchData()
  }, [])
  
<<<<<<< HEAD

=======
>>>>>>> 8af9266ce4948a184789d77a87dbd2844fd93417
  const fetchGames = () => {
    logic.getGames()
      .then(({ games }) => setGames(games))
      .catch(error => Alert.alert(`Error ❌\n${error.message}`))
  }

  const handleLogoutClick = () => {
    try {
      logic.logoutUser()
      navigation.navigate('Login')
      Alert.alert('Bye, See You soon!!')
    } catch (error) {
      console.error(error)
      Alert.alert(`Error ❌\n${error.message}`)
    }
  }

  const handleUserClick = () => {
    try {
      const userId = logic.getUserId()
      navigation.navigate('Profile', { userId })
    } catch (error) {
      console.error(error)
      Alert.alert(`Error ❌\n${error.message}`)
    }
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
      .catch(error => Alert.alert('Error cargando participantes\n' + error.message))
  }

  const handleConfirmWinner = (winnerId) => {
    if (Alert.confirm('Set Winner? This is action is irreversible')){
    logic.setGameWinner(selectedGame._id, winnerId)
      .then(() => {
        setModalVisible(false)
        setSelectedGame(null)
        fetchGames()
        Alert.alert('✅ Ganador asignado correctamente')
      })
      .catch(error => {
        Alert.alert(`Error ❌\n${error.message}`)
        setModalVisible(false)
      })
    }
  }

  const handleDeleteGame = (gameId) => {
<<<<<<< HEAD
    if (Alert.confirm('Delete Game? This is action is irreversible')) {
      return logic.deleteGame(gameId)
        .then(() => logic.getGames().then(({ games }) => setGames(games)))
        .catch(error => Alert.alert(error.message))
    }
  }
=======
    Alert.alert(
      '🃏 Delete Game?',
      'Are you sure you want to remove this poker game from the list? ♠️♥️',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            logic.deleteGame(gameId)
              .then(() => logic.getGames())
              .then(({ games }) => setGames(games))
              .catch(error => Alert.alert('Error ❌', error.message))
          }
        }
      ]
    )
  }  
>>>>>>> 8af9266ce4948a184789d77a87dbd2844fd93417

  const scheduledGames = games.filter(game => game.status === 'scheduled')
  const finishedGames = games.filter(game => game.status === 'finished')
  const combinedGames = [...scheduledGames, ...finishedGames]

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text> ♥️ ♠️ ♣️ ♦️ Cargando Pokapp... 🂽 🂡</Text>
      </View>
    )
  }

  return (
    <PokerBackground>
      <FlatList
       style={{ flex: 1 }}
       contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        data={games.sort((a, b) => (a.status === 'scheduled' ? -1 : 1))}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const isParticipant = item.participants.includes(userId)

          return (
            <View
              style={[
                styles.gameCard,
                item.status === 'scheduled' ? styles.scheduledCard : styles.finishedCard
              ]}
            >
              <Text style={styles.gameTitle}>{item.title}</Text>
              <Text style={styles.gameDate}>{new Date(item.date).toLocaleString()}</Text>

              <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Participants:</Text>
              {item.participants.length === 0 ? (
                <Text style={{ color: '#999' }}>No participants yet</Text>
              ) : (
                item.participants.map(partId => (
                  <Text key={partId} style={{ marginLeft: 8 }}>
                    • {userMap[partId] || 'Loading...'}
                  </Text>
                ))
              )}
              </View>
              {item.status === 'finished' && item.winner && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', color: '#4CAF50' }}>
                  🏆 Winner: {userMap[item.winner] || `ID: ${item.winner?.slice(0, 4)}`}
                </Text>
                <Text style={{ color: '#333', marginLeft: 4 }}>
                  Points earned: {item.points ?? 0}
                </Text>
              </View>
            )}
            
               <View style={styles.buttonContainer}>
                {item.status === 'scheduled' && (
                <PokerButton
                  title={isParticipant ? 'Cancel' : 'Participate'}
                  onPress={() => {
                    logic.toggleParticipation(item._id)
                      .then(() => logic.getGames().then(({ games }) => setGames(games)))
                      .catch(error => Alert.alert('Error ❌', error.message))
                  }}
                 /> 
                )}
                {userRole === 'admin' && item.status === 'scheduled' && (
                  <>
                    <PokerButton
                      title="Set Winner"
                      onPress={() => openWinnerModal(item)}
                      color='#4caf50'
                      textColor='#fff'
                    />
                    <PokerButton
                      title="Delete Game"
                      onPress={() => handleDeleteGame(item._id)}
                      color='#a00000'
                      textColor='#fff'
                    />
                  </>
                )}
              </View>
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
    </PokerBackground>
  )
}

export default Home