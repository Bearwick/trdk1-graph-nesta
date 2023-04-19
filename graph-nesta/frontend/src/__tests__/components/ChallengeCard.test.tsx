import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChallengeCard from '../../components/ChallengeCard'
import { ContextUser, Status, type challengeCardProps } from '../../types/types'
import { MemoryRouter } from 'react-router-dom'
import { ChallengeContext } from '../../globalState/ChallengeContext'
import renderer from "react-test-renderer"

// ChallengeCardProp-objects used for various test cases
const challengeCorrectData: challengeCardProps = {
    id: '123',
    title: 'Test Challenge',
    vendor: 'Test System',
    status: Status.newChallenge,
    specificProblem: 'Test Specific Problem',
    clearDataProduct: 'Test Clear Data Product',
    accessibleData: 'Test Accessible Data',
    definedAction: 'Test Defined Action',
    subCount: 5,
    owner: { email: 'test@mail.no', telephone: '111 22 333', affiliation: 'Test kommune' },
    subs: [],
}
const challengeEmptyTitle: challengeCardProps = {
    id: '1234',
    title: '',
    vendor: 'aa',
    status: Status.newChallenge,
    specificProblem: 'aa',
    clearDataProduct: 'aa',
    accessibleData: 'aa',
    definedAction: 'aa',
    subCount: 5,
    owner: { email: 'test@mail.no', telephone: '111 22 333', affiliation: 'aaaaaa' },
    subs: [],
}
const challengeNegativeSubCount: challengeCardProps = {
    id: '12345',
    title: 'Test Challenge',
    vendor: 'Test System',
    status: Status.newChallenge,
    specificProblem: 'Test Specific Problem',
    clearDataProduct: 'Test Clear Data Product',
    accessibleData: 'Test Accessible Data',
    definedAction: 'Test Defined Action',
    subCount: -5,
    owner: { email: 'test@mail.no', telephone: '111 22 333', affiliation: 'Test kommune' },
    subs: [],
}
const challengeInvalidEmail: challengeCardProps = {
    id: '12345',
    title: 'Test Challenge',
    vendor: 'Test System',
    status: Status.newChallenge,
    specificProblem: 'Test Specific Problem',
    clearDataProduct: 'Test Clear Data Product',
    accessibleData: 'Test Accessible Data',
    definedAction: 'Test Defined Action',
    subCount: 5,
    owner: { email: 'c:', telephone: '111 22 333', affiliation: 'Test kommune' },
    subs: [],
}
const challengeInvalidPhoneNumb: challengeCardProps = {
    id: '12345',
    title: 'Test Challenge',
    vendor: 'Test System',
    status: Status.newChallenge,
    specificProblem: 'Test Specific Problem',
    clearDataProduct: 'Test Clear Data Product',
    accessibleData: 'Test Accessible Data',
    definedAction: 'Test Defined Action',
    subCount: 5,
    owner: { email: 'test@ail.no', telephone: '11333', affiliation: 'Test kommune' },
    subs: [],
}
const loggedInUser: ContextUser = {
    email: "a@b.c",
    password: "aaaaaaaaaaaaaaa",
    isAdmin: true,
    isLoggedIn: true
}

afterEach(() => {
    cleanup();
})

describe("Renders with no errors", () => {
    it("renders challenge card with correct data", () => {
        render(
            <MemoryRouter>
                <ChallengeCard {...challengeCorrectData} />
            </MemoryRouter>
        )
        expect(screen.getByText(challengeCorrectData.title)).toBeInTheDocument()
        expect(screen.getByText(challengeCorrectData.status)).toBeInTheDocument()
        expect(screen.getByText(challengeCorrectData.specificProblem)).toBeInTheDocument()
        expect(screen.getByText(challengeCorrectData.vendor)).toBeInTheDocument()
        expect(screen.getByText(challengeCorrectData.subCount)).toBeInTheDocument()
        expect(screen.getByText(challengeCorrectData.owner.affiliation)).toBeInTheDocument()
    });

    it("calls setChallenge on click", () => {
        const setChallengeMock = jest.fn();
        render(
            <MemoryRouter>
                <ChallengeContext.Provider value={{challenge: challengeCorrectData, setChallenge: setChallengeMock, user: loggedInUser, setUser: jest.fn()}}>
                    <ChallengeCard {...challengeCorrectData} />
                </ChallengeContext.Provider>
            </MemoryRouter>
        );
        userEvent.click(screen.getByText(challengeCorrectData.title));
        expect(setChallengeMock).toHaveBeenCalledWith(challengeCorrectData);
    });
});

describe("Weird cases of data in ChallengeCardProps", () => {
    it("Title-field is an empty string", () => {
        render(
            <MemoryRouter>
                <ChallengeContext.Provider value={{challenge: challengeEmptyTitle, setChallenge: jest.fn(), user: loggedInUser, setUser: jest.fn()}}>
                    <ChallengeCard {...challengeEmptyTitle} />
                </ChallengeContext.Provider>
            </MemoryRouter>
        )
        expect(screen.getByText("En feil oppstod: Error: Tittel-feltet er tomt"))
    });

    it("Subs-count is negative", () => {
        render(
            <MemoryRouter>
                <ChallengeContext.Provider value={{challenge: challengeNegativeSubCount, setChallenge: jest.fn(), user: loggedInUser, setUser: jest.fn()}}>
                    <ChallengeCard {...challengeNegativeSubCount} />
                </ChallengeContext.Provider>
            </MemoryRouter>
        )
        expect(screen.getByText("En feil oppstod: Error: Mengden abonnenter er negativ"))
    });

    it("Owner with invalid email", () => {
        render(
            <MemoryRouter>
                <ChallengeContext.Provider value={{challenge: challengeInvalidEmail, setChallenge: jest.fn(), user: loggedInUser, setUser: jest.fn()}}>
                    <ChallengeCard {...challengeInvalidEmail} />
                </ChallengeContext.Provider>
            </MemoryRouter>
        )
        expect(screen.getByText("En feil oppstod: Error: Ugyldig email"))
    });

    it("Owner with invalid phone number", () => {
        render(
            <MemoryRouter>
                <ChallengeContext.Provider value={{challenge: challengeInvalidPhoneNumb, setChallenge: jest.fn(), user: loggedInUser, setUser: jest.fn()}}>
                    <ChallengeCard {...challengeInvalidPhoneNumb} />
                </ChallengeContext.Provider>
            </MemoryRouter>
        )
        expect(screen.getByText("En feil oppstod: Error: Ugyldig telefonnummer"))
    });
});

it("Matches snapshot", () => {
    const snapshot = renderer.create(
        <MemoryRouter>
            <ChallengeContext.Provider value={{challenge: challengeInvalidPhoneNumb, setChallenge: jest.fn(), user: loggedInUser, setUser: jest.fn()}}>
                <ChallengeCard {...challengeInvalidPhoneNumb} />
            </ChallengeContext.Provider>
        </MemoryRouter>
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
})