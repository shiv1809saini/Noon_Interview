import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles'


const ConfirmationScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/orderplaced.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.successText}>Order Placed Successfully!</Text>
        <Text style={styles.subText}>
          Thank you for shopping with us. Your order will be delivered soon.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.homeButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmationScreen;
