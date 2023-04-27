import axios from 'axios'
import queries from './queries'

const get = async (query: string) => {
  return await axios.get(`http://localhost:7200/repositories/dataDrivenMunicipalities?query=${encodeURIComponent(query)}`)
}

const update = async (query: string) => {
  return await axios.post(`http://localhost:7200/repositories/dataDrivenMunicipalities/statements?update=
  ${encodeURIComponent(query)}`)
}

const getODAProblems = async (limit: number, offset: number, searchString: string, category: string, email?: string, relation?: number, approved?: boolean, similarProblem?: string) => {
  // console.log(encodeURIComponent(queries.getODAProblems(limit, offset, searchString, category, email, relation)))
  return await get(queries.getODAProblems(limit, offset, searchString, category, email, relation, approved, similarProblem))
}
const addODAProblem = async (title: string, specificProblem: string, clearDataProduct: string, accessibleData: string, definedAction: string, supplier: string, userMail: string, status: string) => {
  // Assumes title is unique, otherwise we could end up in a situation where a single ODA problem can have many accessible datas etc.
  // Eventually add a check for thiss
  // Query will also need to update which user has made the query etc.
  const nodeName: string = title.replace(/\s/g, '')
  return await update(queries.addODAProblem(nodeName, title, specificProblem, clearDataProduct, accessibleData, definedAction, supplier, userMail, status))
}

const addCategories = async (specProblem: string, dataProduct: string, accessibleData: string, nodeName: string) => {
  const q1 = update(queries.addInference(specProblem, dataProduct, accessibleData, nodeName))
  const q2 = update(queries.addCategories(specProblem, dataProduct, accessibleData, nodeName))
  return await axios.all([q1, q2])
}

const addUser = async (phone: number, email: string, affiliation: string, password: string, setAdmin: boolean) => {
  console.log(queries.addUser(phone, email, affiliation, password, setAdmin))
  return await update(queries.addUser(phone, email, affiliation, password, setAdmin))
}

const findUser = async (email: string, password: string) => {
  return await get(queries.findUser(email, password))
}

const setAdmin = async (email: string, setAdmin: boolean) => {
  return await update(queries.setAdmin(email, setAdmin))

}

const subscribe = async (email: string, ODAProblem: string) => {
  return await update(queries.subscribe(email, ODAProblem))
}

const unsubscribe = async (email: string, ODAProblem: string) => {
  return await update(queries.unsubscribe(email, ODAProblem))
}

const isSubbed = async (email: string, ODAProblem: string) => {
  console.log(ODAProblem)
  return await get(queries.isSubbed(email, ODAProblem))
}

const getSubscribers = async (ODAProblem: string) => {
  return await get(queries.getSubscribers(ODAProblem))
}

const updateODAProblem = async (odaProblem: string, vendor: string, progress: string, title: string, specificProblem: string, clearDataProduct: string, accessibleData: string, definedAction: string) => {
  return await update(queries.updateODAProblem(odaProblem, vendor, progress, title, specificProblem, clearDataProduct, accessibleData, definedAction,
  ))
}

const getUser = async (email: string) => {
  return await get(queries.getUser(email))
}
const getSpecificProblemCategories = async () => {
  return await get(queries.specProbCategories())
}
const getAccessibleDataCategories = async () => {
  return await get(queries.acDataCategories())
}

const getDataProductCategories = async () => {
  return await get(queries.dataProdCategories())
}

const getCategories = async () => {
  const reqOne = get(queries.specProbCategories())
  const reqTwo = get(queries.acDataCategories())
  const reqThree = get(queries.dataProdCategories())
  return await axios.all([reqOne, reqTwo, reqThree])
}
export {
  getODAProblems,
  addODAProblem,
  addUser,
  addCategories,
  setAdmin,
  subscribe,
  unsubscribe,
  findUser,
  getUser,
  isSubbed,
  getSubscribers,
  getSpecificProblemCategories,
  getAccessibleDataCategories,
  getDataProductCategories,
  getCategories,
  updateODAProblem
}
