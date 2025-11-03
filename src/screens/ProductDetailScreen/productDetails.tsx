import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import useProductDetails from '../../hooks/useProductDetails';
import styles from './styles'

const ProductDetails = ({ route }) => {
  const { product } = route.params;

  const {
    cart,
    isInCart,
    handleAddToCart,
    handleRemoveFromCart,
    handleViewCart,
  } = useProductDetails(product);

  // Calculate discount
  const originalPrice = product.price + 500; 
  const discountPercentage = Math.round((500 / originalPrice) * 100);

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.category}>Category: {product.category}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
        <Text style={styles.originalPrice}>₹{originalPrice.toFixed(2)}</Text>
        <Text style={styles.discount}>{discountPercentage}% OFF</Text>
      </View>

      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.buttonContainer}>
        {isInCart ? (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: 'red' }]}
            onPress={handleRemoveFromCart}
          >
            <Text style={styles.actionText}>Remove from Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#007bff' }]}
            onPress={handleAddToCart}
          >
            <Text style={styles.actionText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.cartButton} onPress={handleViewCart}>
        <Text style={styles.cartText}>View Cart ({cart.length})</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetails;
