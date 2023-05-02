describe('Test the different interaction between users and problems', () => {
  beforeEach( () => {
    cy.visit('http://localhost:3000/Hjem')
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="loggin"]').click()
    cy.get('[data-cy="email"]').type('baardmurstein@steinskjer.kommune.no')
    cy.get('[data-cy="password"]').type('1234')
    cy.get('[data-cy="logginButton"]').click()

  })
  after( () => {
    cy.visit('http://localhost:3000/Hjem')
    cy.get('[data-cy="søk"]').click()
    cy.contains("barnehage").click()
    cy.get('[data-cy = "subscribeBtn"]').click()
  })

  it('Checks that it is possible to subscribe to a problem', () => {
    cy.get('[data-cy="søk"]').click()
    cy.contains("barnehage").click()
    cy.get('[data-cy = "subscribeBtn"]').click()
    cy.get('[data-cy = "subcount"]').contains("1")
    cy.contains("baardmurstein@steinskjer.kommune.no")
    cy.contains("Steinkjer kommune")
    cy.contains("49966222")

  })

  it("Cheks that problems appear in 'my problems' page", () => {
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="mineProblemer"]').click()
    cy.get('[data-cy="abonnerteProblemer"]').click()
    cy.contains("barnehage")
  })
  it("Checks that the profile information is right", () => {
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="minProfil"]').click()
    cy.get('[data-cy="profileInfo"]').should("be.visible")
    .and("contain", "Kontaktinformasjon")
    .and("contain", "Steinkjer kommune")
    .and("contain", "baardmurstein@steinskjer.kommune.no")
    .and("contain", "49966222")
  })
})