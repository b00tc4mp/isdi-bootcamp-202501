import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Button } from 'react-native'

import { logic } from '../../logic/index.js'
import { NavBar } from '../../components/index.js'

import  styles  from './Classification.styles.js'

export default function ClassificationFinishedSeasons({ navigation, route }) {
    const { seasonId } = route.params

    const [leaderboard, setLeaderboard] = useState([])
    const [season, setSeason] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        logic.getSeasonById(seasonId)
        .then(season => {
          if (!season) throw new Error('No hemos encontrado la temporada')
          setSeason(season)
          setError(null)
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
            <Text style={styles.title}>Old classifications</Text>
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
                    {error || 'No hemos encontrado temporada'}
                    </Text>
                </>
            )}
            <NavBar navigation={navigation} />
        </View>
      )
}