import axios from "axios";

export const getAttempts = async(idUser, idQuiz) => {
    try {
        const attemptsUser = await axios.get(`http://localhost:4500/quiz/v1/user/${idUser}/quiz/${idQuiz}`);
        console.log("---*.*---",attemptsUser);
        return attemptsUser;
    } catch (error) {
        return 0;
    } 
};

export const setDataUserAnswer = async (data) => {
    try {
        const dataQuizUser = await axios.post(`http://localhost:4500/quiz/v1/user-answer`, data);
        return dataQuizUser;
    } catch (error) {
        return error;
    }
};

export const setUserQuiz = async (data) => {
    try {
        console.log("SET")
        const dataQuizUser = await axios.post(`http://localhost:4500/quiz/v1/user-quiz`, data);
        return dataQuizUser;
    } catch (error) {
        return error;
    }
};

export const putUserQuiz = async (idUser, idQuiz, data) => {
    try {
        console.log("PUT")
        const dataQuizUser = await axios.put(`http://localhost:4500/quiz/v1/user-quiz/${idUser}/${idQuiz}`, data);
        return dataQuizUser;
    } catch (error) {
        return error;
    }
};

