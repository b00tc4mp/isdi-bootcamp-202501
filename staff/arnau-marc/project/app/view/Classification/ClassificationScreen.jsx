import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Button } from 'react-native'

import { logic } from '../../logic/index.js'
import { CustomModal, NavBar, PokerBackground2, PokerHeader, PokerButton } from '../../components/index.js' 

import  styles  from './Classification.styles.js'

export default function ClassificationScreen({ navigation }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [season, setSeason] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [error, setError] = useState(null)

  const [username, setUsername] = useState('')

  const [seasonFinished, setSeasonFinished] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newSeasonName, setNewSeasonName] = useState('')
  const [showFinishedSeasonsModal, setShowFinishedSeasonsModal] = useState(false)
  const [seasonMap, setSeasonMap] = useState({})

  useEffect(() => {
    logic.getUserRole()
      .then(setUserRole)
      .catch(console.error)

    logic.getUsername()
      .then(setUsername)
      .catch(console.error)

    logic.getFinishedSeasons()
      .then(setSeasonFinished)
      .catch(error => Alert.alert(error.message))

    logic.getLatestSeason()
      .then(season => {
        if (!season) throw new Error('No hay ninguna temporada activa actualmente')
        setSeason(season)
        setError(null)
        navigation.setOptions(
          PokerHeader({
            onLogoutPress: handleLogoutClick,
            leftText: 'Classification Season Active'
          })
        )
        return season
      })
      .then(season => {
        if (season && season._id) {
          return logic.getSeasonLeaderboard(season._id)
        }
      })
      .then(setLeaderboard)
      .catch(err => {
        setSeason(null)
        setLeaderboard([])
        setError(err.message)
      })
  }, [])

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
  
    const handleFinishSeason = () => {
      logic.finishSeason(season._id)
        .then(() => {
          // Recargar la season finalizada para ver quién ganó
          return logic.getSeasonById(season._id)
        })
        .then(seasonEnded => {
          const winnerId = seasonEnded.winner
    
          if (winnerId) {
            return logic.getUserById(winnerId)
              .then(user => {
                Alert.alert(`Temporada finalizada 🎉\nGanador: ${user.username}`)
                setSeason(null)
                setLeaderboard([])
                setError('No hay ninguna temporada activa actualmente')
              })
          } else {
            Alert.alert('Temporada finalizada. No hubo ganador.')
            setSeason(null)
            setLeaderboard([])
            setError('No hay ninguna temporada activa actualmente')
          }
        })
        .catch(err => Alert.alert(`Error al finalizar: ${err.message}`))
    }    

  const handleCreateSeason = () => {
    const now = new Date()
    const end = new Date()
    end.setMonth(end.getMonth() + 1)

    logic.createSeason({
      name: newSeasonName,
      startDate: now.toISOString(),
      endDate: end.toISOString()
    })
      .then(() => {
        setShowCreateModal(false)
        setNewSeasonName('')
        return logic.getLatestSeason()
      })
      .then(season => {
        setSeason(season)
        return logic.getSeasonLeaderboard(season._id)
      })
      .then(setLeaderboard)
      .catch(err => {
        setShowCreateModal(false)
        Alert.alert(`Error al crear temporada: ${err.message}`)
      })
  }

  const openSeasonModal = (seasonArray) => {
    if (!seasonArray || seasonArray.length === 0) {
      Alert.alert('No hay temporadas finalizadas disponibles')
      return
    }
  
    const map = {}
    seasonArray.forEach(({ id, seasonName }) => {
      map[id] = seasonName
    })
  
    setSeasonMap(map)
    setShowFinishedSeasonsModal(true)
    
  }

  const handleSelectFinishedSeasons = (seasonId) => {
    setShowFinishedSeasonsModal(false)
    navigation.navigate('ClassificationFinishedSeasons', { seasonId })
  }

  const renderHeader = () => (
    <View style={styles.rowHeader}>
      <Text style={styles.cellRank}>#</Text>
      <Text style={styles.cellUsername}>Username</Text>
      <Text style={styles.cellPoints}>Points</Text>
    </View> 
  )
  
  const renderItem = ({ item, index }) => {
    let displayRank
  
    if (index === 0) displayRank = '🥇'
    else if (index === 1) displayRank = '🥈'
    else if (index === 2) displayRank = '🥉'
    else displayRank = (index + 1).toString()
  
    return (
      <View style={styles.row}>
        <Text style={styles.cellRank}>{displayRank}</Text>
        <Text style={styles.cellUsername}>{item.username}</Text>
        <Text style={styles.cellPoints}>{item.points}</Text>
      </View>
    )
  }

  return (
    <PokerBackground2>
      <Text style={styles.title}>Classification</Text>
      <PokerButton
        title='Ir a Clasificación Histórica'
        onPress={() => navigation.replace('ClassificationHistoric')}
      />

      <PokerButton 
      title='Mostrar temporadas antiguas'
      onPress={() => openSeasonModal(seasonFinished)}
      />

{!season && (
        <>
          <Text style={{ marginVertical: 20, fontSize: 16, color: 'gray' }}>
            {error || 'No hay temporada activa en este momento'}
          </Text>
          {userRole === 'admin' && (
            <PokerButton
              title='Crear nueva temporada'
              onPress={() => setShowCreateModal(true)}
            />
          )}
        </>
      )}

      {userRole === 'admin' && season && (
        <PokerButton
          title='Finalizar temporada'
          color='red'
          onPress={handleFinishSeason}
        />
      )}

      {season && <Text style={{ fontSize: 16, marginBottom: 10 }}>Season: {season.name}</Text>}

      {season && renderHeader()}

      {season && (
        <FlatList
          data={leaderboard}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}

      <CustomModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onConfirm={handleCreateSeason}
        inputValue={newSeasonName}
        setInputValue={setNewSeasonName}
        title='Crear nueva temporada'
        placeholder='Nombre de la temporada'
        confirmText='Crear'
        cancelText='Cancelar'
        showInput={true}
      />
    
      <CustomModal 
        visible={showFinishedSeasonsModal}
        onClose={() => setShowFinishedSeasonsModal(false)}
        onConfirm={handleSelectFinishedSeasons}
        title='Selecciona temporada'
        cancelText='Cancelar'
        showInput={false}
        options={
          seasonFinished?.map(season => ({
          label: seasonMap[season.id],
          value: season.id
        })) || []
      } 
      />
      <NavBar navigation={navigation} />
    </PokerBackground2>
  )
}
