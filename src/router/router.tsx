import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/homescreen';
import ProductDetails from '../screens/ProductDetailScreen/productDetails';
import CartScreen from '../screens/CartScreen/cartScreen';
import CartReviewScreen from '../screens/CartReviewScreen/cartReviewScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen/confirmationScreen';
import TrackOrder from '../screens/TrackOrder/trackOrder';
import {RootStackParamList} from './types'; // ✅

const Stack = createStackNavigator<RootStackParamList>(); // ✅

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Products',
            headerLeft: _props => null,
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{title: 'Your Cart'}}
        />

        <Stack.Screen
          name="CartReview"
          component={CartReviewScreen}
          options={{title: 'Cart Review'}}
        />

        <Stack.Screen
          name="ConfirmationScreen"
          component={ConfirmationScreen}
          options={{
            title: 'Confirmation Screen',
            headerLeft: _props => null,
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="TrackOrder"
          component={TrackOrder}
          options={{
            title: 'Track Order',
            headerLeft: _props => null,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
