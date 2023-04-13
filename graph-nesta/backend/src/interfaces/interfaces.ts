interface OdaProblemParams {
  limit: number
  offset: number
  searchString: string
  category: string
}

interface AddOdaProblemParams {
  title: string
  specificProblem: string
  clearDataProduct: string
  accessibleData: string
  definedAction: string
  supplier: string
  userMail: string
  status: string
}

interface AddUserParams {
  phone: number
  email: string
  affiliation: string
  password: string
}

interface FindUserParams {
  email: string
  password: string
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

interface SubscribeParams {
  email: string
  ODAProblem: string
}

export {
  type OdaProblemParams,
  type AddOdaProblemParams,
  type AddCategoriesParams,
  type AddUserParams,
  type SetAdminParams,
  type SubscribeParams,
  type FindUserParams
}
