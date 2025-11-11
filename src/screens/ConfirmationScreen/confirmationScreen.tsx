import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import styles from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../router/types';

type Props = StackScreenProps<RootStackParamList, 'ConfirmationScreen'>;

const ConfirmationScreen: React.FC<Props> = ({navigation, route}) => {
  const orderId = route?.params?.orderId ?? '#ORD-12839';
  const eta = route?.params?.eta ?? '2–4 days';

  const scale = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 100,
      }),
      Animated.timing(fade, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale, fade]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Animated.View
          style={[styles.badge, {transform: [{scale}], opacity: fade}]}>
          <Text style={styles.badgeCheck}>✓</Text>
        </Animated.View>
        <Image
          source={require('../../../assets/images/orderplaced.png')}
          style={styles.image}
          resizeMode="contain"
          accessible
          accessibilityLabel="Order placed illustration"
        />
        <View style={styles.textWrap}>
          <Text style={styles.title}>Order Placed Successfully!</Text>
          <Text style={styles.subtitle}>
            Thank you for shopping with us. Your order will be delivered soon.
          </Text>

          <View style={styles.metaCard}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Order ID</Text>
              <Text style={styles.metaValue}>{orderId}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Estimated Delivery</Text>
              <Text style={styles.metaValue}>{eta}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.btn, styles.primary]}
          onPress={() => navigation.navigate('TrackOrder' as any)}>
          <Text style={styles.primaryTxt}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.ghost]}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.ghostTxt}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmationScreen;
