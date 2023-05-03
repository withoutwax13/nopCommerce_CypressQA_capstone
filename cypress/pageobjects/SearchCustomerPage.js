// SearchCustomerPage.js

class SearchCustomerPage{

    // getters
    get emailInput(){
        return cy.xpath("//input[@id='SearchEmail']")
    }

    get firstNameInput(){
        return cy.xpath("//input[@id='SearchFirstName']")
    }

    get lastNameInput(){
        return cy.xpath("//input[@id='SearchLastName']")
    }

    get searchButton(){
        return cy.xpath("//button[@id='search-customers']")
    }

    // methods
    visit(){
        cy.xpath("//a[@href='#']//p[contains(text(),'Customers')]//i").click()
        cy.xpath("//a[@href='/Admin/Customer/List']//p[contains(text(),'Customers')]").click()
        cy.url().should('eq', 'https://admin-demo.nopcommerce.com/Admin/Customer/List')
    }

    enterEmail(_emailID){
        return this.emailInput.clear().type(_emailID).should('have.value', _emailID)
    }

    enterFirstName(_firstName){
        return this.firstNameInput.clear().type(_firstName).should('have.value', _firstName)
    }

    enterLastName(_lastName){
        return this.lastNameInput.clear().type(_lastName).should('have.value', _lastName)
    }

    clickSearchButton(){
        return this.searchButton.click()
    }

    hasResult(_tableField="email", _value){
        var tableFields = { email, name, customerRoles, companyName }
        
    }
}

export default SearchCustomerPage