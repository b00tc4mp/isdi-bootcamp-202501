import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Button } from 'react-native'

import { logic } from '../../logic/index.js'
import { CustomModal } from '../../components/index.js'

import  styles  from './Classification.styles.js'

export default function ClassificationScreen({ navigation }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [season, setSeason] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [error, setError] = useState(null)

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newSeasonName, setNewSeasonName] = useState('')

  useEffect(() => {
    logic.getUserRole()
      .then(setUserRole)
      .catch(console.error)

    logic.getLatestSeason()
      .then(season => {
        if (!season) throw new Error('No hay ninguna temporada activa actualmente')
        setSeason(season)
        setError(null)
        return logic.getSeasonLeaderboard(season.name)
      })
      .then(setLeaderboard)
      .catch(err => {
        setSeason(null)
        setLeaderboard([])
        setError(err.message)
      })
  }, [])
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
              window.alert(`Temporada finalizada 🎉\nGanador: ${user.username}`)
              setSeason(null)
              setLeaderboard([])
              setError('No hay ninguna temporada activa actualmente')
            })
        } else {
          window.alert('Temporada finalizada. No hubo ganador.')
          setSeason(null)
          setLeaderboard([])
          setError('No hay ninguna temporada activa actualmente')
        }
      })
      .catch(err => window.alert(`Error al finalizar: ${err.message}`))
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
        window.alert(`Error al crear temporada: ${err.message}`)
      })
  }

  const renderHeader = () => (
    <View style={styles.rowHeader}>
      <Text style={styles.cellRank}>#</Text>
      <Text style={styles.cellUsername}>Username</Text>
      <Text style={styles.cellPoints}>Points</Text>
    </View>
  )

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cellRank}>{index + 1}</Text>
      <Text style={styles.cellUsername}>{item.username}</Text>
      <Text style={styles.cellPoints}>{item.points}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classification</Text>

      {season && <Text style={{ fontSize: 16, marginBottom: 10 }}>Season: {season.name}</Text>}

      {season && renderHeader()}

      {season && (
        <FlatList
          data={leaderboard}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}

      {!season && (
        <>
          <Text style={{ marginVertical: 20, fontSize: 16, color: 'gray' }}>
            {error || 'No hay temporada activa en este momento'}
          </Text>
          {userRole === 'admin' && (
            <Button
              title='Crear nueva temporada'
              onPress={() => setShowCreateModal(true)}
            />
          )}
        </>
      )}

      {userRole === 'admin' && season && (
        <Button
          title='Finalizar temporada'
          color='red'
          onPress={handleFinishSeason}
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title='Go to Home' onPress={() => navigation.navigate('Home')} />
      </View>

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
    </View>
  )
}
