// SearchManufacturer.js

class SearchManufacturerPage{

    // getters

    get manufacturerNameInput(){ return cy.xpath("//input[@id='SearchManufacturerName']") }
    get searchButton(){ return cy.xpath("//button[@id='search-manufacturers']") }
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
    get importButton(){ return cy.xpath("//button[@name='importexcel']") } 
    get importModal(){ return cy.xpath("//div[@id='importexcel-window']//div[@class='modal-content']") } 
    get importModalTitle(){ return cy.get("#importexcel-window-title") } 
    get finalizeImportButton(){ return cy.xpath("//div[@id='importexcel-window']//div[@class='modal-content']//form//button") } 
    get importAlert(){ return cy.get('.alert') }

    // methods

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

    clickImportButton(){
        return this.importButton.click()
    }
    
    assertDataInField(_EXPECTED_DATA, _FIELD="name"){
        switch(_FIELD){
            case "name":
                var _refField = this.dataTable.nameData()
                _refField.invoke('text').then(text=>{
                    expect(text).to.include(_EXPECTED_DATA)
                })
                break
            case "displayOrder":
                var _refField = this.dataTable.displayOrderData()
                _refField.invoke('text').then(text=>{
                    expect(text).to.include(_EXPECTED_DATA)
                })
                break
            default:
                break
        }
    }

    assertHasResult(){
        return this.dataTable.nameData().should('have.length.least', 1)
    }

    assertModalTitleMatch(_EXPECTED_TITLE){
        this.importModalTitle.invoke('text').then((text)=>{
            expect(text).to.include(_EXPECTED_TITLE)
        })
    }

    uploadSpreadsheet(_FILENAME){
        cy.fixture(_FILENAME, 'binary').then(Cypress.Blob.binaryStringToBlob)
        .then(fileContent => {
            cy.get("input[type='file']").attachFile({ fileContent, fileName: _FILENAME, mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', encoding:'utf8' })
        })
        this.finalizeImportButton.click()
    }

    verifyImportSucess(){
        this.importAlert.invoke('text').then(text=>{
            expect(text).to.include("Manufacturers have been imported successfully")
        })
    }

    verifyImportFailure(){
        this.importAlert.invoke('text').then(text=>{
            expect(text).to.not.include("Manufacturers have been imported successfully")
        })
    }
}

export default SearchManufacturerPage