import * as Types from '../constants/ActionTypes';
import callApi from '../utils/apiCaller';

export const actFetchProductsRequest = () => {
    return (dispatch) => {
        return callApi('products', 'GET', null).then(res => {
            dispatch(actFetchProducts(res.data));
        });
    }
}

export const actFetchProducts = (products) => {
    return {
        type: Types.FETCH_PRODUCT,
        products
    }
};

export const actDeleteProductRequest = (id) => {
    return (dispatch) => {
        return callApi(`products/${id}`, 'DELETE', null).then(res => {
            dispatch(actDeleteProducts(id));
        })
    }
}

export const actDeleteProducts = (id) => {
    return {
        type: Types.DELETE_PRODUCT,
        id
    }
}

export const actAddProductRequest = (product) => {
    return (dispatch) => {
        return callApi('products', 'POST', product).then(res => {
            dispatch(actAddProduct(res.data));
        })
    }
}

export const actAddProduct = (product) => {
    return {
        type: Types.ADD_PROCUCT,
        product
    }
}

export const actGetProductRequest = (id) => {
    return (dispatch) => {
        return callApi(`products/${id}`, 'GET', null).then(res => {
            dispatch(actGetProduct(res.data));
        })
    }
}

export const actGetProduct = (product) => {
    return {
        type: Types.EDIT_PRODUCT,
        product
    }
}

export const actUpdateProductRequest = (product) => {
    return (dispatch) => {
        return callApi(`products/${product.id}`, 'PUT', product).then(res => {
            dispatch(actUpdateProduct(res.data));
        })
    }
}

export const actUpdateProduct = (product) => {
    return {
        type: Types.UPDATE_PRODUCT,
        product
    }
}