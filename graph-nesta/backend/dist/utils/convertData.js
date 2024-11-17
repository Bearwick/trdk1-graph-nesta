import { Status } from '../types/types';
export function convertOdaProblem(r) {
    const odaProblems = r.data.results.bindings.map((odaProblem) => {
        const owner = {
            email: odaProblem.email.value,
            affiliation: odaProblem.affiliation.value,
            telephone: odaProblem.phoneNumber.value,
        };
        const status = (odaProblem.progress.value === 'newChallenge') ? Status.newProblem : (odaProblem.progress.value === 'inProcess') ? Status.started : Status.solved;
        const problem = {
            accessibleData: odaProblem.accessibleDataDescription.value,
            clearDataProduct: odaProblem.dataProductDescription.value,
            definedAction: odaProblem.definedActionDescription.value,
            id: odaProblem.odaProblem.value,
            owner,
            specificProblem: odaProblem.specificProblemDescription.value,
            status,
            subCount: odaProblem.subCount ? odaProblem.subCount.value : 0,
            title: odaProblem.title.value,
            vendor: odaProblem.vendor.value,
            approved: odaProblem.approved.value,
        };
        return problem;
    });
    return odaProblems;
}
export function convertAdminPanelInfo(r) {
    const counts = [];
    r.data.results.bindings.forEach((element) => {
        for (const key in element) {
            if (element.hasOwnProperty(key)) {
                counts.push(element[key].value);
            }
        }
    });
    return counts;
}
export function convertSubscribers(r) {
    const subscribers = r.data.results.bindings.map((subscriber) => {
        const owner = {
            email: subscriber.email.value,
            affiliation: subscriber.affiliation.value,
            telephone: subscriber.phone.value,
        };
        return owner;
    });
    return subscribers;
}
export function convertUser(r) {
    const userData = r.data.results.bindings[0];
    const user = {
        email: userData.mail.value,
        telephone: userData.phone.value,
        affiliation: userData.affiliation.value,
        isAdmin: userData.isAdmin.value,
    };
    return user;
}
export function convertCategory(r) {
    return r.data.results.bindings.map((r) => {
        return r.category.value.substring(20);
    }).slice(2);
}
export function convertVendors(r) {
    return r.data.results.bindings.map((r) => {
        return r.vendor.value.substring(20);
    });
}
