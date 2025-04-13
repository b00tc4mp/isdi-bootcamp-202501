import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import Landing from '../screens/Landing'
import Login from '../screens/Login'
import Register from '../screens/Register'

export type RootStackParamList = {
    Landing: undefined
    Login: { alias: string, password: string }
    Register: { alias: string, email: string, password: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
                <Stack.Screen name="Landing" component={Landing} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}
