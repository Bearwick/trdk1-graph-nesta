import { get } from './endpoints.ts'
import { ontology } from '../queries/ontology.ts'
import axios from 'axios'

export const getCategories = async () => {
  const reqOne = get(ontology.specProbCategories())
  const reqTwo = get(ontology.acDataCategories())
  const reqThree = get(ontology.dataProdCategories())
  return await axios.all([reqOne, reqTwo, reqThree])
}

export const getVendors = async () => {
  return await get(ontology.getVendors())
}
