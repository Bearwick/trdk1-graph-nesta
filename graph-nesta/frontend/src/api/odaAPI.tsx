import axios, { type AxiosResponse } from 'axios'
import {
  type Categories,
  type challengeCardProps,
  type ContextUser,
  type User,
} from '../types/types'

export const getOdaProblems = async (
  offset: number,
  limit: number,
  searchString: string,
  category: string,
  email?: string,
  relation?: number,
  approved?: boolean,
  similarProblem?: string,
  filter?: number
): Promise<AxiosResponse<challengeCardProps[]>> => {
  const q = await axios.get<challengeCardProps[]>('http://localhost:8080/odaProblem', {
    params: {
      offset,
      limit,
      searchString,
      category,
      email,
      relation,
      approved,
      similarProblem,
      filter,
    },
  })
  console.log(q)
  return q
}

export const getUserOdaProblems = async (
  offset: number,
  limit: number,
  searchString: string,
  category: string,
  email: string,
  relation: number
): Promise<AxiosResponse<challengeCardProps[]>> => {
  return await axios.get<challengeCardProps[]>('http://localhost:8080/odaProblem', {
    params: {
      offset,
      limit,
      searchString,
      category,
      email,
      relation,
    },
  })
}

export function makeGetRequest() {
  axios.get('http://localhost:8080/nesta').then(
    (response) => {
      const result = response.data
      console.log(result)
    },
    (error) => {
      console.log(error)
    }
  )
}

export async function addUser(
  phone: number,
  email: string,
  affiliation: string,
  password: string,
  admin: boolean
) {
  console.log('odaAPI addUser')
  await axios.get(`http://localhost:8080/user/AddUser?`, {
    params: {
      phone,
      email,
      affiliation,
      password,
      admin,
    },
  })
}

export async function findUser(email: string, password: string) {
  console.log('odaAPI findUser')
  return await axios.get<boolean>(`http://localhost:8080/user/FindUser?`, {
    params: {
      email,
      password,
    },
  })
}

export async function getUserInfo(email: string) {
  console.log('odaAPI fetching user info')

  return await axios.get<ContextUser>(`http://localhost:8080/user/UserInfo?`, {
    params: {
      email,
    },
  })
}

export async function addOdaProblem(
  title: string,
  specificProblem: string,
  clearDataProduct: string,
  accessibleData: string,
  definedAction: string,
  supplier: string,
  userMail: string,
  status: string
) {
  const test = axios.post('http://localhost:8080/odaProblem/AddProblem', {
    title,
    specificProblem,
    clearDataProduct,
    accessibleData,
    definedAction,
    supplier,
    userMail,
    status,
  })
  return await test
}

export async function updateOdaProblem(
  odaProblem: string,
  vendor: string,
  progress: string,
  title: string,
  specificProblem: string,
  clearDataProduct: string,
  accessibleData: string,
  definedAction: string
) {
  return await axios.put('http://localhost:8080/odaProblem/UpdateOdaProblem', {
    odaProblem,
    vendor,
    progress,
    title,
    specificProblem,
    clearDataProduct,
    accessibleData,
    definedAction,
  })
}

export async function deleteOdaProblem(odaProblem: string) {
  return await axios.put('http://localhost:8080/odaProblem/DeleteOdaProblem', {
    odaProblem,
  })
}

export async function subscribe(id: string, email: string, subscribe: boolean) {
  if (subscribe) {
    return await axios.get('http://localhost:8080/user/Subscribe', {
      params: {
        ODAProblem: id,
        email,
      },
    })
  } else {
    return await axios.get('http://localhost:8080/user/Unsubscribe', {
      params: {
        ODAProblem: id,
        email,
      },
    })
  }
}

export async function isSubscribed(id: string, email: string) {
  return await axios.get<boolean>('http://localhost:8080/user/IsSubscribed', {
    params: {
      ODAProblem: id,
      email,
    },
  })
}

export async function getSubscribers(id: string) {
  return await axios.get<User[]>('http://localhost:8080/odaProblem/getSubscribers', {
    params: {
      ODAProblem: id,
    },
  })
}

export async function getCategories() {
  return await axios.get<Categories>('http://localhost:8080/ontology/GetCategories')
}

export async function approve (specProblem: string, accessibleData: string, dataProduct: string, nodeName: string, approved: boolean) {
  return await axios.get('http://localhost:8080/odaProblem/AddCategories', {
    params: {
      specProblem,
      dataProduct,
      accessibleData,
      nodeName,
      approved,
    },
  })
}

export async function getVendors() {
  return await axios.get<string[]>('http://localhost:8080/ontology/GetVendors')
}
