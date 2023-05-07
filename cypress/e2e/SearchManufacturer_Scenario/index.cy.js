// SearchManufacturer

import LoginPage from "../../pageobjects/LoginPage"
import SearchManufacturerPage from "../../pageobjects/SearchManufacturerPage"

describe("Scenario: Search Manufacturer", ()=>{

    var SearchManufacturerObject = new SearchManufacturerPage(),
        testData

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
                ()=>cy.title().should('eq', data.DashboardPage.title).should('not.eq', data.LoginPage.title)
            )
        })
    })

    before(()=>{
        cy.fixture('appData').then((data)=>{
            testData = data.SearchManufacturer.testData
        })
    })

    afterEach(()=>{
        cy.Logout()
    })

    it("TC_01: Verify working Search manufacturer by name feature", ()=>{
        testData.forEach((data) => {
            SearchManufacturerObject.visit()
            SearchManufacturerObject.inputManufacturerName(data.data)
            SearchManufacturerObject.clickSearchButton()
            SearchManufacturerObject.assertHasResult()
            SearchManufacturerObject.assertDataInField(data.data, data.field)
        });
        
    })
})