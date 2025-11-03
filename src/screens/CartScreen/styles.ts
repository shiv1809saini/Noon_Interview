import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#fff' },
    emptyText: { textAlign: 'center', fontSize: 18, marginTop: 20 },
    cartItem: { flexDirection: 'row', marginBottom: 15, alignItems: 'center' },
    image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
    details: { flex: 1 },
    title: { fontSize: 16, fontWeight: 'bold' },
    category: { fontSize: 14, color: 'gray', marginTop: 5, marginBottom: 5 },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    price: { fontSize: 16, fontWeight: 'bold', color: 'green' },
    originalPrice: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        color: 'gray',
        marginLeft: 10,
    },
    discount: { fontSize: 14, color: 'red', marginLeft: 10 },
    quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    quantityButton: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    quantityText: { fontSize: 16 },
    quantity: { marginHorizontal: 10, fontSize: 16 },
    removeButton: { marginTop: 5 },
    removeText: { color: 'red', fontSize: 14 },
    summary: {
        borderTopWidth: 1,
        borderColor: '#ddd',
        paddingTop: 10,
        marginTop: 10,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 10,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#333',
    },
    checkoutButton: {
        backgroundColor: '#007bff',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    checkoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default styles;