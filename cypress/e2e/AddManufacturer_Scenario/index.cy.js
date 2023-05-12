// AddManufacturer_Scenario

import LoginPage from "../../pageobjects/LoginPage"
import SearchManufacturerPage from "../../pageobjects/SearchManufacturerPage"

describe("Scenario: Add Manufacturer", ()=>{

    var SearchManufacturerObject = new SearchManufacturerPage(),
        testData

    // Pre-Conditions
    // Admin already logged in
    // Admin already redirected to dashboard page
    beforeEach(()=>{

        // instantiate LoginPage object
        var LoginPageObject = new LoginPage()

        // visit LoginPage
        LoginPageObject.visit()

        // log in with valid credentials
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

    // get test data from fixture file
    before(()=>{
        cy.fixture('appData').then(data=>{
            testData = data.AddManufacturer.testData
        })
    })

    // log out after each test case
    afterEach(()=>{
        cy.Logout()
    })

    it("TC_01: Verify working adding manufacturer feature through uploading spreadsheet", ()=>{
        SearchManufacturerObject.visit() // visit SearchManufacturerPage
        SearchManufacturerObject.clickImportButton() // click import button

        cy.fixture('appData').then(appData=>{
            SearchManufacturerObject.assertModalTitleMatch(appData.AddManufacturer.modalTitle) // assert modal title
            SearchManufacturerObject.uploadSpreadsheet(appData.AddManufacturer.testFile) // upload spreadsheet
        })

        SearchManufacturerObject.verifyImportSucess() // verify import success
        
        // assert test data in field
        testData.forEach((data)=>{
            SearchManufacturerObject.assertDataInField(data.name, "name")
        })
    })
})