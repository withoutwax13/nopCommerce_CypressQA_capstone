// SearchManufacturer.cy.js

import LoginPage from "../pageobjects/LoginPage"
import SearchManufacturerPage from "../pageobjects/SearchManufacturerPage"

describe("Scenario 3: Search Manufacturer Scenario", ()=>{

    var SearchManufacturerObject = new SearchManufacturerPage()

    // Pre-Conditions
    // Admin already logged in
    // Admin already redirected to dashboard page
    beforeEach(()=>{

        var LoginPageObject = new LoginPage()

        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            cy.LoginAndVerify(
                LoginPageObject, 
                [
                    data.LoginPage.validCredentials.email, 
                    data.LoginPage.validCredentials.password
                ], 
                ()=>{
                    cy.url().should('eq', data.DashboardPage.url)
                }
            )
        })
    })

    afterEach(()=>{
        cy.Logout()
    })

    it("TC_01: Verify working Search manufacturer by name feature", ()=>{
        SearchManufacturerObject.visit()
        SearchManufacturerObject.inputManufacturerName("Apple")
        SearchManufacturerObject.clickSearchButton()
        SearchManufacturerObject.assertHasResult()
        SearchManufacturerObject.assertDataInField("apple", "name")
    })
})