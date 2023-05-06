import { should } from "chai"

describe('Creates a new problem and checks that it exists', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/Hjem')
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="loggin"]').click()
    cy.get('[data-cy="email"]').type('admin@trondheim.kommune.no')
    cy.get('[data-cy="password"]').type('admin')
    cy.get('[data-cy="logginButton"]').click()
    cy.wait(2000)
  })


  it('Fills the text-boxes and creates the problem', () => {
    cy.get('[data-cy="newProblem"]').click()
    cy.get('[data-cy="title"]').should("be.visible").type("EksProblem")
    cy.get('[data-cy="system"]').click().get('[data-cy = "Visma"]').click()
    cy.get('[data-cy="spesificProblem"]').should("be.visible").type('TESTUS EXAMPLUS')
    cy.get('[data-cy="dataProduct"]').should("be.visible").type('Graph')
    cy.get('[data-cy="accesibleData"]').should("be.visible").type('Excel ark')
    cy.get('[data-cy="definedAction"]').should("be.visible").type('LOREM TESTUM')
    cy.get('[data-cy ="send"]').click()
    cy.url().should("include", "/Hjem")
  })
  
  it('Checks that the problem just created exists and the fields are correct', () => {
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="myProblems"]').click()
    cy.wait(1000)
    cy.contains("EksProblem").click()
    cy.get('[data-cy="dataProduct"]').should("be.visible").contains("Graph")
    cy.get('[data-cy="accesibleData"]').should("be.visible").contains('Excel ark')
    cy.get('[data-cy="definedAction"]').should("be.visible").contains('LOREM TESTUM')
    cy.get('[data-cy="spesificProblem"]').should("be.visible").contains('TESTUS EXAMPLUS')
    cy.get('[data-cy ="contactContainer"]').contains("Trondheim Kommune").should("be.visible")
    cy.get('[data-cy ="contactContainer"]').contains("admin@trondheim.kommune.no").should("be.visible")
    cy.get('[data-cy ="contactContainer"]').contains("+47 12345678").should("be.visible")  
  })
  it("checks that the user can edit problems", () => {
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="myProblems"]').click()
    cy.contains("EksProblem").click()
    cy.get('[data-cy="editIcon"]').click()
    cy.get('[data-cy="dataProductField"]').type(' Pie chart')
    cy.get('[data-cy="accesibleDataField"]').type(' and graph')
    cy.get('[data-cy="categorizeSpesProblem"]').should("be.visible").click()
    cy.contains("AvailableData").click()
    cy.get('[data-cy="categorizeDataproduct"]').should("be.visible").click()
    cy.contains("Tool").click()
    cy.get('[data-cy="categorizeAccesibleData"]').should("be.visible").click()
    cy.contains("CitizenData").click()
    cy.get('[data-cy="saveChanges"]').click()
    cy.get('[data-cy="confirmChanges"]').click()
    cy.wait(2000)

  })
  it("checks that the the changes have been saved after editing a problem", () => {
    cy.wait(2000)
    cy.get('[data-cy="hamburgerMenu"]').click()
    cy.get('[data-cy="myProblems"]').click()
    cy.contains("EksProblem").click()
    cy.get('[data-cy="accesibleData"]').should("contain", "graph")
  })

  it("deletes problems",() => {
    cy.visit('http://localhost:3000/Hjem')
    cy.wait(1000)
    cy.get('[data-cy="search"]').click()
    cy.contains("EksProblem").click()
    cy.wait(1000)
    cy.get('[data-cy="editIcon"]').click()
    cy.wait(1000)
    cy.get('[data-cy="system"]').click().get('[data-cy = "BlueGarden"]').click()
    cy.get('[data-cy="categorizeSpesProblem"]').should("be.visible").click()
    cy.contains("AvailableData").click()
    cy.wait(1000)
    cy.get('[data-cy="categorizeDataproduct"]').should("be.visible").click()
    cy.contains("Tool").click()
    cy.wait(1000)
    cy.get('[data-cy="categorizeAccesibleData"]').should("be.visible").click()
    cy.contains("CitizenData").click()
    cy.wait(1000)
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="deleteProblem"]').wait(1000).click();
    cy.wait(1000)
    cy.get('[data-cy="confirmDelete"]').click();
    cy.wait(2000)
    /* ==== End Cypress Studio ==== */
  })


  
})
