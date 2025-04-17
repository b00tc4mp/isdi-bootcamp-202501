import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import styles from './NavBar.styles.js'

const NavBar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <AntDesign name="home" size={28} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Classification')}>
                <Entypo name="trophy" size={28} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Entypo name="user" size={28} style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}
export default NavBar