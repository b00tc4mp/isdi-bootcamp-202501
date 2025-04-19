import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center'
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 16
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  suggestionText: {
    fontSize: 16
  }
})

export default styles