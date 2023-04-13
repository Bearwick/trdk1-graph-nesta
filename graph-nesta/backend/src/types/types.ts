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
}

interface User {
  email: string;
  telephone: string;
  affiliation: string;
}

enum Status {
  newChallenge = "Ny utfordring",
  started = "Påbegynnt",
  solved = "Løst",
}

export {
  type OdaProblem,
  type User,
  Status
}
