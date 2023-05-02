describe('Tests staging and the admin-specific functions', () => {
  beforeEach ( () => {
    cy.visit('http://localhost:3000/Hjem')
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="loggin"]').click()
    cy.get('[data-cy="email"]').type('admin@trondheim.kommune.no')
    cy.get('[data-cy="password"]').type('admin')
    cy.get('[data-cy="logginButton"]').click()
  })
  
  it.only('Approves a problem and checks that it is added correctly', () => {
    cy.get('[data-cy="godkjennProblem"]').click()
    cy.contains("eksProblem").click()
    cy.get('[data-cy="kategoriserSpesProblem"]').should("be.visible").click()
    cy.contains("AvailableData").click()
    cy.get('[data-cy="kategoriserDataprodukt"]').should("be.visible").click()
    cy.contains("Tool").click()
    cy.get('[data-cy="kategoriserTilgjengeligData"]').should("be.visible").click()
    cy.contains("CitizenData").click()
    cy.url().should("contain", "/Hjem")
    cy.get('[data-cy="søk"]').click()
    cy.contains("eksProblem").should("be.visible")
  })
  it("Creates a new user", () => {
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="registrerBruker"]').click()
    cy.get('[data-cy="tilhørighet"]').click()
    cy.get('[data-cy="Malvik kommune"]').click()
    cy.get('[data-cy="epost"]').type("exampleUser@Malvik.kommune.no")
    cy.get('[data-cy="tlf"]').type("45596332")
    cy.get('[data-cy="passord"]').type("1234")
    cy.get('[data-cy="bekreftPassord"]').type("1234")
    cy.get('[data-cy="send"]').click()
    cy.get('[data-cy="sucess"]').should("be.visible")
  })

})