import { Stack } from "expo-router"
import { useColorScheme } from "@/components/useColorScheme"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"

export default function StackLayout() {
    const colorScheme = useColorScheme()

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            >
                <Stack.Screen name="CreateWorkout" />
                <Stack.Screen name="CreateRoutine" />
                <Stack.Screen name="EditWorkout" />
                <Stack.Screen name="WorkoutDetail" />
                <Stack.Screen name="RoutineDetail" />
                <Stack.Screen name="CustomRoutine" />
            </Stack>
        </ThemeProvider>
    )
}