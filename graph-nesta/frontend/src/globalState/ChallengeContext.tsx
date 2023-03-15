import React from "react";
import { createContext, type Dispatch, type SetStateAction, type ReactNode, useState } from "react";
import { type challengeCardProps, Status, type User } from "../types/types";

export interface ChallengeContextInterface {
    challenge: challengeCardProps,
    setChallenge: Dispatch<SetStateAction<challengeCardProps>>
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
    setChallenge: (_challenge: challengeCardProps) => {}
} as any // as ChallengeContextInferface
         // Which had an eslint error Always prefer const x: T = { ... }. the assertion to any is ignored by objectLiteralTypeAssertions.
         // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-assertions.md


export const ChallengeContext = createContext(initialChallengeCard);

interface ChallengeProviderProps {
    children: ReactNode
}

export default function ChallengeProvider({children} : ChallengeProviderProps){

    const [challenge, setChallenge] = useState<challengeCardProps>({
        id: "",
        title: "Tittel",
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
