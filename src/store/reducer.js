import * as actionTypes from './action';

const initialState = {
    productInfo: '',
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_PRODUCT_INFO:
        return {
            ...state,
            productInfo: action.productInfo
        };
        default:
        return state;
    }
} ;


export default reducer;