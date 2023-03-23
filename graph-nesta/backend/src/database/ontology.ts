import axios from 'axios'
import queries from './queries'

const get = async (query: string) => {
  return await axios.get(`http://localhost:7200/repositories/dataDrivenMunicipalities?query=${encodeURIComponent(query)}`)
}

const update = async (query: string) => {
  return await axios.post(`http://localhost:7200/repositories/dataDrivenMunicipalities/statements?update=
  ${encodeURIComponent(query)}`)
}

const getODAProblems = async (limit: number, offset: number) => {
  return await get(queries.getODAProblems(limit, offset))
}
const addODAProblem = async (title: string, specificProblem: string, clearDataProduct: string, accessibleData: string, supplier: string, userMail: string) => {
  // Assumes title is unique, otherwise we could end up in a situation where a single ODA problem can have many accessible datas etc.
  // Eventually add a check for this
  // Query will also need to update which user has made the query etc.
  const nodeName: string = title.replace(/\s/g, '')
  return await update(queries.addODAProblem(nodeName, title, specificProblem, clearDataProduct, accessibleData, supplier, userMail))
}

const addCategories = async (specProblem: string, dataProduct: string, accessibleData: string, nodeName: string) => {
  console.log(`http://localhost:7200/repositories/dataDrivenMunicipalities/statements?update=
  ${encodeURIComponent(queries.addCategories(specProblem, dataProduct, accessibleData, nodeName))}`)
  return await update(queries.addCategories(specProblem, dataProduct, accessibleData, nodeName))
}

const addUser = async (name: string, phone: number, email: string, affiliation: string) => {
  return await update(queries.addUser(name, phone, email, affiliation))
}

const setAdmin = async(email: string, setAdmin: boolean) => {
  return await update(queries.setAdmin(email, setAdmin))

}
export { getODAProblems, addODAProblem, addUser, addCategories, setAdmin }
