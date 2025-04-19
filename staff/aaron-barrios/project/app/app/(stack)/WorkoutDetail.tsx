import { Text, View } from "react-native"
import { useLocalSearchParams } from "expo-router"

export default function WorkoutDetail() {
    const { workoutId } = useLocalSearchParams()

    return (
        <View>
            <Text>Workout ID: {workoutId}</Text>
        </View>
    )
}