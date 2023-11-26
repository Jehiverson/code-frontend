import axios from "axios"

export const getGeneralDataInscriptionService = async () => {
  try {
    const data = await axios.get("https://jjhxj3zj-4500.use.devtunnels.ms/quiz/v1/general/pie")
    return data
  } catch (error) {
    return 0
  }
}