// Load default / previous data
let loadWines = localStorage.getItem('wines');
let initialState = loadWines ? JSON.parse(loadWines) : [];

const wines = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_WINE":
            var newState = [...state];
            newState.push(action.payload);
            localStorage.setItem('wines', JSON.stringify(newState));
            return newState;
        case "EDIT_WINE":
            var newState = [...state];
            const editIndex = newState.findIndex(wine => wine.timestamp == action.payload.timestamp);
            if (editIndex > -1) {
                newState[editIndex] = action.payload;
                localStorage.setItem('wines', JSON.stringify(newState));
                return newState;
            }
            return state;
        case "REMOVE_WINE":
            var newState = [...state];
            const removeIndex = newState.findIndex(wine => wine.timestamp == action.payload);
            if (removeIndex > -1) {
                newState.splice(removeIndex, 1);
                localStorage.setItem('wines', JSON.stringify(newState));
                return newState;
            }
            return state;
        default:
            return state;
    }
}

export default wines;
