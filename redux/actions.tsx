export const setInfosSetting = (item:any) => {
    return {
        type: 'SET_INFOS_SETTING',
        payload: item,
    };
};

export const setJwt = (item:String) => {
    return {
        type: 'SET_JWT',
        payload: item,
    }
}