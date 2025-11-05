// src/redux/reducers/cartReducer.ts
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
} from '../actions/actionTypes';
import {CartState, CartActionTypes, CartItem} from './types';

const initialState: CartState = {
  cart: [],
};

const clampQty = (q: number) => (q < 1 ? 1 : q);

const cartReducer = (
  state = initialState,
  action: CartActionTypes,
): CartState => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.cart.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? {...item, quantity: clampQty(item.quantity + 1)}
              : item,
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, {...action.payload, quantity: 1}],
      };
    }

    case REMOVE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    }

    case UPDATE_QUANTITY: {
      const {productId, quantity} = action.payload;
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === productId
            ? {...item, quantity: clampQty(quantity)}
            : item,
        ),
      };
    }

    case 'CLEAR_CART': {
      return {...state, cart: []};
    }

    default:
      return state;
  }
};

export default cartReducer;
