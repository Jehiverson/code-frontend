import { useEffect, useRef, useState } from "react";
import Presentation from "./Presentation";

import Accordion from "../../components/Accordion";
import QuizComponent from "../../components/QuizComponent";
import MenuComponent from "../../components/MenuComponent";
import HeaderComponent from "../../components/HeaderComponent";
import CountdownComponent from "../../components/CountdownComponent";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useParams } from "react-router-dom";
import axios from "axios";
const MySwal = withReactContent(Swal)

// const questions = [
//     {
//         question: '¿Cuál de estas opciones pertenece a las 4 formas de vender más?',
//         answers: [
//             'Vender productos que el cliente no necesita',
//             'Vender más de lo mismo',
//             'Buscar clientes mayoristas'],
//         correctIndex: [1], // La respuesta correcta está en la posición 1 (Madrid)
//     },
//     {
//         question: '¿Up-Selling significa, vender productos de menor valor?',
//         answers: ['Verdadero', 'Falso'],
//         correctIndex: [1], // La respuesta correcta está en la posición 0 (Amazonas)
//     },
//     {
//         question: '¿Cross-Selling - venta cruzada, significa vender todas las presentaciones de la misma marca?',
//         answers: ['Verdadero', 'Falso'],
//         correctIndex: [1], // La respuesta correcta está en la posición 1 (8)
//     },
//     {
//         question: '¿Drop size, significa ?',
//         answers: ['Presentaciones', 'Categorías', 'Ticket promedio'],
//         correctIndex: [2], // La respuesta correcta está en la posición 0 (Gabriel García Márquez)
//     },
//     {
//         question: '¿El nombre del cliente significa?',
//         answers: [
//             'Cultura',
//             'Identidad personal',
//             'Ideología'
//         ],
//         correctIndex: [1], // La respuesta correcta está en la posición 0 (1945)
//     }
// ];

const CoursePage = () => {
    const { id } = useParams();
    const [dataQuiz, setDataQuiz] = useState(null)
    const [dataPresentation, setDataPresentation] = useState([])
    const [questions, setDataQuestion] = useState([])
    const [totalProgress, setTotalProgress] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
    const [currentQuestion, setCurrentQuestion] = useState(-1);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [unansweredCount, setUnansweredCount] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timerStart, setTimerStart] = useState(false);
    const [timerRestart, setTimerRestart] = useState(false);
    const [time, setTotalTime] = useState(0)
    const [minimNote, setMinimNote] = useState(0);
    const counterRef = useRef(null)

    const completeTimer = () => {
        MySwal.fire({
            title: 'El tiempo se ha agotado',
            icon: 'info',
            customClass: {
                confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
        })
        handleFinishQuiz()
    }

    const handleAnswerClick = (answerIndex) => {
        if (userAnswers[currentQuestion] === null) {
            const isCorrect = questions[currentQuestion].correctIndex.includes(answerIndex);
            setSelectedAnswer(answerIndex);

            setUserAnswers((prevUserAnswers) => {
                const newUserAnswers = [...prevUserAnswers];
                newUserAnswers[currentQuestion] = isCorrect ? 'correct' : 'incorrect';
                return newUserAnswers;
            });

            if (isCorrect) {
                setCorrectCount((prevCorrectCount) => prevCorrectCount + 1);
            } else {
                setIncorrectCount((prevIncorrectCount) => prevIncorrectCount + 1);
            }
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    };

    const handleInitQuiz = () => {
        if (counterRef.current && currentQuestion === -1) {
            counterRef.current.start()
        }
        setTimerStart(true)
        setCurrentQuestion((prevCorrectCount) => prevCorrectCount + 1);
    }

    const handleFinishQuiz = () => {
        // Contar las preguntas no respondidas
        const unanswered = userAnswers.filter((answer) => answer === null).length;
        setUnansweredCount(unanswered);

        // Finalizar el quiz
        setQuizCompleted(true);
        setTimerStart(false)
    };

    const handleResetQuestion = () => {
        setTotalTime(900);
        setTimerRestart(true);
        setCurrentQuestion(-1);
        setQuizCompleted(false);
        setCorrectCount(0);
        setIncorrectCount(0);
        setUnansweredCount(0);
        setSelectedAnswer(null);
        setUserAnswers(Array(questions.length).fill(null));
    }

    const getInfoModule = async () => {
        try {
            const quizReq = await axios.get(`http://localhost:4500/quiz/v1/quiz/${id}`)
            console.log("Q", quizReq);
            if (quizReq?.data) {
                let duration = quizReq.data.durationTime * 60 || 0
                setDataQuiz(quizReq.data)
                setTotalTime(duration)

                const presentationReq = await axios.get(`http://localhost:4500/quiz/v1/presentation/quiz/${id}`)
                if (presentationReq?.data) {
                    setDataPresentation(presentationReq.data?.PresentationItems || [])

                    const questionReq = await axios.get(`http://localhost:4500/quiz/v1/question/quiz/${id}`)
                    if (questionReq?.data) {
                        let array = []
                        questionReq.data.forEach((item) => {
                            let arrayAnswer = []
                            let arrayCorrectAnswer = []
                            item.Answers.forEach((answer, index) => {
                                arrayAnswer.push(answer.description)
                                if (answer.isCorrect) arrayCorrectAnswer.push(index)
                            })

                            array.push({
                                question: item.description,
                                answers: arrayAnswer,
                                correctIndex: arrayCorrectAnswer
                            })
                        })

                        setDataQuestion(array)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getInfoModule()
    }, [])

    useEffect(() => {
        if (currentQuestion === questions.length) {
            handleFinishQuiz();
        }
    }, [currentQuestion, questions.length, questions]);

    useEffect(() => {
        const percentagePerQuestion = 100 / questions.length;
        const porcentMinimal = questions.length * 0.8;
        setMinimNote(porcentMinimal)
        setTotalProgress((currentQuestion + 1) * percentagePerQuestion);
    }, [currentQuestion, questions.length]);

    return (
        <div>
            <div className="row">
                <HeaderComponent />
            </div>
            <div className="row">
                <MenuComponent />
            </div>
            <div className="row p-lg-5 align-content-center" style={{ backgroundColor: "#AAAAAA" }}>
                <div className="col-lg-4 col-md-12 d-flex justify-content-center mt-2 pe-0">
                    <h2>{dataQuiz?.title || ""}</h2>
                </div>
                <div className="col-lg-4 col-md-12 pe-0">
                    <div className="container">
                        <label style={{ fontSize: 18 }}>Nivel de Avance - {totalProgress || 0} %</label>
                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar bg-dark" style={{ width: `${totalProgress}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 text-center pe-0">
                    <div className="d-flex justify-content-center mt-3 pe-0">
                        <h4 className="me-2">Tiempo restante</h4>
                        <CountdownComponent
                            onTimeout={timerStart}
                            completeTime={completeTimer}
                            totalTime={time}
                            restart={timerRestart}
                        />
                    </div>
                </div>
            </div>
            <div className="container my-4">
                <div className="row">
                    <Accordion title={"Presentación"} content={<Presentation files={dataPresentation} />} />
                </div>
                <div className="row">
                    <Accordion
                        title={"Cuestionario"}
                        content={
                            <div className="container border p-2">
                                <QuizComponent
                                    counterRef={counterRef}
                                    questions={questions}
                                    setTotalProgress={setTotalProgress}
                                    currentQuestion={currentQuestion}
                                    setCurrentQuestion={setCurrentQuestion}
                                    userAnswers={userAnswers}
                                    minimNote={minimNote}
                                    setUserAnswers={setUserAnswers}
                                    correctCount={correctCount}
                                    incorrectCount={incorrectCount}
                                    unansweredCount={unansweredCount}
                                    quizCompleted={quizCompleted}
                                    selectedAnswer={selectedAnswer}
                                    setCorrectCount={setCorrectCount}
                                    setIncorrectCount={setIncorrectCount}
                                    setUnansweredCount={setUnansweredCount}
                                    setQuizCompleted={setQuizCompleted}
                                    setSelectedAnswer={setSelectedAnswer}
                                    handleAnswerClick={handleAnswerClick}
                                    handleNextQuestion={handleNextQuestion}
                                    handleInitQuiz={handleInitQuiz}
                                    handleFinishQuiz={handleFinishQuiz}
                                    handleResetQuestion={handleResetQuestion}
                                />
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default CoursePage;
