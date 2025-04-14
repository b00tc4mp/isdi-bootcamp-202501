export default ({ config }: { config: Record<string, any> }) => {
    return {
        ...config,
        extra: {
            apiUrl: process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080" // o tu backend
        }
    }
}
