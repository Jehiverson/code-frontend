import React, { useState, useEffect } from 'react';
import "./styles.css"

const QuizComponent = ({
    questions = [],
    userAnswers,
    currentQuestion,
    minimNote,
    correctCount,
    incorrectCount,
    unansweredCount,
    quizCompleted,
    selectedAnswer,
    handleAnswerClick,
    handleNextQuestion,
    handleInitQuiz,
    handleFinishQuiz,
    handleResetQuestion
}) => {

    if (quizCompleted) {
        return (
            <div className='text-center'>
                {
                    correctCount >= minimNote ? (
                        <>
                            <h2>Ganaste la prueba ¡Felicidades!</h2>
                            <h3 className='m-1'><b>Pasaste con {(correctCount * 100) / questions.length} puntos</b></h3>
                            <p><b>Pasaste a Siguiente módulo</b></p>
                        </>
                    ) : (
                        <>
                            <h2 className='mt-3'>¡No has superado el curso!</h2>
                            <h3 className='my-3'><b>El puntaje mínimo es del 80%, contacta a tu supervisor para más indicaciones.</b></h3>
                            <button
                                className='btn btn-sm text-white mb-3'
                                style={{ backgroundColor: '#810000' }}
                                onClick={handleResetQuestion}
                            >
                                Repetir Cuestionario
                            </button>
                        </>
                    )
                }
            </div>
        );
    }

    const currentQuestionObj = questions[currentQuestion];

    if (currentQuestion === -1) {
        return (
            <div className='container p-4'>
                {
                    questions.length > 0 ? (
                        <div className='jumbotron'>
                            <h5><b>{"Bienvenido a tu Módulo 1"}</b></h5>
                            <p>Marque el o los incisos con la respuesta correcta.</p>
                            <div className='d-flex justify-content-center m-3'>
                                <button
                                    className='btn btn-md text-white'
                                    style={{ backgroundColor: '#810000' }}
                                    onClick={() => handleInitQuiz()}
                                >
                                    Iniciar Cuestionario
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center py-5">
                            <h6 className="text-muted fst-italic">No se encontro ningún cuestionario</h6>
                        </div>
                    )
                }
            </div>
        )
    }


    if (!currentQuestionObj) {
        return (
            <div>
                <p>Error: Question not found</p>
            </div>
        );
    }

    return (
        <div className='container border-1 p-4'>
            <h6>{"PREGUNTA "} {currentQuestion + 1}</h6>
            <h5 className='mt-3 mb-4'>{currentQuestionObj.question}</h5>
            <ol type='A'>
                {currentQuestionObj.answers.map((answer, index) => (
                    <li
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        className={`lower-alpha m-1 mb-2`}
                    >
                        <div
                            className='border-0 rounded-3 shadow p-3'
                            style={{
                                backgroundColor:
                                    userAnswers[currentQuestion] !== null &&
                                    ((questions[currentQuestion].correctIndex.includes(selectedAnswer) && index === selectedAnswer)
                                        ? '#7cb425'
                                        : index === selectedAnswer
                                            ? '#E70202'
                                            : 'transparent'),
                                color:
                                    userAnswers[currentQuestion] !== null &&
                                        (questions[currentQuestion].correctIndex.includes(selectedAnswer) &&
                                            index === selectedAnswer)
                                        ? '#FFF'
                                        : index === selectedAnswer
                                            ? '#FFF'
                                            : '#000'
                            }}
                        >
                            {answer}
                        </div>
                    </li>
                ))}
            </ol>
            <div className='d-flex justify-content-end m-3'>
                {currentQuestion === questions.length - 1 ? (
                    <button
                        className='btn btn-sm text-white'
                        style={{ backgroundColor: '#810000' }}
                        onClick={handleFinishQuiz}
                    >
                        Finalizar Cuestionario
                    </button>
                ) : (
                    <button
                        className='btn btn-sm text-white'
                        style={{ backgroundColor: '#810000' }}
                        onClick={handleNextQuestion}
                    >
                        Siguiente Pregunta
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizComponent;
