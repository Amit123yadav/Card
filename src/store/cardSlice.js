import {createSlice } from '@reduxjs/toolkit'

const cardSlice  = createSlice({
    name : 'card',
    initialState :{
        data : [],
    },
    reducers : {
        setCards(state ,action){
            state.data = action.payload
        }
    }
})

export const { setCards} = cardSlice.actions
export default cardSlice.reducer

export function fetchCards(){
    return async function fetchCardsThunks(dispatch ,getState){
        try {
            const res =  await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await res.json()
            dispatch(setCards(data))
        } catch (error) {
            console.log(error)
        }
    }
}
