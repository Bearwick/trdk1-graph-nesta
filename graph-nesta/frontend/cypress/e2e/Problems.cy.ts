import { should } from "chai"

describe('Creates a new problem and checks that it exists', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/Hjem')
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="loggin"]').click()
    cy.get('[data-cy="email"]').type('admin@trondheim.kommune.no')
    cy.get('[data-cy="password"]').type('admin')
    cy.get('[data-cy="logginButton"]').click()
  })
  it('Fills the text-boxes and creates the problem', () => {
    cy.get('[data-cy="nyProblem"]').click()
    cy.get('[data-cy="tittel"]').should("be.visible").type("EksProblem")
    cy.get('[data-cy="system"]').click().get('[data-cy = "Visma"]').click()
    cy.get('[data-cy="dataProduct"]').should("be.visible").type('Graph')
    cy.get('[data-cy="accesibleData"]').should("be.visible").type('Excel ark')
    cy.get('[data-cy="definedAction"]').should("be.visible").type('LOREM TESTUM')
    cy.get('[data-cy ="send"]').click()
    cy.url().should("include", "/NyttProblem")
    cy.get('[data-cy="spesificProblem"]').should("be.visible").type('TESTUS EXAMPLUS')
    cy.get('[data-cy ="send"]').click()
    cy.url().should("include", "/Hjem")
  })
  
  it('Checks that the problem just created exists and the fields are correct', () => {
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="mineProblemer"]').click()
    cy.contains("EksProblem").click()
    cy.get('[data-cy="dataProduct"]').should("be.visible").contains("Graph")
    cy.get('[data-cy="accesibleData"]').should("be.visible").contains('Excel ark')
    cy.get('[data-cy="definedAction"]').should("be.visible").contains('LOREM TESTUM')
    cy.get('[data-cy="spesificProblem"]').should("be.visible").contains('TESTUS EXAMPLUS')
    cy.get('[data-cy ="kontaktContainer"]').contains("Trondheim Kommune").should("be.visible")
    cy.get('[data-cy ="kontaktContainer"]').contains("admin@trondheim.kommune.no").should("be.visible")
    cy.get('[data-cy ="kontaktContainer"]').contains("+47 12345678").should("be.visible")  
  })
  it("Checks that the new problems need staging before being posted", () => {
    cy.get('[data-cy="søk"]').click()
    cy.contains("eksProblem").should("not.be.visible")
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="mineProblemer"]').click()
    cy.contains("Til vurdering")
  })
  
})
