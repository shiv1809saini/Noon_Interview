import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addToCart, removeFromCart } from '../redux/actions/actions';

const useProductDetails = (product) => {
  const cart = useSelector((state) => state.cart.cart); 
  const dispatch = useDispatch(); 
  const navigation = useNavigation(); 

  
  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product)); 
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
};

export default useProductDetails;
