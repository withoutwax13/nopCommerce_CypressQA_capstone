// DashboardScenario.cy.js

// TestCases
// 1. Verify if the content body of all collapsed cards are hidden
// 2. Verify that when the user clicks on the card header, the expanded card collapses and hides its content.
// 3. Verify that when the user clicks on the card header, the collapsed card expands and shows its content.
// 4. Verify that the card does not collapses and hides its content when the user clicks outside of the card.

import DashboardPage from "../pageobjects/DashboardPage"
import LoginPage from "../pageobjects/LoginPage"

describe("TS_02: Dashboard Scenario:", ()=>{
    var DashboardPageObject = new DashboardPage()
    var LoginPageObject = new LoginPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            cy.LoginAndVerify(LoginPageObject, [data.LoginPage.validCredentials.email, data.LoginPage.validCredentials.password], ()=>cy.url().should('eq', data.DashboardPage.url))
        })
    })

    it("TC_01: Verify if the content body of all collapsed cards are hidden", ()=>{
        DashboardPageObject.getAllCollapsedCards().each(card=>{
            cy.ExpectHidden(DashboardPageObject.findContentBody(card))
        })
        
    })

    it("TC_02: Verify that when the user clicks on the card header, the expanded card collapses and hides its content.", ()=>{
        DashboardPageObject.getAllExpandedCards().each(card=>{
            cy.ExpectNotHidden(DashboardPageObject.findContentBody(card))
            cy.ExpectHidden(DashboardPageObject.clickCollapseToggle(card))
        })
    })
    
    it("TC_03: Verify that when the user clicks on the card header, the collapsed card expands and shows its content.", ()=>{
        DashboardPageObject.getAllCollapsedCards().each(card=>{
            cy.ExpectHidden(DashboardPageObject.findContentBody(card))
            DashboardPageObject.clickCollapseToggle(card).then(() => {
                cy.ExpectNotHidden(DashboardPageObject.findContentBody(card))
              })
        })
    })

    it("TC_04: Verify that the card does not collapses and hides its content when the user clicks outside of the card.", ()=>{
        var nonCardElements = [
            DashboardPageObject.contentHeader, 
            DashboardPageObject.footer
        ]
        
        DashboardPageObject.getAllExpandedCards().each(card=>{
            cy.ExpectNotHidden(DashboardPageObject.findContentBody(card))
            nonCardElements[Math.floor(Math.random() * nonCardElements.length)].click()
            cy.ExpectNotHidden(DashboardPageObject.findContentBody(card))
        })
    })

})
