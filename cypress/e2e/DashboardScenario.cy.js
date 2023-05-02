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
            DashboardPageObject.findContentBody(card).should('not.have.css', 'display', 'block')
        })
        
    })

    it("TC_02: Verify that when the user clicks on the card header, the expanded card collapses and hides its content.", ()=>{
        DashboardPageObject.getAllExpandedCards().each(card=>{
            DashboardPageObject.findContentBody(card).should('have.css', 'display', 'block')
            DashboardPageObject.clickCollapseToggle(card).should('not.have.css', 'display', 'block')
        })
    })
    
    it("TC_03: Verify that when the user clicks on the card header, the collapsed card expands and shows its content.", ()=>{
        DashboardPageObject.getAllCollapsedCards().each(card=>{
            DashboardPageObject.findContentBody(card).should('not.have.css', 'display', 'block')
            DashboardPageObject.clickCollapseToggle(card).then(() => {
                DashboardPageObject.findContentBody(card).should('have.css', 'display', 'block');
              })
        })
    })

    it("TC_04: Verify that the card does not collapses and hides its content when the user clicks outside of the card.", ()=>{
        var nonCardElements = [
            DashboardPageObject.contentHeader, 
            DashboardPageObject.footer
        ]
        
        DashboardPageObject.getAllExpandedCards().each(card=>{
            DashboardPageObject.findContentBody(card).should('have.css', 'display', 'block')
            nonCardElements[Math.floor(Math.random() * nonCardElements.length)].click()
            DashboardPageObject.findContentBody(card).should('have.css', 'display', 'block')
        })
    })

})
