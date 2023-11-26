import axios from "axios";

export const getModulesService = async () => {
    try {
        const request = await axios.get("https://jjhxj3zj-4500.use.devtunnels.ms/quiz/v1/quiz");
        return request
    } catch (error) {
        return null
    }
}

export const getAttempts = async (idUser, idQuiz) => {
    try {
        const attemptsUser = await axios.get(`https://jjhxj3zj-4500.use.devtunnels.ms/quiz/v1/user/${idUser}/quiz/${idQuiz}`);
        console.log("---*.*---", attemptsUser);
        return attemptsUser;
    } catch (error) {
        return 0;
    }
};

export const getExtraOpportunity = async (idUser, idQuiz) => {
    try {
        const extraData = await axios.get(`https://jjhxj3zj-4500.use.devtunnels.ms/quiz/v1/user-attempts-quiz/${idUser}/${idQuiz}`);
        console.log("---*.*---", extraData);
        return extraData;
    } catch (error) {
        return 0
    }
}

export const setDataUserAnswer = async (data) => {
    try {
        const dataQuizUser = await axios.post(`https://jjhxj3zj-4500.use.devtunnels.ms/quiz/v1/user-answer`, data);
        return dataQuizUser;
    } catch (error) {
        return error;
    }
};

export const setUserQuiz = async (data) => {
    try {
        console.log("SET")
        const dataQuizUser = await axios.post(`https://jjhxj3zj-4500.use.devtunnels.ms/quiz/v1/user-quiz`, data);
        return dataQuizUser;
    } catch (error) {
        return error;
    }
};

export const putUserQuiz = async (idUser, idQuiz, data) => {
    try {
        console.log("PUT")
        const dataQuizUser = await axios.put(`https://jjhxj3zj-4500.use.devtunnels.ms/quiz/v1/user-quiz/${idUser}/${idQuiz}`, data);
        return dataQuizUser;
    } catch (error) {
        return error;
    }
};

export const setScoreUser = async (params) => {
    try {
        const scoreUser = await axios.post(`https://jjhxj3zj-4500.use.devtunnels.ms/quiz/v1/user-score-quiz`, params);
        console.log("---*---", scoreUser);
        return scoreUser;
    } catch (error) {
        return 0;
    }
};

export const getDivisionService = async () => {
    try {
        const request = await axios.get("https://jjhxj3zj-4500.use.devtunnels.ms/settings/v1/division")
        return request
    } catch (error) {
        return 0
    }
}

export const getAgencyService = async (areaSelected) => {
    try {
        const request = await axios.get(`https://jjhxj3zj-4500.use.devtunnels.ms/settings/v1/agency/area/${areaSelected}`)
        return request;
    } catch (error) {
        return 0;
    }
}