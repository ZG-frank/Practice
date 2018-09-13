const initialState = {
    themeColor: '#777', 
    content: 'Redux Test Content'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, themeColor: action.data };
        case 'CHANGE_CONTENT':
            return { ...state, content: action.data };
        case 'RESET': 
            return initialState;
        default:
            return state;
    }
}

export default reducer;