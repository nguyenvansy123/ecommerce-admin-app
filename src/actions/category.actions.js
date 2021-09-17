import axios from "../helpers/axios";
import { categoryConstants } from "./constants";


const getAllCategory = () => {
    return async dispatch => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
        try {
            const res = await axios.get(`category/getcategories`)
            console.log(res);
            const { categories } = res.data
            if (res.status === 200) {
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                    payload: { categories }
                })
            } else {
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
        catch (error) {
            console.log(error.response);

        }



    }
}

export const addCategory = (name) => {

    return async dispatch => {

        dispatch({ type: categoryConstants.ADD_CATEGORY_REQUEST })

        const res = await axios.post(`/admin/category/create`, { name });
        console.log(res);

        if (res.status === 201) {
            dispatch({
                type: categoryConstants.ADD_CATEGORY_SUCCESS,
                payload: { category: res.data.category }
            });
            dispatch(getAllCategory())
        } else {
            dispatch({
                type: categoryConstants.ADD_CATEGORY_FAILURE,
                payload: res.data.error
            });
        }
    }
}


export const deleteCategories = (ids) => {
    return async dispatch => {
        // console.log(ids);

        dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST })

        const res = await axios.post(`/admin/category/deletecategory`, { ids });
        console.log(res);

        if (res.status === 201) {
            dispatch({
                type: categoryConstants.DELETE_CATEGORY_SUCCESS,
                payload: { category: res.data.message }
            });
            dispatch(getAllCategory())
        } else {
            dispatch({
                type: categoryConstants.DELETE_CATEGORY_FAILURE
            });
        }
    }
}

export const updateCategory = (ids) => {
    return async dispatch => {
        console.log(ids);
        dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST })

        const res = await axios.post(`/admin/category/updatecategory`, { ids });
        console.log(res);

        if (res.status === 201) {
            dispatch({
                type: categoryConstants.UPDATE_CATEGORY_SUCCESS
            });
            dispatch(getAllCategory())
        } else {
            dispatch({
                type: categoryConstants.UPDATE_CATEGORY_FAILURE
            });
        }
    }
}


export { getAllCategory }