import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from './NavBar.styles.js'

const NavBar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.button}>🏠</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Classification')}>
                <Text style={styles.button}>📊</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.button}>👤</Text>
            </TouchableOpacity>
        </View>
    )
}
export default NavBar