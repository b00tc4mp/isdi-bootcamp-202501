// app/App.js
import 'react-native-gesture-handler';  // Asegúrate de que esté al principio
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from './view/Home/HomeScreen';
import LoginScreen from './view/Login/LoginScreen';
import RegisterScreen from './view/Register/RegisterScreen';
import ProfileScreen from './view/Profile/ProfileScreen';
import CreateGameScreen from './view/CreateGame/CreateGameScreen';
import ClassificationScreen from './view/Classification/ClassificationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CreateGame" component={CreateGameScreen} />
        <Stack.Screen name="Classification" component={ClassificationScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
