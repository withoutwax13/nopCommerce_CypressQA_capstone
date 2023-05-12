// Dashboard_Scenario

import DashboardPage from "../../pageobjects/DashboardPage"
import LoginPage from "../../pageobjects/LoginPage"

describe("Scenario: Dashboard", ()=>{
  var DashboardPageObject = new DashboardPage()
  var LoginPageObject = new LoginPage()

  beforeEach(()=>{
    // Pre-Conditions
    // Admin already logged in
    // Admin already redirected to dashboard page
    LoginPageObject.visit()
    cy.fixture('appData').then((data)=>{
        cy.LoginAndVerify(
            LoginPageObject, 
            [
                data.LoginPage.validCredentials.email,
                data.LoginPage.validCredentials.password
            ], 
            ()=>cy.title().should('eq', data.DashboardPage.title).should('not.eq', data.LoginPage.title)
        )
    })
  })

  afterEach(()=>{
    // Post-Condition: Logout
    cy.Logout()
  })

  it("TC_01: Verify collapsed cards are hidden and expanded cards are shown by default", ()=>{
    // Identify all collapsed cards and verify if their content body is hidden
    DashboardPageObject.getAllCollapsedCards().each(card=>{
      cy.ExpectHidden(DashboardPageObject.findContentBody(card))
    })

    // Identify all expanded cards and verify if their content body is shown
    DashboardPageObject.getAllExpandedCards().each(card=>{
      cy.ExpectNotHidden(DashboardPageObject.findContentBody(card))
    })

    // Identify all collapsed cards
    // Toggle the expand button on the card header of each card
    // Verify if the content bodies are shown
    DashboardPageObject.getAllCollapsedCards().each(card=>{
      cy.ExpectHidden(DashboardPageObject.findContentBody(card))
      DashboardPageObject.clickCollapseToggle(card).then(() => {
        cy.ExpectNotHidden(DashboardPageObject.findContentBody(card))
      })
    })

    // Identify all expanded cards
    // Toggle the collapse button on the card header of each card
    // Verify if the content bodies are hidden
    DashboardPageObject.getAllExpandedCards().each(card=>{
      cy.ExpectNotHidden(DashboardPageObject.findContentBody(card))
      DashboardPageObject.clickCollapseToggle(card).then(() => {
        cy.ExpectHidden(DashboardPageObject.findContentBody(card))
      })
    })

  })

})