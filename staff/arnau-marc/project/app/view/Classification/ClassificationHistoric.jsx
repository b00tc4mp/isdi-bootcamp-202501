import React, { useEffect, useState } from 'react'
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native'
import { logic } from '../../logic/index.js'
import styles from './Classification.styles.js'
import { NavBar } from '../../components/index.js'

export default function ClassificationHistoric({ navigation }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    logic.getSeasonHistoric()
      .then(setLeaderboard)
      .catch(err => {
        setError(err.message)
        setLeaderboard([])
      })
      .finally(() => setLoading(false))
  }, [])

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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
        <Text style={styles.loadingText}>Cargando clasificación histórica...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clasificación Histórica</Text>
      {renderHeader()}
      <FlatList
        data={leaderboard}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button title='Volver a Clasificación Actual' onPress={() => navigation.navigate('ClassificationScreen')} />
      <NavBar navigation={navigation} />
    </View>
  )
}
