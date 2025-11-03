import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/actions/actions';

const useCartReview = (navigation) => {
  const [paymentMethod, setPaymentMethod] = useState('Credit Card'); 
  const cart = useSelector((state) => state.cart.cart); 
const dispatch = useDispatch();
 
  const subtotal = cart.reduce((sum, item) => {
    const price = item.price || 0; 
    const quantity = item.quantity || 1; 
    return sum + price * quantity;
  }, 0);

  const tax = subtotal * 0.1; 
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    dispatch(clearCart()); 
    navigation.navigate('ConfirmationScreen'); 
  };

  const togglePaymentMethod = () => {
    setPaymentMethod((prev) =>
      prev === 'Credit Card' ? 'PayPal' : 'Credit Card'
    );
  };

  return {
    cart,
    subtotal,
    tax,
    total,
    paymentMethod,
    handlePlaceOrder,
    togglePaymentMethod,
  };
};

export default useCartReview;
