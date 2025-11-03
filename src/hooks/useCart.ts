import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/actions/actions';

const useCart = () => {
  const cart = useSelector((state) => state.cart.cart); 
  const dispatch = useDispatch(); 

  const increaseQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      dispatch(updateQuantity(productId, item.quantity + 1));
    }
  };

  const decreaseQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity(productId, item.quantity - 1));
    } else {
      dispatch(removeFromCart(productId)); 
    }
  };

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    calculateTotal,
  };
};

export default useCart;
