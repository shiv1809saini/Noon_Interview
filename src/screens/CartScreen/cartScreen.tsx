import React, {useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ListRenderItem,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useCart from '../../hooks/useCart';
import styles from './styles';

export type CartLine = {
  id: number | string;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  CartReview: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

type UseCartReturn = {
  cart: CartLine[];
  increaseQuantity: (id: CartLine['id']) => void;
  decreaseQuantity: (id: CartLine['id']) => void;
  removeItem: (id: CartLine['id']) => void;
  calculateTotal: () => number;
};

const rupee = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

const CartScreen: React.FC<Props> = ({navigation}) => {
  const {cart, increaseQuantity, decreaseQuantity, removeItem, calculateTotal} =
    useCart() as UseCartReturn;

  const {subtotal, discount, delivery, total} = useMemo(() => {
    const sub = calculateTotal();
    const mrpExtra = 500;
    const disc = cart.reduce<number>(
      (acc, it) => acc + mrpExtra * (it.quantity ?? 1),
      0,
    );
    const del = sub > 499 ? 0 : 49;
    return {subtotal: sub, discount: disc, delivery: del, total: sub + del};
  }, [cart, calculateTotal]);

  const renderItem: ListRenderItem<CartLine> = ({item}) => {
    const mrp = item.price + 500;
    const offPct = Math.round(((mrp - item.price) / mrp) * 100);

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={{uri: item.thumbnail}} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.category}>Category: {item.category}</Text>

            <View style={styles.priceRow}>
              <Text style={styles.price}>{rupee.format(item.price)}</Text>
              <Text style={styles.mrp}>{rupee.format(mrp)}</Text>
              <View style={styles.offPill}>
                <Text style={styles.offTxt}>{offPct}% OFF</Text>
              </View>
            </View>

            <View style={styles.controlsRow}>
              <View style={styles.stepper}>
                <TouchableOpacity
                  onPress={() => decreaseQuantity(item.id)}
                  style={styles.stepBtn}
                  hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
                  <Text style={styles.stepTxt}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyTxt}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => increaseQuantity(item.id)}
                  style={styles.stepBtn}
                  hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
                  <Text style={styles.stepTxt}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Text style={styles.removeTxt}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const keyExtractor = (it: CartLine) => String(it.id);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {cart.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add items to get started.</Text>
          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.shopBtnTxt}>Shop now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList<CartLine>
            data={cart}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Text style={styles.header}>Your Cart</Text>}
          />
          <View style={styles.summaryWrap}>
            <View style={styles.breakdown}>
              <View style={styles.line}>
                <Text style={styles.lineLabel}>Subtotal</Text>
                <Text style={styles.lineValue}>{rupee.format(subtotal)}</Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.lineLabel}>Discount</Text>
                <Text style={[styles.lineValue, styles.save]}>
                  {`− ${rupee.format(discount)}`}
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.lineLabel}>Delivery</Text>
                <Text style={styles.lineValue}>
                  {delivery === 0 ? 'Free' : rupee.format(delivery)}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.line}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{rupee.format(total)}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('CartReview')}>
              <Text style={styles.checkoutTxt}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
