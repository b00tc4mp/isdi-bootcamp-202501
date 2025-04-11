import React, { useState, useEffect } from 'react'
import { View, Text, Button, Alert } from 'react-native'
import { logic } from '../../logic'
import styles from './Profile.styles.js'
import { CustomModal } from '../../components/index.js'  

export default function ProfileScreen({ navigation }) {
  const [userRole, setUserRole] = useState('regular')
  const [modalVisible, setModalVisible] = useState(false)
  const [secretWord, setSecretWord] = useState('')

  useEffect(() => {
    logic.getUserRole()
      .then((role) => setUserRole(role))
      .catch((error) => Alert.alert('Error ❌', error.message))
  }, [])


  const handleRequestAdminRole = () => {
    setModalVisible(true)
  }

  const handleModalConfirm = () => {
    if (secretWord) {
      logic.requestAdminRole(secretWord)
        .then(() => {
          // Volvemos a consultar el rol desde el backend después de la actualización
          return logic.getUserRole()
        })
        .then((role) => {
          setUserRole(role)
          Alert.alert('Success', 'Your role has been updated to admin.')
          setModalVisible(false)
          setSecretWord('') // limpiamos el input
        })
        .catch((error) => {
          Alert.alert('Error ❌', error.message || 'Something went wrong.')
          setModalVisible(false)
        })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Your current role: {userRole}</Text>
      <Button title='Go to Home' onPress={() => navigation.navigate('Home')} />
      <Button title='Request Admin Role' onPress={handleRequestAdminRole} />

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
  )
}