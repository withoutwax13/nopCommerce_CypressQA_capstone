// SearchManufacturer.js

class SearchManufacturerPage{
    get manufacturerNameInput(){
        return cy.xpath("//input[@id='SearchManufacturerName']")
    }
    get searchButton(){
        return cy.xpath("//button[@id='search-manufacturers']")
    }
    get dataTable(){
        return {
            // the whole table
            table: ()=>{
                return cy.xpath("//div[@class='dataTables_scroll']")
            },

            // returns all instances of td under the name field
            nameData: ()=>{
                return cy.xpath("//div[@class='dataTables_scrollBody']//table//tbody//tr//td[2]")
            },

            // returns all instances of td under the display order field
            displayOrderData: ()=>{
                return cy.xpath("//div[@class='dataTables_scrollBody']//table//tbody//tr//td[4]")
            }
        }
    }

    visit(){
        cy.xpath("//p[normalize-space()='Catalog']").click()
        cy.xpath("//p[normalize-space()='Manufacturers']").click()
        cy.url().should("eq", "https://admin-demo.nopcommerce.com/Admin/Manufacturer/List")
        return this
    }

    inputManufacturerName(_NAME){
        return this.manufacturerNameInput.clear().type(_NAME).should('have.value', _NAME)
    }
    clickSearchButton(){
        return this.searchButton.click()
    }
    
    assertDataInField(_EXPECTED_DATA, _FIELD="name"){
        switch(_FIELD){
            case "name":
                var _refField = this.dataTable.nameData()
                _refField.invoke('text').then(text=>{
                    expect(text.toLowerCase()).to.include(_EXPECTED_DATA)
                })
                break
            default:
                break
        }
    }

    assertHasResult(){
        return this.dataTable.nameData().should('have.length', 1)
    }
}

export default SearchManufacturerPage