import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-bold text-green-600">Home Screen</Text>
      <TouchableOpacity
        className="mt-4 bg-green-500 px-4 py-2 rounded"
        onPress={() => navigation.navigate('CreateGame')}
      >
        <Text className="text-white">Go to Create Game</Text>
      </TouchableOpacity>
    </View>
  );
}
