import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    prise: 1000000,
    vznos: 10,
    len: 10,
    disable: false,
}



const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setprise(state, action) {
            state.prise = action.payload
        },
        setvznos(state, action) {
            state.vznos = action.payload
        },
        setlen(state, action) {
            state.len = action.payload
        },
        formDisable(state) {
            state.disable = true
        },
        formEnable(state) {
            state.disable = false
        }
    }
})


export const { setprise, setvznos, setlen, formDisable, formEnable } = formSlice.actions
export default formSlice.reducer