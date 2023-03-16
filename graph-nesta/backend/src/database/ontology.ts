import axios from 'axios'
import queries from './queries'

const getRepositories = async () => {
  await axios.get('http://localhost:7200/repositories').then(r => {
    console.log(r.data.results)
    return r.data
  })
}
const getColaGoesWellWith = async () => {
  await axios.get(`http://localhost:7200/repositories/cola?query=${queries.getRepositories()}`).then(r => {
    console.log(r.data)
    return r.data
  })
}

const getODAProblems = async (limit: number, offset: number) => {
  return await axios.get(`http://localhost:7200/repositories/dataDrivenMunicipalities?query=${queries.getODAProblems(limit, offset)}`)
}
export { getRepositories, getColaGoesWellWith, getODAProblems }
