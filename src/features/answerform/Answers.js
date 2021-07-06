import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    increment,
    postAnswers
} from './answerSlice';
/* import styles from './Counter.module.css'; */
import { useFormik } from 'formik'
import * as Yup from 'yup';
import './../../App.scss';

const questionsState = [
    {
        question: "¿Cuanto es 1 + 1?",
        type: "checkbox",
        choices: [
            { option: "A", answer: 2 },
            { option: "B", answer: 3 },
            { option: "C", answer: 4 },
            { option: "D", answer: 8 }
        ]
    },
    {
        question: "¿Cuanto es 3 * 3?",
        type: "radio",
        choices: [
            { option: "A", answer: 2 },
            { option: "B", answer: 3 },
            { option: "C", answer: 4 },
            { option: "D", answer: 9 }
        ]
    }
];

export function Answers() {
    const dispatch = useDispatch();
    /* const answers = useSelector(state => state.answers.data); */
    const attempt = useSelector(state => state.answers.attempt);
    const status = useSelector(state => state.answers.status);
    const error = useSelector(state => state.answers.error);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        setQuestions(questionsState)
    }, [questions]);

    const userSelection = (length) => {
        const initialValues = [];
        for (let i = 0; i < length; i++) {
            initialValues.push({ question: i, answer: "" });
        }

        return initialValues;
    }


    const formik = useFormik({
        initialValues: userSelection(questions.length),
        validationSchema: Yup.object({
            question: Yup.string().required()
        }),
        onSubmit: (formData) => {
            console.log(formData);
            dispatch(increment());
            dispatch(postAnswers(formData));
        }
    })

    return (
        <>
            {error && (<span>se producido un error, intente mas tarde </span>)}
            {attempt >= 3 && status !== 'loading' ? (<span>Se han completado los 3 intentos para completar este formulario</span>) :
                (
                    <form onSubmit={formik.handleSubmit}>
                        {questions.map((q, index) => (
                            <div  key={index}>
                                <div >Pregunta {index + 1}</div>
                                <div >
                                    <h6 >{q.question}</h6>
                                    <div >
                                        {q.choices.map((choice, i) => (
                                            <div  key={i}>
                                                {q.type ==='checkbox'&&(<input
                                                    type="checkbox"
                                                    id={choice.option}
                                                    name={`answers[${index}].answer`}
                                                    value={choice.option}
                                                    onChange={formik.handleChange}
                                                />)}
                                                {q.type ==='radio'&&(<input
                                                    type="radio"
                                                    id={choice.option}
                                                    name={`answers[${index}].answer`}
                                                    value={choice.option}
                                                    checked={
                                                        formik.values.answers && formik.values.answers[index]
                                                            ? formik.values.answers[index].answer === choice.option
                                                            : false
                                                    }
                                                    onChange={formik.handleChange}
                                                />)}
                                                <label
                                                    htmlFor={choice.option}
                                                >
                                                    <span>{choice.option} )</span>{" "}
                                                    {choice.answer}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={attempt >= 3}
                        >
                            Submit
                        </button>
                        <button type="button" onClick={formik.handleReset}>clean</button>
                    </form>
                )
            }
        </>
    )
}
