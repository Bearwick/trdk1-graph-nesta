import { should } from "chai"

describe('Creates a new problem and checks that it exists', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/Hjem')
  })
  it('Fills the text-boxes and creates the problem', () => {
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="loggin"]').click()
    cy.get('[data-cy="email"]').type('admin@trondheim.kommune.no')
    cy.get('[data-cy="password"]').type('admin')
    cy.get('[data-cy="logginButton"]').click()
    cy.get('[data-cy="nyProblem"]').click()
    cy.get('[data-cy="tittel"]').type("EksProblem")
    cy.get('[data-cy="system"]').click().get('[data-cy = "Visma"]').click()
    cy.get('[data-cy="spesificProblem"]').type('EXAMPLE PROBLEM OEOE')
    cy.get('[data-cy="dataProduct"]').type('Graph')
    cy.get('[data-cy="accesibleData"]').type('Excel ark')
    cy.get('[data-cy="definedAction"]').type('HEYO MAKE SIRCUS')
    cy.get('[data-cy ="send"]').click()
  })
  

  it('Checks that the problem just created exists and the fields are correct', () => {
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="loggin"]').click()
    cy.get('[data-cy="email"]').type('admin@trondheim.kommune.no')
    cy.get('[data-cy="password"]').type('admin')
    cy.get('[data-cy="logginButton"]').click()
    cy.get('[data-cy="søk"]').click()
    cy.contains("EksProblem").click()
    cy.get('[data-cy ="kontaktContainer"]').contains("Trondheim Kommune").should("be.visible")
    cy.get('[data-cy ="kontaktContainer"]').contains("admin@trondheim.kommune.no").should("be.visible")
    cy.get('[data-cy ="kontaktContainer"]').contains("+47 12345678").should("be.visible")
  })
  it('Checks that it is possible to subscribe to a problem', () => {
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="loggin"]').click()
    cy.get('[data-cy="email"]').type('baardmurstein@steinskjer.kommune.no')
    cy.get('[data-cy="password"]').type('1234')
    cy.get('[data-cy="logginButton"]').click()
    cy.get('[data-cy="søk"]').click()
    cy.contains("AbonnerEks").click()
    cy.get('[data-cy = "subscribeBtn"]').click()
    cy.get('[data-cy = "subCount"]')
    cy.contains("baardmurstein@steinskjer.kommune.no")
    cy.contains("Steinkjer kommune")
    cy.contains("49966222")

  })
  
  it("Cheks that problems appear in 'my problems' page", () => {
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="loggin"]').click()
    cy.get('[data-cy="email"]').type('baardmurstein@steinskjer.kommune.no')
    cy.get('[data-cy="password"]').type('1234')
    cy.get('[data-cy="logginButton"]').click()
    cy.wait(3000)
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="mineProblemer"]').click()
    cy.get('[data-cy="abonnerteProblemer"]').click()
    cy.contains("AbonnerEks").click()
    cy.get('[data-cy = "subscribeBtn"]').click()
  })

})
