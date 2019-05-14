import * as actionTypes from './action';

const initialState = {
    cartItems: [],
    wishlistItems: []
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_TO_CART:
        return {
            ...state,
            cartItems: [...state.cartItems, action.cartItem]
        };
        case actionTypes.ADD_TO_WISHLIST:
        return{
            ...state,
            wishlistItems: [...state.wishlistItems, action.wishlistItem]
        };
        default:
        return state;
    }
} ;

export default reducer;