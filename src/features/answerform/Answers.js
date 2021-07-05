import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    increment,
    postAnswers
} from './answerSlice';
/* import styles from './Counter.module.css'; */
import {useFormik} from 'formik'
import * as Yup from 'yup';
import './../../App.scss';


export function Answers() {
    const dispatch = useDispatch();
    const answers = useSelector(state => state.answers.data);
    const attempt = useSelector(state => state.answers.attempt);
    const status = useSelector(state => state.answers.status);
    const error = useSelector(state => state.answers.error);

    const formik = useFormik({
        initialValues:{
            question: ""
        },
        validationSchema: Yup.object({
            question: Yup.string().required()
        }),
        onSubmit: (formData)=>{
            console.log(formData);
            dispatch(increment());
            dispatch(postAnswers(formData));
        }
    })

    return(
        <>
            
            {attempt>=3&& status !== 'loading'&&(<span>Se han completado los 3 intentos para completar este formulario</span>)}
            <form onSubmit={formik.handleSubmit}>
                <input 
                    type="text" 
                    placeholder="question" 
                    name="question"
                    value={formik.values.question} 
                    className={
                        formik.errors.question && formik.touched.question
                            ? "error"
                            : "text-input"
                        }
                    onChange={formik.handleChange}/>
                    {formik.errors.question && formik.touched.question && (
                        <div className="error">{formik.errors.question}</div>
                    )}
                <button disabled={attempt>=3} type="submit">submit</button>
                <button type="button" onClick={formik.handleReset}>clean</button>
            </form>
        </>
    )
}
