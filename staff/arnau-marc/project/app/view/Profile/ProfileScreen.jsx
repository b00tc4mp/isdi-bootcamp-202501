import React, { useState, useEffect } from 'react'
import { View, Text, Button, Alert, ActivityIndicator, ScrollView } from 'react-native'
import { logic } from '../../logic'
import styles from './Profile.styles.js'
import { CustomModal } from '../../components/index.js'  

export default function ProfileScreen({ navigation }) {
  const [username, setUsername] = useState('')
  const [userRole, setUserRole] = useState('regular')
  const [modalVisible, setModalVisible] = useState(false)
  const [secretWord, setSecretWord] = useState('')
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      logic.getUsername(),
      logic.getUserRole(),
      logic.getUserStats()
    ])
      .then(([username, role, stats]) => {
        setUsername(username)
        setUserRole(role)
        setStats(stats)

        navigation.setOptions({
          headerTitle: () => (
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{username}</Text>
          ),
          headerTitleAlign: 'center'
        })
      })
      .catch((error) => window.alert(`Error ❌\n${error.message}`))
      //Alert.alert('Error ❌', error.message))
      .finally(() => setLoading(false))
  }, [])

  const handleRequestAdminRole = () => {
    setModalVisible(true)
  }

  const handleModalConfirm = () => {
    if (secretWord) {
      logic.requestAdminRole(secretWord)
        .then(() => {
          // Volvemos a consultar el rol desde el backend después de la actualización
          return logic.changeUserRole()
        })
        .then(() => {
          return logic.getUserRole()
        })
        .then((role) => {
          setUserRole(role)
          //Alert.alert('Success', 'Your role has been updated to admin.')
          window.alert('✅ Success\nYour role has been updated to admin.')
          setModalVisible(false)
          setSecretWord('') // limpiamos el input
        })
        .catch((error) => {
          //Alert.alert('Error ❌', error.message || 'Something went wrong.')
          window.alert(`Error ❌\n${error.message || 'Something went wrong.'}`)
          setModalVisible(false)
        })
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Your current role: {userRole}</Text>
      <Button title='Go to Home' onPress={() => navigation.navigate('Home')} />
      {userRole !== 'admin' && (
      <Button title='Request Admin Role' onPress={handleRequestAdminRole} />
      )}

    <View style={styles.statsContainer}>
      <Text style={styles.sectionTitle}>Estadísticas (Temporada Actual)</Text>

      {stats ? (
        <View style={styles.statsCardsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.gamesPlayed}</Text>
            <Text style={styles.statLabel}>Jugadas</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.gamesWon}</Text>
            <Text style={styles.statLabel}>Ganadas</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.winRate}%</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.noStats}>No hay estadísticas disponibles.</Text>
      )}
    </View>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleModalConfirm}
        inputValue={secretWord}
        setInputValue={setSecretWord}
        title="Enter Secret Word"
        placeholder="Enter the secret word"
        confirmText="OK"
        cancelText="Cancel"
      />
    </View>
    </ScrollView>
  )
}