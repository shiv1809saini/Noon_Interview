import {useCallback, useState} from 'react';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {clearCart} from '../redux/actions/actions';
import type {RootStackParamList} from './../router/types';
import type {CartState, CartItem} from '../redux/reducers/types';

type RootState = {cart: CartState};

export type PaymentMethod = 'COD' | 'Card';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

type NavProp = StackNavigationProp<RootStackParamList, 'CartReview'>;

const useCartReview = (navigation: NavProp) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');

  const cart = useTypedSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  const subtotal: number = cart.reduce((sum: number, item: CartItem) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 1;
    return sum + price * quantity;
  }, 0);

  const tax: number = subtotal * 0.1;
  const total: number = subtotal + tax;

  const handlePlaceOrder = (): void => {
    dispatch(clearCart());
    navigation.navigate('ConfirmationScreen');
  };

  const selectPaymentMethod = useCallback((m: PaymentMethod) => {
    setPaymentMethod(prev => (prev === m ? prev : m));
  }, []);

  return {
    cart,
    subtotal,
    tax,
    total,
    paymentMethod,
    handlePlaceOrder,
    selectPaymentMethod,
  };
};

export default useCartReview;
