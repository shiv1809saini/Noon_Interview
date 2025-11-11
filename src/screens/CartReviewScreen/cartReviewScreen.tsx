import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import styles from './styles';
import useCartReview from '../../hooks/useCartReview';

type CartLine = {
  id: number | string;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

const rupee = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

type Payment = 'COD' | 'Card';

const CartReviewScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {
    cart,
    subtotal,
    tax,
    total,
    paymentMethod,
    handlePlaceOrder,
    selectPaymentMethod,
  } = useCartReview(navigation) as {
    cart: CartLine[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: 'COD' | 'Card' | string;
    handlePlaceOrder: () => void;
    selectPaymentMethod: (m: Payment) => void;
  };

  const {delivery, savings} = useMemo(() => {
    const mrpExtra = 500;
    const save = cart.reduce(
      (acc, it) => acc + mrpExtra * (it.quantity ?? 1),
      0,
    );
    const del = subtotal > 499 ? 0 : 49;
    return {delivery: del, savings: save};
  }, [cart, subtotal]);

  const renderItem = ({item}: {item: CartLine}) => {
    const mrp = item.price + 500;
    const offPct = Math.round(((mrp - item.price) / mrp) * 100);

    return (
      <View style={styles.itemCard}>
        <Image source={{uri: item.thumbnail}} style={styles.itemThumb} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.itemCat}>Category: {item.category}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{rupee.format(item.price)}</Text>
            <Text style={styles.mrp}>{rupee.format(mrp)}</Text>
            <View style={styles.offPill}>
              <Text style={styles.offTxt}>{offPct}% OFF</Text>
            </View>
          </View>

          <Text style={styles.qtyLine}>
            {item.quantity} × {rupee.format(item.price)}
          </Text>
        </View>

        <Text style={styles.lineTotal}>
          {rupee.format(item.price * item.quantity)}
        </Text>
      </View>
    );
  };

  const ListFooter = (
    <>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.methodsRow}>
          {(['COD', 'Card'] as const).map(m => {
            const active = paymentMethod === m;
            return (
              <TouchableOpacity
                key={m}
                style={[styles.methodChip, active && styles.methodChipActive]}
                onPress={() => selectPaymentMethod(m)}
                accessibilityRole="button"
                accessibilityState={{selected: active}}>
                <View style={[styles.radio, active && styles.radioActive]} />
                <Text
                  style={[styles.methodTxt, active && styles.methodTxtActive]}>
                  {m}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.methodHint}>
          Tap to cycle through methods if selection doesn’t change.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Have a promo code?</Text>
        <View style={styles.promoRow}>
          <TouchableOpacity activeOpacity={1} style={styles.promoInput}>
            <Text style={styles.promoPlaceholder}>{'Enter code'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyBtn} onPress={() => {}}>
            <Text style={styles.applyTxt}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>Order Summary</Text>

        <View style={styles.line}>
          <Text style={styles.lineLabel}>Subtotal</Text>
          <Text style={styles.lineValue}>{rupee.format(subtotal)}</Text>
        </View>

        <View style={styles.line}>
          <Text style={styles.lineLabel}>Savings</Text>
          <Text style={[styles.lineValue, styles.save]}>
            − {rupee.format(savings)}
          </Text>
        </View>

        <View style={styles.line}>
          <Text style={styles.lineLabel}>Tax</Text>
          <Text style={styles.lineValue}>{rupee.format(tax)}</Text>
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
          <Text style={styles.totalValue}>
            {rupee.format(total + delivery)}
          </Text>
        </View>
      </View>
    </>
  );

  const ListEmpty = (
    <View style={styles.emptyWrap}>
      <Text style={styles.emptyTitle}>No items in cart</Text>
      <Text style={styles.emptySub}>Add items to review your order.</Text>
      <TouchableOpacity
        style={styles.shopBtn}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.shopBtnTxt}>Shop now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Text style={styles.header}>Cart Summary</Text>

        <FlatList<CartLine>
          data={cart}
          keyExtractor={it => String(it.id)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmpty}
          ListFooterComponent={ListFooter}
          contentContainerStyle={{paddingBottom: 120}}
        />

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.placeOrderBtn}
            onPress={handlePlaceOrder}
            disabled={cart.length === 0}>
            <Text style={styles.placeOrderTxt}>
              Place Order · {rupee.format(total + delivery)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartReviewScreen;
