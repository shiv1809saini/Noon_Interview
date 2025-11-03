import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import useCart from '../../hooks/useCart'; // Custom hook for cart logic
import styles from './styles'

const CartScreen = ({ navigation }) => {
  const { cart, increaseQuantity, decreaseQuantity, removeItem, calculateTotal } = useCart(); // Custom hook methods
  const total = calculateTotal(); // Calculate total amount

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty!</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.thumbnail }} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.category}>Category: {item.category}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
                    <Text style={styles.originalPrice}>
                      ₹{(item.price + 500).toFixed(2)}
                    </Text>
                    <Text style={styles.discount}>50% OFF</Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => decreaseQuantity(item.id)}
                    >
                      <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => increaseQuantity(item.id)}
                    >
                      <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.summary}>
            <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('CartReview')}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;
