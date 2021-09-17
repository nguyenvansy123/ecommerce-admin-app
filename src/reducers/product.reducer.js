import { productConstans } from "../actions/constants"

const initState = {
    loading: false,
    product: [],
    error: null
}

export default (state = initState, action) => {
    switch (action.type) {
        case productConstans.GET_ALL_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case productConstans.GET_ALL_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
                product: action.payload.product
            }
            break;
        case productConstans.GET_ALL_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: false,
            }
            break;

        case productConstans.ADD_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case productConstans.ADD_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,

            }
            break;
        case productConstans.ADD_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;

        case productConstans.DELETE_PRODUCT_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case productConstans.DELETE_PRODUCT_BY_ID_SUCCESS:
            state = {
                ...state,
                loading: false,

            }
            break;
        case productConstans.DELETE_PRODUCT_BY_ID_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;

        default:
            break;
    }
    return state
}