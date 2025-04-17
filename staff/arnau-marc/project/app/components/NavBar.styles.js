import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8, // sombra en Android
    shadowColor: '#000', // sombra en iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    fontSize: 26,
    color: '#333'
  }
})