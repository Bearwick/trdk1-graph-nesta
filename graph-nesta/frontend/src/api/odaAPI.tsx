import axios, { type AxiosResponse } from 'axios'
import { type ContextUser, type challengeCardProps, type User } from '../types/types'

export async function getODAproblems(offset: number, limit: number, searchPhrase: string, categoryFilter: string, orderBy: string) { // For fetchin when searching
    return await fetch('http://localhost:8080/graphql', { //  need changing ofc.
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    query: `
        query getODAproblems($offset: Int, $limit: Int, $categoryFilter: String, $searchWord: String, $orderBy: String) {
        getODAproblems(offset: $offset, limit: $limit, categoryFilter: $categoryFilter, searchWord: $searchWord, orderBy: $orderBy) {
          id
          title
          system
          status
          affiliation
          specificProblem
          clearDataProduct
          accessibleData
          definedAction
          owner
          subs
        }
      }
      `,
    variables: {
        offset,
        limit,
        categoryFilter,
        searchPhrase,
        orderBy,
    },
}),
})
  .then(async (res: Response) => await res.json())
  .then((result) => {return result.data.getODAproblems})
  .catch((error) => {console.log(error); return null;});
}


export const getOdaProblems = async(offset: number, limit: number, searchString: string, category: string): Promise<AxiosResponse<challengeCardProps[]>> => {
  return await axios.get<challengeCardProps[]>("http://localhost:8080/ontology/ODAProblem", {
    params: {
      offset,
      limit,
      searchString,
      category
    }
  })
}
export function makeGetRequest() {

  axios.get("http://localhost:8080/ontology/NestaGuide").then(
      (response) => {
          const result = response.data;
          console.log(result);
      },
      (error) => {
          console.log(error);
      }
  );
}

export async function addUser(phone: number, email: string, affiliation: string, password
  : string, admin: boolean) {
    console.log("odaAPI addUser");
    await axios.get(`http://localhost:8080/ontology/AddUser?`, {
      params: {
        phone,
        email,
        affiliation,
        password,
        admin
      }
    })
}

export async function findUser(email: string, password: string) {
    console.log("odaAPI findUser");
    return await axios.get<boolean>(`http://localhost:8080/ontology/FindUser?`, {
      params: {
        email,
        password
      }
    })
}

export async function getUserInfo(email: string) {
  console.log("odaAPI fetching user info");

  return await axios.get<ContextUser>(`http://localhost:8080/ontology/UserInfo?`, {
    params: {
      email,
    }
  })
}

export async function addOdaProblem(title: string, specificProblem: string, clearDataProduct: string, accessibleData: string, definedAction: string, supplier: string, userMail: string, status: string) {
  return await axios.get("http://localhost:8080/ontology/AddProblem", {
    params: {
      title,
      specificProblem,
      clearDataProduct,
      accessibleData,
      definedAction,
      supplier,
      userMail,
      status
    }
  })
}

export async function subscribe(id: string, email: string, subscribe: boolean) {
  if (subscribe) {
    return await axios.get("http://localhost:8080/ontology/Subscribe", {
      params: {
        ODAProblem: id,
        email
      }
    })
  } else {
    return await axios.get("http://localhost:8080/ontology/Unsubscribe", {
      params: {
        ODAProblem: id,
        email
      }
    })
  }
}

export async function isSubscribed(id: string, email: string) {
  return await axios.get<boolean>("http://localhost:8080/ontology/IsSubscribed", {
    params: {
      ODAProblem: id,
      email
    }
  })
}

export async function getSubscribers(id: string) {
  return await axios.get<User[]>("http://localhost:8080/ontology/getSubscribers", {
    params: {
      ODAProblem: id
    }
  })
}
