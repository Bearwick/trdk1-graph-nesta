interface OdaProblem {
  id: string;
  title: string;
  vendor: string;
  status: Status;
  specificProblem: string;
  clearDataProduct: string;
  accessibleData: string;
  definedAction: string;
  subCount: number;
  owner: User;
  approved: boolean
}

interface User {
  email: string;
  telephone: string;
  affiliation: string;
}

interface UserInfo {
  email: string;
  telephone: string;
  affiliation: string;
  isAdmin: boolean
}

enum Status { 
  newProblem = "Nytt problem",
  started = "Påbegynnt",
  solved = "Løst",
}

interface AdminPanelInfoType {
  count: number,
}

export {
  type OdaProblem,
  type User,
  type UserInfo,
  Status,
  type AdminPanelInfoType
}