import axios from "axios"

export const getGeneralDataInscriptionService = async () => {
  try {
    const data = await axios.get("https://jjhxj3zj-4500.use.devtunnels.ms/quiz/v1/general/pie")
    return data
  } catch (error) {
    return 0
  }
}

export const getGeneralDataByDivision = async () => {
  try {
    const data = await axios.get("https://jjhxj3zj-4500.use.devtunnels.ms/quiz/v1/general/results/division")
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getGeneralDataByArea = async () => {
  try {
    const data = await axios.get("https://jjhxj3zj-4500.use.devtunnels.ms/quiz/v1/general/results/division/area")
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getUsersByArea = async () => {
  try {
    const data = await axios.get("https://jjhxj3zj-4500.use.devtunnels.ms/quiz/v1/general/users/area")
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getDataByArea = async () => {
  try {
    const data = await axios.get("https://jjhxj3zj-4500.use.devtunnels.ms/quiz/v1/general/results/area")
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getDataGeneralAdvances = async () => {
  try {
    const data = await axios.get("https://jjhxj3zj-4500.use.devtunnels.ms/quiz/v1/general/advence/users")
    return data
  } catch (error) {
    console.log(error)
  }
}