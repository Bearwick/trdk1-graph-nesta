export interface challengeCardProps {
    id: string;
    onClick: any;
    title: string;
    system: string;
    status: Status;
    specificProblem: string;
    clearDataProduct: string;
    accessibleData: string;
    definedAction: string;
    subCount: number;
    owner: User;
    subs: User[];

}

export interface User {
    email: string;
    telephone: string;
    affiliation: string;

}

export enum Status {
    newChallenge = "Ny utfordring",
    started = "Påbegynnt",
    solved = "Løst",
}