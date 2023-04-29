// LoginScenario.cy.js

// Import the LoginPage object and a random data generator library
import LoginPage from "../pageobjects/LoginPage"
import { randEmail, randPassword } from '@ngneat/falso';

describe('TS_01: Login Scenario', () => {

  var LoginPageobject = new LoginPage()
  var pageUrl, title, adminEmail, adminPassword, successLoginURL

  before(()=>{
    // Load test data from a fixture file
    cy.fixture('appData').then(data=>{
      // Store variables from the fixture file
      pageUrl = data.LoginPage.url
      adminEmail = data.LoginPage.validCredentials.email
      adminPassword = data.LoginPage.validCredentials.password
      title = data.LoginPage.title
      successLoginURL = data.DashboardPage.url
    })
  })

  beforeEach(()=>{
    // Visit the login page and assert that the URL and page title match expected values
    LoginPageobject.visit().url().should('eq', pageUrl).title().should('eq', title)
  })

  it("TC_01: Verify successful login with valid username and password", ()=>{
    
    // Call a custom Cypress command 'LoginAndVerify' with the LoginPage object, valid credentials, and a callback to assert that the URL matches the successLoginURL
    cy.LoginAndVerify(LoginPageobject, [adminEmail, adminPassword], ()=>cy.url().should('eq', successLoginURL))
  })
  
  it("TC_02: Verify display of an appropriate error message a login attempt was made incorrect login credentials", ()=>{
    // Call 'LoginAndVerify' with the LoginPage object, random invalid credentials, and a callback to assert that a validation error message is visible and contains the expected text
    cy.LoginAndVerify(LoginPageobject, [randEmail(), randPassword()], ()=>LoginPageobject.validationErrorMessage.should('is.visible').and('contain', 'Login was unsuccessful. Please correct the errors and try again.'))    
  })

  it("TC_03: Verify unsuccessful login with invalid email and password", ()=>{
    // Call 'LoginAndVerify' with the LoginPage object, random invalid credentials, and a callback to assert that a validation error message is visible and the URL does not match the successLoginURL
    cy.LoginAndVerify(LoginPageobject, [randEmail(), randPassword()], ()=>{
      LoginPageobject.validationErrorMessage.should('is.visible')
      cy.url().should('not.eq', successLoginURL)
    })
  })

  it("TC_04: Verify that the system does not allow login with a blank/special character username or password field", ()=>{
    // Call 'LoginAndVerify' with the LoginPage object, blank/special character credentials, and a callback to assert that the URL does not match the successLoginURL
    cy.LoginAndVerify(LoginPageobject, ["\b", "\b"], ()=>cy.url().should('not.eq', successLoginURL))
  })

})