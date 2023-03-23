interface OdaProblemParams {
  limit: number
  offset: number
}

interface AddOdaProblemParams {
  title: string
  specificProblem: string
  clearDataProduct: string
  accessibleData: string
  supplier: string
  userMail: string
}

interface AddUserParams {
  name: string
  phone: number
  email: string
  affiliation: string
}

interface AddCategoriesParams {
  specProblem: string
  dataProduct: string
  accessibleData: string
  nodeName: string

}

interface SetAdminParams {
  email: string
  setAdmin: string
}

export {type OdaProblemParams, type AddOdaProblemParams, type AddCategoriesParams, type AddUserParams, type SetAdminParams}
