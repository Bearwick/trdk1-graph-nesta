import axios from "axios";

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


export async function getODAproblem(id: string) {
    return await fetch('http://localhost:8080/graphql', { //  need changing ofc.
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    query: `
        query getODAproblem($id: id) {
        getODAproblem(id: $id) {
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
        id,
 
    },
}),
})
  .then(async (res) => await res.json())
  .then((result) => {return result.data.getODAproblem})
  .catch((error) => {console.log(error); return null;});

}

export function makeGetRequest() {
  console.log("makeGetRequest");


  axios.get("http://localhost:8080/ontology/NestaGuide").then(
      (response) => {
          const result = response.data;
          console.log(result);
          console.log("ja?");
      },
      (error) => {
          console.log(error);
      }
  );
}