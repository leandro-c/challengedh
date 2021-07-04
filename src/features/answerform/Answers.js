import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    increment,
    postAnswers
} from './answerSlice';
/* import styles from './Counter.module.css'; */

export function Answers() {
    const dispatch = useDispatch();
    const answers = useSelector(state => state.answers.data);
    const status = useSelector(state => state.answers.status);
    const error = useSelector(state => state.answers.error);

    return(
        <>
            <pre>{JSON.stringify(error,4,null)}</pre>
            <pre>{JSON.stringify(status,4,null)}</pre>
            <pre>{JSON.stringify(answers,4,null)}</pre>
            <button onClick={() => dispatch(postAnswers({id:44}))}>Add to note</button>
            
        </>
    )
}
