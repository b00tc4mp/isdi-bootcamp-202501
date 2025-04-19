import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { logic } from '../../logic/index.js'

import styles from './searchProfile.styles.js'

export default function SearchProfile() {
  const navigation = useNavigation()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }

    const timeout = setTimeout(() => {
      logic.searchUsers(query)
        .then(setSuggestions)
        .catch(() => {
          Alert.alert('Error', 'No encontramos al usuario 😔')
        })
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  const handleSearch = () => {
    if (!query.trim()) {
      Alert.alert('Error', 'El campo de búsqueda no puede estar vacío')
      return
    }

    logic.getUserId()
      .then(userId => {
        navigation.navigate('UserProfile', { username: query, userId })
      })
      .catch(error => {
        Alert.alert('Error', error.message)
      })
  }

  const handleSelectUser = (user) => {
    setQuery('')
    setSuggestions([])
    navigation.navigate('UserProfile', { username: user.username, userId: user.id })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Usuarios</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder='Buscar usuario'
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
      </View>

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectUser(item)} style={styles.suggestionItem}>
            <Text style={styles.suggestionText}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
