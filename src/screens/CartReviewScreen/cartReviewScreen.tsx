import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import useCartReview from '../../hooks/useCartReview';
import styles from './styles'

const CartReviewScreen = ({ navigation }) => {
  const {
    cart,
    subtotal,
    tax,
    total,
    paymentMethod,
    handlePlaceOrder,
    togglePaymentMethod,
  } = useCartReview(navigation);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Cart Summary</Text>

        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          style={{
            flexGrow: 0,
            maxHeight: '65%',
          }}
          renderItem={({ item }) => {
            const price = item.price || 0;
            const quantity = item.quantity || 1;
            return (
              <View style={styles.item}>
                <Image
                  style={styles.thumbnail}
                  source={{ uri: item.thumbnail }}
                />
                <View style={styles.detailsContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemCategory}>
                    Category: {item.category}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.itemPrice}>₹{price.toFixed(2)}</Text>
                    <Text style={styles.originalPrice}>
                      ₹{(price + 500).toFixed(2)}
                    </Text>
                    <Text style={styles.discount}>50% OFF</Text>
                  </View>
                  <Text style={styles.itemDetails}>
                    {quantity} x ₹{price.toFixed(2)}
                  </Text>
                </View>
                <Text style={styles.itemTotal}>
                  ₹{(price * quantity).toFixed(2)}
                </Text>
              </View>
            );
          }}
        />

        <View style={styles.paymentContainer}>
          <Text style={styles.paymentLabel}>Payment Method:</Text>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={togglePaymentMethod}
          >
            <Text style={styles.paymentButtonText}>{paymentMethod}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orderSummary}>
          <Text style={styles.summaryText}>Subtotal: ₹{subtotal.toFixed(2)}</Text>
          <Text style={styles.summaryText}>Tax: ₹{tax.toFixed(2)}</Text>
          <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartReviewScreen;
