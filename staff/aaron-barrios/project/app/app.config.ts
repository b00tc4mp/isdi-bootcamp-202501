import { networkInterfaces } from 'os'

function getLocalIp() {
    const nets = networkInterfaces()
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]!) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address
            }
        }
    }
    return 'localhost'
}

export default ({ config }: { config: Record<string, any> }) => {
    return {
        ...config,
        extra: {
            apiUrl: process.env.EXPO_PUBLIC_API_URL?.replace('localhost', getLocalIp())
        }
    }
}