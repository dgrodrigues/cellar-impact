import { createSlice } from '@reduxjs/toolkit'

export const wineSlice = createSlice({
    name: 'wines',
    initialState: {
        value: []
    },
    reducers: {
        add: (state, action) => {

        },
        remove: (state, action) => {

        },
        update: (state, action) => {

        }
    }
})

export const { add, remove, update } = wineSlice.actions

export default wineSlice.reducer