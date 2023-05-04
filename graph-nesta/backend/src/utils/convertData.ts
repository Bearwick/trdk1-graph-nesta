import { type OdaProblem, Status, type User, type UserInfo, type AdminPanelInfoType } from '../types/types'
import { type AxiosResponse } from 'axios'

export function convertOdaProblem (r: AxiosResponse<any, any>) {
  const odaProblems: OdaProblem[] =
    r.data.results.bindings.map(odaProblem => {
      const owner: User = {
        email: odaProblem.email.value,
        affiliation: odaProblem.affiliation.value,
        telephone: odaProblem.phoneNumber.value,
      }
      const status: Status = (odaProblem.progress.value === 'newChallenge') ? Status.newProblem : (odaProblem.progress.value === 'inProcess') ? Status.started : Status.solved
      const problem: OdaProblem = {
        accessibleData: odaProblem.accessibleDataDescription.value,
        clearDataProduct: odaProblem.dataProductDescription.value,
        definedAction: odaProblem.definedActionDescription.value,
        id: odaProblem.odaProblem.value,
        owner,
        specificProblem: odaProblem.specificProblemDescription.value,
        status,
        subCount: odaProblem.subCount ? odaProblem.subCount.value : 0,
        title: odaProblem.title.value,
        vendor: odaProblem.vendor.value,
        approved: odaProblem.approved.value,
      }
      return problem

    })
  return odaProblems
}

export function convertAdminPanelInfo (r: AxiosResponse<any, any>) {

  const counts: number[] = [];
  
  r.data.results.bindings.forEach(element => { 
      for (const key in element) {
        if (element.hasOwnProperty(key)) {
          counts.push(element[key].value);
        }
      }
    });

  return counts
}

export function convertSubscribers (r: AxiosResponse<any, any>) {
  const subscribers: User[] = r.data.results.bindings.map(subscriber => {
    const owner: User = {
      email: subscriber.email.value,
      affiliation: subscriber.affiliation.value,
      telephone: subscriber.phone.value,
    }
    return owner
  })
  return subscribers

}

export function convertUser (r: AxiosResponse<any, any>) {
  const userData = r.data.results.bindings[0]
  const user: UserInfo = {
    email: userData.mail.value,
    telephone: userData.phone.value,
    affiliation: userData.affiliation.value,
    isAdmin: userData.isAdmin.value,
  }
  return user

}

export function convertCategory (r: AxiosResponse<any, any>) {
  return r.data.results.bindings.map(r => {
    return r.category.value.substring(20)
  }).slice(2)
}
export function convertVendors(r: AxiosResponse<any, any>) {
  return r.data.results.bindings.map(r => {
    return r.vendor.value.substring(20)
  })
}