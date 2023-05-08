// SearchManufacturer

// Import page objects
import LoginPage from "../../pageobjects/LoginPage"
import SearchManufacturerPage from "../../pageobjects/SearchManufacturerPage"

describe("Scenario: Search Manufacturer", ()=>{

    var SearchManufacturerObject = new SearchManufacturerPage(),
        testData

    // Pre-Conditions
    // Admin already logged in
    // Admin already redirected to dashboard page
    beforeEach(()=>{

        // Create LoginPage object
        var LoginPageObject = new LoginPage()

        // Visit the login page
        LoginPageObject.visit()

        // Load test data and Login
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

    // Load test data
    before(()=>{
        cy.fixture('appData').then((data)=>{
            testData = data.SearchManufacturer.testData
        })
    })

    // Logout after each test
    afterEach(()=>{
        cy.Logout()
    })

    it("TC_01: Verify working Search manufacturer by name feature", ()=>{
        // Iterate over the test data and perform the search for each data item
        // Verify that at least one result is displayed
        // Verify that the searched data is present in the specified field of the search result
        testData.forEach((data) => {
            SearchManufacturerObject.visit()
            SearchManufacturerObject.inputManufacturerName(data.data)
            SearchManufacturerObject.clickSearchButton()
            SearchManufacturerObject.assertHasResult()
            SearchManufacturerObject.assertDataInField(data.data, data.field)
        });
        
    })
})