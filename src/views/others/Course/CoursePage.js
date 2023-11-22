import { useEffect, useRef, useState } from "react";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useParams } from "react-router-dom";
import axios from "axios";

import Presentation from "./Presentation";
import Accordion from "../../components/Accordion";
import QuizComponent from "../../components/QuizComponent";
import MenuComponent from "../../components/MenuComponent";
import HeaderComponent from "../../components/HeaderComponent";
import CountdownComponent from "../../components/CountdownComponent";

import { getAttempts, setDataUserAnswer, setUserQuiz, putUserQuiz } from "../../services/quizFnc.js";

const MySwal = withReactContent(Swal);

const CoursePage = () => {
    const { id } = useParams();
    const [dataQuiz, setDataQuiz] = useState(null)
    const [dataPresentation, setDataPresentation] = useState([])
    const [questions, setDataQuestion] = useState([])
    const [totalProgress, setTotalProgress] = useState(0);
    const [userAnswers, setUserAnswers] = useState();
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
    
    const [userData, setUserData] = useState(null);
    const [attemptsUserQuiz, setAttemptsUserQuiz] = useState({attempt: 1});

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
        console.log("----1---",answerIndex);
        if (userAnswers[currentQuestion] === null) {
            console.log("----2---",userAnswers);
            const isCorrect = questions[currentQuestion].correctIndex.includes(answerIndex);
            setSelectedAnswer(answerIndex);

            setUserAnswers((prevUserAnswers) => {
                const newUserAnswers = [...prevUserAnswers];
                newUserAnswers[currentQuestion] = isCorrect ? {response: 'correct', index: answerIndex} : {response: 'incorrect', index: answerIndex};
                return newUserAnswers;
            });
            console.log("----3---");
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

    const handleFinishQuiz = async () => {
        // Contar las preguntas no respondidas
        const unanswered = userAnswers.filter((answer) => answer === null).length;
        setUnansweredCount(unanswered);

        // Finalizar el quiz
        setQuizCompleted(true);
        setTimerStart(false);

        /* const attemptsUserQuiz = await getAttempts(userData.idUser, questions[0].idQuestion);
        console.log("INTENTOS DATA",attemptsUserQuiz) */
        const attemptsUser = attemptsUserQuiz.attempts?(attemptsUserQuiz.attempts + 1):1;
        let dataQuiz = {idUser:userData.idUser, idQuiz: questions[0].idQuestion, attempts:attemptsUser};
        let dataInsertQuiz = [];

        userAnswers.map(((item, index) => {
            console.log(item);
            const questionData = questions[index];
            const answerData = questions[index].answers[item.index];

            dataInsertQuiz.push({
                idUser:userData.idUser,
                idQuestion: questionData.idQuestion,
                idAnswer: answerData.idAnswer,
                attempt:attemptsUserQuiz.attempts + 1
            });

        }));

        let timerInterval;
        Swal.fire({
        title: "Validando respuestas...",
        timer: 5000,
        timerProgressBar: true
        });

        const dataAnswers = await setDataUserAnswer(dataInsertQuiz);
        const dataUserQuiz = attemptsUserQuiz.attempts? await putUserQuiz(userData.idUser, questions[0].idQuestion, {attempts: attemptsUser}) : await setUserQuiz(dataQuiz);

        if(dataAnswers && dataUserQuiz){
            Swal.fire({
                icon: "success",
                title: "Completado",
                text: "Tus resultados se mostraran en pantalla",
              });
        }else{
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se han podido registrar tus datos prueba mas tarde.",
              });
        }
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
            console.log("GET DATOS")
            const datosUser = JSON.parse(localStorage.getItem("@user"));
            console.log("Usuario", datosUser);
            setUserData(datosUser);
        
            const quizReq = await axios.get(`http://localhost:4500/quiz/v1/quiz/${id}`);
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
                                arrayAnswer.push({idAnswer: answer.idAnswers, description: answer.description})
                                if (answer.isCorrect) arrayCorrectAnswer.push(index)
                            })

                            array.push({
                                idQuestion: item.idQuestion,
                                question: item.description,
                                answers: arrayAnswer,
                                correctIndex: arrayCorrectAnswer
                            })
                        })

                        console.log(questionReq);

                        setDataQuestion(array);
                        setUserAnswers(Array(array.length).fill(null));
                        const attemptsUserQuizget = await getAttempts(datosUser.idUser, quizReq.data.idQuiz);
                        console.log("INTENTOS DATA",attemptsUserQuizget.data, quizReq.data)
                        setAttemptsUserQuiz(attemptsUserQuizget.data);
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
                                    dataQuiz={dataQuiz}
                                    attemptsUserQuiz={attemptsUserQuiz}
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
