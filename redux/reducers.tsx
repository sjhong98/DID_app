const initialState = {
    infosSetting: [],
    jwt: "",
}

const dataReducer = (state = initialState, action:any) => {
    switch(action.type) {

        case 'SET_INFOS_SETTING' :
            return {
                ...state,
                infosSetting: action.payload,
            }

        case 'SET_JWT' :
            return {
                ...state,
                jwt: action.payload,
            }

        default :
            return state;
    }
}

export default dataReducer;