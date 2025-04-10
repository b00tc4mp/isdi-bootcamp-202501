import React from 'react'
import { View, Text, Button } from 'react-native'

import { styles } from './Classification.styles.js'

export default function ClassificationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classification</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

