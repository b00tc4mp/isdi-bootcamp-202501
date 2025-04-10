import React, { useState } from 'react'
import { View, Text, Button, Alert, Modal, TextInput } from 'react-native'
import { logic } from '../../logic'  // Asegúrate de importar correctamente la función de lógica
import styles from './Profile.styles.js'

export default function ProfileScreen({ navigation }) {
  const [userRole, setUserRole] = useState('regular')  // Estado para el rol del usuario
  const [secretWord, setSecretWord] = useState('')  // Estado para la palabra secreta
  const [modalVisible, setModalVisible] = useState(false)  // Estado para mostrar/ocultar el modal

  // Función para manejar la solicitud de rol de admin
  const handleRequestAdminRole = () => {
    setModalVisible(true)  // Muestra el modal para ingresar la palabra secreta
  }

  const handleModalClose = () => {
    setModalVisible(false)  // Cierra el modal sin hacer nada
  }

  const handleModalSubmit = () => {
    if (secretWord) {
      logic.requestAdminRole(secretWord)  // Verifica si la función se llama correctamente
        .then(() => {
          setUserRole('admin')  // Actualizar el rol localmente
          Alert.alert('Success', 'Your role has been updated to admin.')
          setModalVisible(false)  // Cierra el modal
        })
        .catch((error) => {
          Alert.alert('Error ❌', error.message || 'Something went wrong.')
          setModalVisible(false)  // Cierra el modal
        })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Your current role: {userRole}</Text> 
      <Button title='Go to Home' onPress={() => navigation.navigate('Home')} />
      <Button title='Request Admin Role' onPress={handleRequestAdminRole} />

      
      <Modal
        transparent={true}
        animationType="slide"j
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter Secret Word</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the secret word"
            value={secretWord}
            onChangeText={setSecretWord}  // Actualiza el estado con el texto ingresado
          />
          <Button title='Cancel' onPress={handleModalClose} />
          <Button title='OK' onPress={handleModalSubmit} />
        </View>
      </Modal>
    </View>
  )
}