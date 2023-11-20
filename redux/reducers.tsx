const initialState = {
    infosSetting: [],
}

const dataReducer = (state = initialState, action:any) => {
    switch(action.type) {

        case 'SET_INFOS_SETTING' :
            return {
                ...state,
                infosSetting: action.payload,
            }

        default :
            return state;
    }
}

export default dataReducer;