import React from 'react'
import { View, Text, Button } from 'react-native'
import styles from './Profile.styles.js'

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  )
}
