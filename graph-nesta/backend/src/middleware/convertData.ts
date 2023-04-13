import { type OdaProblem, Status, type User } from '../types/types'
import { type AxiosResponse } from 'axios'

export function setObject (r: AxiosResponse<any, any>) {
  const odaProblems: OdaProblem[] =
    r.data.results.bindings.map(odaProblem => {
      const owner: User = {
        email: odaProblem.email.value,
        affiliation: odaProblem.affiliation.value,
        telephone: odaProblem.phoneNumber.value,
      }
      const status: Status = (odaProblem.progress.value === "newChallenge") ? Status.newChallenge : (odaProblem.progress.value === "inProcess") ? Status.started : Status.solved

      const problem: OdaProblem = {
        accessibleData: odaProblem.accessibleDataDescription.value,
        clearDataProduct: odaProblem.dataProductDescription.value,
        definedAction: odaProblem.definedActionDescription.value,
        id: odaProblem.odaProblem.value,
        owner,
        specificProblem: odaProblem.specificProblemDescription.value,
        status,
        subCount: 5,
        title: odaProblem.title.value,
        vendor: odaProblem.vendor.value,
      }
      return problem

    })
  return odaProblems
}
