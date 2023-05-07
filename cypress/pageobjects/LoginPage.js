// LoginPage.js
// This class represents the login page of a web application and follows the Page Object Model design pattern in Cypress. 
// It contains getters to locate and interact with the email input field, password input field, email input label, password input label, login button, and remember me checkbox. 
// Additionally, it provides methods to enter email and password data and to click the login button. 
// Overall, this class encapsulates the behavior and elements of the login page, making it easier to maintain and reuse in tests.

import selectors from "../fixtures/selectors"

class LoginPage{

    // getters

    get pageTitle(){ return cy.get(selectors.Login.pageTitle) }
    get contentTitle(){ return cy.get(selectors.Login.contentTitle) }
    get validationErrorMessage(){ return cy.get(selectors.Login.validationErrorMessage) }
    get emailInput(){ return cy.get(selectors.Login.emailInput) }
    get passwordInput(){ return cy.get(selectors.Login.passwordInput) }
    get emailInputLabel(){ return cy.get(selectors.Login.emailInputLabel) }
    get passwordInputLabel(){ return cy.get(selectors.Login.passwordInputLabel) }
    get loginButton(){ return cy.get(selectors.Login.loginButton) }
    get rememberMeChkBox(){ return cy.get(selectors.Login.rememberMeChkBox) }
    get rememberMeChkBoxLabel(){ return cy.get(selectors.Login.rememberMeChkBoxLabel) }

    // methods

    visit(){
        return cy.visit("https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F").viewport("macbook-16")
    }
    
    enterEmail(_emailData){
        this.emailInput.clear()
        this.emailInput.type(_emailData)
    }

    enterPassword(_passwordData){
        this.passwordInput.clear()
        this.passwordInput.type(_passwordData)
    }

    clickRememberMe(){
        this.rememberMeChkBox.should('not.be.checked').check()
        this.rememberMeChkBox.should('be.checked')
    }

    clickLoginButton(){
        this.loginButton.click()
    }
}

export default LoginPage