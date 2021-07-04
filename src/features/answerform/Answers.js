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
    const attempt = useSelector(state => state.answers.attempt);
    const status = useSelector(state => state.answers.status);
    const error = useSelector(state => state.answers.error);

    const onClick =() => {
        dispatch(increment());
        dispatch(postAnswers({id:44}));
    }

    return(
        <>
            {status!=='loading'&&attempt>=3&&(<span>se han execedido los intentos de para contestar el formulario.</span>)}
            <pre>{JSON.stringify(error,4,null)}</pre>
            <pre>{JSON.stringify(status,4,null)}</pre>
            <pre>{JSON.stringify(answers,4,null)}</pre>
            <pre>{JSON.stringify(attempt,4,null)}</pre>
            <button disabled={attempt>=3} onClick={() => onClick() }>Add to note</button>
            
        </>
    )
}
