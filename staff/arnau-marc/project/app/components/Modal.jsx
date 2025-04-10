import React from 'react'
import { Modal, View, Text, TextInput, Button } from 'react-native'
import styles from './Modal.styles.js'

export  function CustomModal({ visible, onClose, onConfirm, inputValue,setInputValue,title = 'Enter text',placeholder = 'Type here...',confirmText = 'Confirm',cancelText = 'Cancel', }) {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{title}</Text>
        <TextInput
          placeholder={placeholder}
          value={inputValue}
          onChangeText={setInputValue}
          style={styles.modalInput}
        />
        <Button title={confirmText} onPress={onConfirm} />
        <Button title={cancelText} color="gray" onPress={onClose} />
      </View>
    </View>
  </Modal>
)
}