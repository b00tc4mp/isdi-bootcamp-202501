import { StyleSheet } from 'react-native';

// Estilos para la pantalla de login
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 20,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
  },
  input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 15,
      paddingLeft: 10,
      width: '100%',
      borderRadius: 5,
  },
  link: {
      color: '#1E90FF',
      marginTop: 20,
  },
});

  
  export default styles;