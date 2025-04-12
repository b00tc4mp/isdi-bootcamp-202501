import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },
  rowHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8
  },
  cellRank: {
    width: 30,
    fontWeight: 'bold'
  },
  cellUsername: {
    flex: 1
  },
  cellPoints: {
    width: 60,
    textAlign: 'right'
  }
})


  export default styles;