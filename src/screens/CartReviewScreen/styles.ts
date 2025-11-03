import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { padding: 20 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 10,
    },
    thumbnail: {
        height: 80,
        width: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    detailsContainer: { flex: 1 },
    itemTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 4, width: '90%' },
    itemCategory: { fontSize: 12, color: 'gray', marginBottom: 4 },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    itemPrice: { fontSize: 14, fontWeight: 'bold', color: 'green' },
    originalPrice: {
        fontSize: 12,
        textDecorationLine: 'line-through',
        color: 'gray',
        marginLeft: 10,
    },
    discount: { fontSize: 12, color: 'red', marginLeft: 10 },
    itemDetails: { fontSize: 12, color: 'gray' },
    itemTotal: { fontSize: 16, fontWeight: 'bold' },
    paymentContainer: { marginBottom: 20, paddingTop: 10 },
    paymentLabel: { fontSize: 16, marginBottom: 5 },
    paymentButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    paymentButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    orderSummary: { marginBottom: 80 },
    summaryText: { fontSize: 16, marginBottom: 5 },
    totalText: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
    placeOrderButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
    },
    placeOrderText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});


export default styles;