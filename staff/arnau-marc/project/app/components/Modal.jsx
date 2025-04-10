import React from 'react'
import { Modal, View, Text, TextInput, Button } from 'react-native'
import styles from './Home.styles.js'

export default function Modal({ visible, onClose, onConfirm, winnerInput, setWinnerInput }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Set Winner Username</Text>
          <TextInput
            placeholder="Winner username"
            value={winnerInput}
            onChangeText={setWinnerInput}
            style={styles.modalInput}
          />
          <Button title="Confirm" onPress={onConfirm} />
          <Button title="Cancel" color="gray" onPress={onClose} />
        </View>
      </View>
    </Modal>
  )
}