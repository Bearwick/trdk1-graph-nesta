import type { challengeCardProps } from "../types/types";
import validateUser from "./validateUser";

function validateChallenge(challenge: challengeCardProps): void {
    
    if (challenge.title === "") {
        throw new Error("Tittel-feltet er tomt")
    }

    if (challenge.system === "") {
        throw new Error("System-feltet er tomt")
    }

    if (challenge.specificProblem === "") {
        throw new Error("Spesifikt problem-feltet er tomt")
    }

    if (challenge.subCount < 0) {
        throw new Error("Mengden abonnenter er negativ");
    }

    validateUser(challenge.owner);
}

export default validateChallenge;
