import {useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux';
import {removeFromCart, updateQuantity} from '../redux/actions/actions';
import type {ID, CartItem, CartState} from './../redux/reducers/types';
import {AppDispatch} from '../redux/store';

type RootState = {
  cart: CartState;
};

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const useCart = () => {
  const cart = useTypedSelector(state => state.cart.cart);
  const dispatch = useDispatch<AppDispatch>();

  const increaseQuantity = (productId: ID) => {
    const item = cart.find((it: CartItem) => it.id === productId);
    if (item) {
      dispatch(updateQuantity(productId, item.quantity + 1));
    }
  };

  const decreaseQuantity = (productId: ID) => {
    const item = cart.find((it: CartItem) => it.id === productId);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity(productId, item.quantity - 1));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  const removeItem = (productId: ID) => {
    dispatch(removeFromCart(productId));
  };

  const calculateTotal = (): number =>
    cart.reduce((sum: number, it: CartItem) => sum + it.price * it.quantity, 0);

  return {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    calculateTotal,
  };
};

export default useCart;
