// DashboardScenario.cy.js

import DashboardPage from "../pageobjects/DashboardPage"
import LoginPage from "../pageobjects/LoginPage"

describe("TS_02: Dashboard Scenario", ()=>{
    var DashboardPageObject = new DashboardPage()
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        
        // Pre-Conditions
        // Admin already logged in
        // Admin already redirected to dashboard page

        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            cy.LoginAndVerify(LoginPageObject, [data.LoginPage.validCredentials.email, data.LoginPage.validCredentials.password], ()=>cy.url().should('eq', data.DashboardPage.url))
        })
    })

    afterEach(()=>{
        // Post-Condition: Logout
        cy.Logout()
    })

    it("TC_01: Verify working collapse/expand feature of dashboard cards", ()=>{

        // Identify all collapsed cards
        // Verify if the content body of all collapsed cards should be hidden

        DashboardPageObject.getAllCollapsedCards().each(card=>{
            cy.ExpectHidden(DashboardPageObject.findContentBody(card))
        })

        // Identify all expanded cards
        // Verify if the content body of all expanded cards should be shown

        DashboardPageObject.getAllExpandedCards().each(card=>{
            cy.ExpectNotHidden(DashboardPageObject.findContentBody(card))
            cy.ExpectHidden(DashboardPageObject.clickCollapseToggle(card))
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
