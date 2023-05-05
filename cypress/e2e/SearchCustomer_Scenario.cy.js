// SearchCustomerScenario.cy.js

import SearchCustomerPage from "../pageobjects/SearchCustomerPage"
import LoginPage from "../pageobjects/LoginPage"
import DashboardPage from "../pageobjects/DashboardPage"

describe("TS_03: Search Customer Scenario", ()=>{

    var SearchCustomerObject = new SearchCustomerPage()
    var LoginPageObject = new LoginPage()
    var DashboardPageObject = new DashboardPage()

    beforeEach(()=>{
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            cy.LoginAndVerify(
                LoginPageObject, 
                [data.LoginPage.validCredentials.email, data.LoginPage.validCredentials.password], 
                ()=>DashboardPageObject.contentHeader.should('exist').should('contain.text', 'Dashboard')
            )
        })
    })

    afterEach(()=>{
        cy.Logout()
    })

    it("TC_01: Search Customer by EMailID", ()=>{
        SearchCustomerObject.visit()
        cy.fixture('appData').then(data=>{
            data.SearchCustomer.customers.forEach(cx=>{
                SearchCustomerObject.enterEmail(cx.email)
                SearchCustomerObject.clickSearchButton()
            })
        })
    })
    
    it("TC_02: Search Customer by Name", ()=>{
        SearchCustomerObject.visit()
        cy.fixture('appData').then(data=>{
            data.SearchCustomer.customers.forEach(cx=>{
                SearchCustomerObject.enterFirstName(cx.firstName)
                SearchCustomerObject.enterLastName(cx.lastName)
                SearchCustomerObject.clickSearchButton()
            })
        })
    })
})