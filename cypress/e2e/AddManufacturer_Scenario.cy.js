// AddManufacturer_Scenario.cy.js

import LoginPage from "../pageobjects/LoginPage"
import SearchManufacturerPage from "../pageobjects/SearchManufacturerPage"

describe("TS_05: Add Manufacturer Scenario", ()=>{

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
                ()=>{
                    cy.url().should('eq', data.DashboardPage.url)
                }
            )
        })
    })

    before(()=>{
        cy.fixture('appData').then(data=>{
            testData = data.AddManufacturer.testData
        })
    })

    afterEach(()=>{
        cy.Logout()
    })

    it("TC_01: Verify working adding manufacturer feature through uploading spreadsheet", ()=>{
        SearchManufacturerObject.visit()
        SearchManufacturerObject.clickImportButton()
        SearchManufacturerObject.assertModalTitleMatch("Import from Excel")
        SearchManufacturerObject.uploadSpreadsheet("manufacturers.xlsx")
        SearchManufacturerObject.verifyImportSucess()
        testData.forEach((data)=>{
            SearchManufacturerObject.assertDataInField(data.name, "name")
        })
    })
})