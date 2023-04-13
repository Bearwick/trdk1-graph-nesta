

export enum Status {
    newChallenge = "Ny utfordring",
    started = "Påbegynnt",
    solved = "Løst",
}

export interface User {
    email: string;
    telephone: string;
    affiliation: string;

}

export interface ContextUser {
    email: string;
    password: string;
    isLoggedIn: boolean;
}

export interface challengeCardProps {
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
    subs: User[];

}

export interface IfetchType {
    limit: number
    searchPhrase: string
    categoryFilter: string
    orderBy: string
}



