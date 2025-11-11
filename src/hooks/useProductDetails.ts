import {useMemo} from 'react';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {addToCart, removeFromCart} from '../redux/actions/actions';
import type {CartState, CartItem, ID} from '../redux/reducers/types';
import type {RootStackParamList} from './../router/types';
import type {AppDispatch} from '../redux/store';

export type Product = {
  id: ID;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  images?: string[];
  rating?: number;
  stock?: number;
  discountPercentage?: number;
  description?: string;
};

type RootState = {cart: CartState};

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
type Nav = StackNavigationProp<RootStackParamList>;

export default function useProductDetails(product: Product) {
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch<AppDispatch>();

  const cart = useTypedSelector(state => state.cart.cart);

  const isInCart = useMemo(
    () => cart.some((item: CartItem) => item.id === product.id),
    [cart, product.id],
  );

  const handleAddToCart = () => {
    const item: CartItem = {...product, quantity: 1};
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleViewCart = () => {
    navigation.navigate('Cart');
  };

  return {
    cart,
    isInCart,
    handleAddToCart,
    handleRemoveFromCart,
    handleViewCart,
  };
}
