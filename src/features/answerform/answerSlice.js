import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAPI } from './fetchAPI';

const initialState = {
    data: [],
    attempt: 0,
    status: 'idle',
    error: null,
};

export const postAnswers = createAsyncThunk(
    'answers/fetchAPI',
    async (payload) => {
        const response = await fetchAPI(payload);
        return response.data;
    }
);

export const answerSlice = createSlice({
    name: 'answer',
    initialState,
    // El campo `reducers` nos permite definir reducers y generar acciones asociadas
    reducers: {
        increment: (state) => {
            state.attempt += 1;
        }
    },
    // El campo `extraReducers` permite que el segmento maneje acciones definidas en otro lugar,
    // incluidas las acciones generadas por createAsyncThunk o en otros sectores.
    extraReducers: {
        [postAnswers.pending]: (state, action) => {
            state.status = 'loading'
        },
        [postAnswers.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.posts = state.posts.concat(action.payload)
        },
        [postAnswers.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
        [postAnswers.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.data.push(action.meta.arg)
        },
    },
});

export const { increment, post } = answerSlice.actions;

export default answerSlice.reducer;