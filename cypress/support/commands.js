// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>


// Custom Commands/Methods

Cypress.Commands.add("LoginAndVerify", (_object, credentials, verification)=>{
    _object.enterEmail(credentials[0])
    _object.enterPassword(credentials[1])
    _object.clickRememberMe()
    _object.clickLoginButton()
    verification()
})

Cypress.Commands.add("Logout", ()=>{
    cy.xpath("//a[normalize-space()='Logout']").click({force: true})
})

Cypress.Commands.add('ExpectHidden', (_object)=>{
    _object.then((obj)=>cy.wrap(obj).should('not.have.css', 'display', 'block'))
})

Cypress.Commands.add('ExpectNotHidden', (_object)=>{
    _object.then((obj)=>cy.wrap(obj).should('have.css', 'display', 'block'))
})