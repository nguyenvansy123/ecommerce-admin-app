import { productConstans } from "./constants";
import axios from "../helpers/axios"

const getAllProduct = () => {
    return async dispatch => {
        dispatch({ type: productConstans.GET_ALL_PRODUCT_REQUEST })
        const res = await axios.get(`/product/getproduct`)
        console.log(res.data);
        if (res.status === 200) {
            dispatch({
                type: productConstans.GET_ALL_PRODUCT_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: productConstans.GET_ALL_PRODUCT_FAILURE
            })
        }
    }
}

export const addProduct = (form) => {
    return async dispatch => {
        dispatch({ type: productConstans.ADD_PRODUCT_REQUEST })
        const res = await axios.post(`/product/create`, form)
        console.log(res.data);
        if (res.status === 201) {
            dispatch({
                type: productConstans.ADD_PRODUCT_SUCCESS
            })

            dispatch(getAllProduct())
        } else {
            dispatch({
                type: productConstans.ADD_PRODUCT_FAILURE,
                payload: { error: res.error }
            })
        }
    }
}

export const deleteProductById = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`product/deleteProductId`, {
                data: { payload },
            });
            dispatch({ type: productConstans.DELETE_PRODUCT_BY_ID_REQUEST });
            if (res.status === 202) {
                dispatch({ type: productConstans.DELETE_PRODUCT_BY_ID_SUCCESS });
                dispatch(getAllProduct());
            } else {
                const { error } = res.data;
                dispatch({
                    type: productConstans.DELETE_PRODUCT_BY_ID_FAILURE,
                    payload: {
                        error
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export { getAllProduct }