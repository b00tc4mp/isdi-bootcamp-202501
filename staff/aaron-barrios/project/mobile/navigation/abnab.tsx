import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import Landing from '../screens/Landing'
import Login from '../screens/Login'
import Register from '../screens/Register'

{/* tipos para cada ruta (stack.navigator) de screens*/ }
export type RootStackParamList = {
    Landing: undefined // => no espera props
    Login: { alias: string, password: string }
    Register: { alias: string, email: string, password: string }
}


{/*instancia de stack tipada con el type anterior para que TS sepa las rutas y los props de cada una*/ }
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {
    return (
        <NavigationContainer> {/*NvgtionContainer => equivale al Routes (div de navegación)*/}
            <Stack.Navigator initialRouteName="Landing"> {/*StackNavigtor => equivale al Route*/}
                <Stack.Screen name="Landing" component={Landing} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}
