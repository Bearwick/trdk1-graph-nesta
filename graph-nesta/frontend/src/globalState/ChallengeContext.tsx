import React from "react";
import { createContext, Dispatch, SetStateAction, ReactNode, useState } from "react";
import { challengeCardProps, Status, User } from "../types/types";

export interface ChallengeContextInterface {
    challenge: challengeCardProps,
    setChallenge: Dispatch<SetStateAction<challengeCardProps>>
}


const initialUser: User = {
    email: "",
    telephone: "",
    affiliation: ""
}

const initialSubs = [initialUser];

const initialChallengeCard = {
    challenge:{
        id: "kuk!",
        title: "",
        system: "",
        status: Status.newChallenge,
        specificProblem: "",
        clearDataProduct: "",
        accessibleData: "",
        definedAction: "",
        subCount: 0,
        owner: initialUser,
        subs: initialSubs
        },
    setChallenge: (_challenge: challengeCardProps) => {}
} as ChallengeContextInterface


export const ChallengeContext = createContext(initialChallengeCard);

type ChallengeProviderProps = {
    children: ReactNode
}

export default function ChallengeProvider({children} : ChallengeProviderProps){

    const [challenge, setChallenge] = useState<challengeCardProps>({
        id: "",
        title: "",
        system: "",
        status: Status.newChallenge,
        specificProblem: "",
        clearDataProduct: "",
        accessibleData: "",
        definedAction: "",
        subCount: 0,
        owner: initialUser,
        subs: initialSubs

    });

    return(
        <ChallengeContext.Provider value = {{challenge, setChallenge}}>
            {children}
        </ChallengeContext.Provider>
    )

}

