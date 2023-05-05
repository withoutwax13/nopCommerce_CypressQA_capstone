// LoginPage.js
// This class represents the login page of a web application and follows the Page Object Model design pattern in Cypress. 
// It contains getters to locate and interact with the email input field, password input field, email input label, password input label, login button, and remember me checkbox. 
// Additionally, it provides methods to enter email and password data and to click the login button. 
// Overall, this class encapsulates the behavior and elements of the login page, making it easier to maintain and reuse in tests.

class LoginPage{

    // getters

    get pageTitle(){ return cy.get("div[class='page-title'] h1") }
    get contentTitle(){ return cy.get("div[class='title'] strong") }
    get validationErrorMessage(){ return cy.get(".validation-summary-errors") }
    get emailInput(){ return cy.get("#Email") }
    get passwordInput(){ return cy.get("#Password") }
    get emailInputLabel(){ return cy.get("label[for='Email']") }
    get passwordInputLabel(){ return cy.get("label[for='Password']") }
    get loginButton(){ return cy.get("button[type='submit']") }
    get rememberMeChkBox(){ return cy.get("#RememberMe") }
    get rememberMeChkBoxLabel(){ return cy.get("label[for='RememberMe']") }

    // methods

    visit(){
        return cy.visit("https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F").viewport('macbook-16')
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