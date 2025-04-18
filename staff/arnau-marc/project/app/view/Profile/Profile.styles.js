import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  statsContainer: {
    marginTop: 24,
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  stat: {
    fontSize: 16,
    marginBottom: 4
  },
  noStats: {
    fontSize: 16,
    color: '#888'
  },

  // Estilos para cards de estadísticas
  statsCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10
  },
  statCard: {
    width: '23%',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 6
  }
})

export default styles