import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
} from './actionTypes';
import type {CartItem} from '../reducers/types';
import type {Action} from 'redux';

export interface AddToCartAction extends Action<typeof ADD_TO_CART> {
  payload: CartItem;
}

export interface RemoveFromCartAction extends Action<typeof REMOVE_FROM_CART> {
  payload: number | string;
}

export interface UpdateQuantityAction extends Action<typeof UPDATE_QUANTITY> {
  payload: {
    productId: number | string;
    quantity: number;
  };
}

export interface ClearCartAction extends Action<typeof CLEAR_CART> {}

export type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateQuantityAction
  | ClearCartAction;

export const addToCart = (product: CartItem): AddToCartAction => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (
  productId: number | string,
): RemoveFromCartAction => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const updateQuantity = (
  productId: number | string,
  quantity: number,
): UpdateQuantityAction => ({
  type: UPDATE_QUANTITY,
  payload: {productId, quantity},
});

export const clearCart = (): ClearCartAction => ({
  type: CLEAR_CART,
});
