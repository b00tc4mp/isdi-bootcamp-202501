import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/appNavigator'
import { View, Text, Button } from 'react-native'


type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>

export default function Landing({ navigation }: Props) {
    return (
        <View>
            <Text>React Native Landing</Text>
            <Button title="Iniciar sesión" onPress={() => navigation.navigate('Login', { alias: '', password: '' })} />
            <Button title="Registrarse" onPress={() => navigation.navigate('Register', { alias: '', email: '', password: '' })} />
        </View>
    )
}
