import axios from 'axios'
import queries from './queries'

const get = async (query: string) => {
  return await axios.get(`http://localhost:7200/repositories/dataDrivenMunicipalities?query=${encodeURIComponent(query)}`)
}

const update = async (query: string) => {
  return await axios.post(`http://localhost:7200/repositories/dataDrivenMunicipalities/statements?update=
  ${encodeURIComponent(query)}`)
}

const getODAProblems = async (limit: number, offset: number, searchString: string, category: string) => {
  return await get(queries.getODAProblems(limit, offset, searchString, category))
}
const addODAProblem = async (title: string, specificProblem: string, clearDataProduct: string, accessibleData: string, definedAction: string, supplier: string, userMail: string) => {
  // Assumes title is unique, otherwise we could end up in a situation where a single ODA problem can have many accessible datas etc.
  // Eventually add a check for this
  // Query will also need to update which user has made the query etc.
  const nodeName: string = title.replace(/\s/g, '')
  return await update(queries.addODAProblem(nodeName, title, specificProblem, clearDataProduct, accessibleData, definedAction, supplier, userMail))
}

const addCategories = async (specProblem: string, dataProduct: string, accessibleData: string, nodeName: string) => {
  console.log(`http://localhost:7200/repositories/dataDrivenMunicipalities/statements?update=
  ${encodeURIComponent(queries.addCategories(specProblem, dataProduct, accessibleData, nodeName))}`)
  return await update(queries.addCategories(specProblem, dataProduct, accessibleData, nodeName))
}

const addUser = async (name: string, phone: number, email: string, affiliation: string, password: string) => {
  return await update(queries.addUser(name, phone, email, affiliation, password))
}

const findUser = async (email: string, password: string) => {
  return await get(queries.findUser(email, password))
}

const setAdmin = async(email: string, setAdmin: boolean) => {
  return await update(queries.setAdmin(email, setAdmin))

}

const subscribe = async (email: string, ODAProblem: string) => {
  return await update(queries.subscribe(email, ODAProblem))
}

const unsubscribe = async(email: string, ODAProblem: string) => {
  return await update(queries.unsubscribe(email, ODAProblem))
}
export { getODAProblems, addODAProblem, addUser, addCategories, setAdmin, subscribe, unsubscribe, findUser }
