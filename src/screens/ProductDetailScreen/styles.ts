import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  image: { width: '100%', height: 300, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  category: { fontSize: 16, color: 'gray', marginBottom: 10 },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: { fontSize: 20, color: 'green', fontWeight: 'bold' },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
    marginLeft: 10,
  },
  discount: { fontSize: 16, color: 'red', marginLeft: 10 },
  description: { fontSize: 16, marginBottom: 20 },
  buttonContainer: { marginVertical: 10 },
  actionButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  cartButton: {
    position: 'absolute',
    bottom: 40,
    left: 10,
    right: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 15,
  },
  cartText: { color: 'white', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
});

export default styles;