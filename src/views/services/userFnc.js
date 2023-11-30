import axios from "axios"

export const loginService = async (user, password) => {
  try {
    const login = await axios.post("https://jjhxj3zj-4500.use.devtunnels.ms/settings/v1/user/login", { user, password })
    return login
  } catch (error) {
    console.log(error)
    return null
  }
}

export const registerService = async (params) => {
  try {
    const register = await axios.post("https://jjhxj3zj-4500.use.devtunnels.ms/settings/v1/user", params)
    return register
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getDivisionService = async () => {
  try {
    const request = await axios.get("https://jjhxj3zj-4500.use.devtunnels.ms/settings/v1/division")
    return request
  } catch (error) {
    return null
  }
}

export const getAreasService = async () => {
  try {
    const request = await axios.get("https://jjhxj3zj-4500.use.devtunnels.ms/settings/v1/area")
    return request
  } catch (error) {
    return null
  }
}

export const getAgencyService = async (areaSelected) => {
  try {
    const request = await axios.get(`https://jjhxj3zj-4500.use.devtunnels.ms/settings/v1/agency/area/${areaSelected}`)
    return request
  } catch (error) {
    return null
  }
}

export const getModulesService = async () => {
  try {
    const data = await axios.get("https://jjhxj3zj-4500.use.devtunnels.ms/quiz/v1/quiz");
    return data
  } catch (error) {
    return null
  }
}