import axios from 'axios'
import queries from './queries'

const getODAProblems = async (limit: number, offset: number) => {
  return await axios.get(`http://localhost:7200/repositories/dataDrivenMunicipalities?query=${encodeURIComponent(queries.getODAProblems(limit, offset))}`)
}
const addODAProblem = async (title: string, specificProblem: string, clearDataProduct: string, accessibleData: string, supplier: string) => {
  // Assumes title is unique, otherwise we could end up in a situation where a single ODA problem can have many accessible datas etc.
  // Eventually add a check for this
  // Query will also need to update which user has made the query etc.
  const nodeName: string = title.replace(/\s/g, '')
  return await axios.post(`http://localhost:7200/repositories/dataDrivenMunicipalities/statements?update=
  ${encodeURIComponent(queries.addODAProblem(nodeName, title, specificProblem, clearDataProduct, accessibleData, supplier))}`)
}
export { getODAProblems, addODAProblem }
