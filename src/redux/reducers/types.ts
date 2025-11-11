// src/redux/types/cartTypes.ts
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
} from '../actions/actionTypes';

export type ID = string | number;

// Each cart item
export interface CartItem {
  id: ID;
  title: string;
  price: number;
  quantity: number;
  category?: string;
  thumbnail?: string;
}

// The overall cart state shape
export interface CartState {
  cart: CartItem[];
}

// --- Action interfaces ---
export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Omit<CartItem, 'quantity'>;
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: ID; // product id
}

export interface UpdateQuantityAction {
  type: typeof UPDATE_QUANTITY;
  payload: {
    productId: ID;
    quantity: number;
  };
}

export interface ClearCartAction {
  type: 'CLEAR_CART';
}

// Union of all possible cart actions
export type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateQuantityAction
  | ClearCartAction;
