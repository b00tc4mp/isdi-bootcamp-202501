import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  homeClick: {
    fontSize: 24,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  profileClick: {
    fontSize: 20,
    color: '#007bff',
  },
  main: {
    marginTop: 20,
    width: '100%',
  },
  headerRightContainer: {
    paddingRight: 15, // Ajusta el valor según el espacio que quieras
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  
  homeText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 15,
    
  },
});

export default styles;