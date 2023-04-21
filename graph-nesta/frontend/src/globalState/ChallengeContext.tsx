import React from "react";
import { createContext, type Dispatch, type SetStateAction, type ReactNode, useState } from "react";
import { type challengeCardProps, Status, type User, type ContextUser } from "../types/types";

export interface ChallengeContextInterface {
    challenge: challengeCardProps,
    setChallenge: Dispatch<SetStateAction<challengeCardProps>>,
    
    user: ContextUser,
    setUser: Dispatch<SetStateAction<ContextUser>>
}

const initialUser: User = {
    email: "-",
    telephone: "-",
    affiliation: "-"
}


const initialSubs = [initialUser];

const initialChallengeCard: ChallengeContextInterface = {
    challenge: {
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
        },
    setChallenge: (_challenge: challengeCardProps) => {},

    user: {
        email: "-",
        password: "-",
        affiliation: "-",
        telephone: "-",
        isLoggedIn: false,
        isAdmin: false,
    },
    setUser: (_user : ContextUser) => {}
} as any // as ChallengeContextInferface
         // Which had an eslint error Always prefer const x: T = { ... }. the assertion to any is ignored by objectLiteralTypeAssertions.
         // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-assertions.md



export const ChallengeContext = createContext(initialChallengeCard);

interface ChallengeProviderProps {
    children: ReactNode
}

export default function ChallengeProvider({children} : ChallengeProviderProps){

    const [user, setUser] = useState({
        email: "",
        password: "",
        affiliation: "",
        telephone: "",
        isLoggedIn: false,
        isAdmin: false,
    })
    
    const [challenge, setChallenge] = useState<challengeCardProps>({
        id: "",
        title: "Tittel",
        vendor: "",
        status: Status.newChallenge,
        specificProblem: "",
        clearDataProduct: "",
        accessibleData: "",
        definedAction: "",
        subCount: 0,
        owner: initialUser,
        subs: initialSubs,
        edit: false,

    });

    return(
        <ChallengeContext.Provider value = {{challenge, setChallenge, user, setUser}}>
            {children}
        </ChallengeContext.Provider>
    )

}
