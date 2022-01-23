const addWine = (wineObj) => ({
    type: "ADD_WINE",
    payload: wineObj
});

const editWine = (wineObj) => ({
    type: "EDIT_WINE",
    payload: wineObj
});

const removeWine = (timestamp) => ({
    type: "REMOVE_WINE",
    payload: timestamp
});

export {
    addWine,
    editWine,
    removeWine
}