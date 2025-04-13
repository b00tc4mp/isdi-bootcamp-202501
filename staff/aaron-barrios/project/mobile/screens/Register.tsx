import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/appNavigator'

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>

export default function Register({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>TZEND</Text>
            <Text style={styles.subtitle}>REGISTER</Text>

            <TextInput placeholder="ALIAS" style={styles.input} />
            <TextInput placeholder="EMAIL" style={styles.input} />
            <TextInput placeholder="PASSWORD" secureTextEntry style={styles.input} />

            <Button title="CREATE ACCOUNT" onPress={() => console.log('register logic')} />

            <TouchableOpacity onPress={() => navigation.navigate('Login', {
                alias: '',
                password: ''
            })}>
                <Text style={styles.link}>LOG IN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('access as guest')}>
                <Text style={styles.link}>ENTER AS A GUEST</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#f0f0f0'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 12
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        alignSelf: 'center'
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#fff'
    },
    link: {
        color: 'blue',
        marginTop: 8,
        textAlign: 'center'
    }
})