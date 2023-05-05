// AddBlogPostPage.js
import ListBlogPostsPage from "./ListBlogPostsPage"

class AddBlogPostPage{

    // getters

    get titleInput(){ return cy.xpath("//input[@id='Title']") }
    get bodyInput(){ return cy.iframe_plugin_handler("#Body_ifr") }
    get overviewInput(){ return cy.xpath("//textarea[@id='BodyOverview']") }
    get tagInput(){ return cy.get('.tag-editor') }
    get startDateInput(){ return cy.xpath("//input[@id='StartDateUtc']") }
    get endDateInput(){ return cy.xpath("//input[@id='EndDateUtc']") }
    get startDateCalendar(){ return cy.xpath("//span[@aria-controls='StartDateUtc_dateview']//span[@class='k-icon k-i-calendar']") }
    get endDateCalendar(){ return cy.xpath("//span[@aria-controls='EndDateUtc_dateview']//span[@class='k-icon k-i-calendar']") }
    get startDateClock(){ return cy.xpath("//span[@aria-controls='StartDateUtc_timeview']//span[@class='k-icon k-i-clock']") }
    get endDateClock(){ return cy.xpath("//span[@aria-controls='EndDateUtc_timeview']//span[@class='k-icon k-i-clock']") }
    get storeListBox(){ return cy.xpath("//div[@role='listbox']") }
    get saveButton(){ return cy.xpath("//button[@name='save']") }

    // methods

    visit(){
        var ListBlogPageObject = new ListBlogPostsPage()
        ListBlogPageObject.visit()
        ListBlogPageObject.clickAddButton()
        cy.fixture('appData').then(data=>{
            cy.url().should('eq', data.AddBlogPostPage.url)
        })
    }

    enterTitle(titleData){
        return this.titleInput.clear().type(titleData)
    }
    
    enterBody(bodyData){
        return this.bodyInput.clear().type(bodyData)
    }

    enterOverview(overviewData){
        return this.overviewInput.clear().type(overviewData)
    }

    enterTag(tagData){
        tagData.forEach(tag => {
            this.tagInput.type(`${tag}{enter}`)
        });
        return this
    }

    selectStartDate(){
        return {
            inputField: ({mm, dd, yyyy})=> {
                return this.startDateInput.clear().type(`${mm}/${dd}/${yyyy}`).should('have.value', `${mm}/${dd}/${yyyy}`)
            },
            datePicker: ({mm, dd, yyyy})=>{
                this.startDateCalendar.click()
                cy.xpath(`//div[@class='k-animation-container'][1]//a[@data-value='${yyyy}/${mm-1}/${dd}']`).should('exist').click({force:true})
                this.startDateInput.invoke('val').then(val=>{
                    expect(val).to.include(`${mm}/${dd}/${yyyy}`)
                })
                return this
            }
        }
    }

    selectEndDate(){
        return {
            inputField: ({mm, dd, yyyy})=> {
                return this.endDateInput.clear().type(`${mm}/${dd}/${yyyy}`).should('have.value', `${mm}/${dd}/${yyyy}`)
            },
            datePicker: ({mm, dd, yyyy})=>{
                this.endDateCalendar.click()
                cy.xpath(`//div[@class='k-animation-container'][2]//a[@data-value='${yyyy}/${mm-1}/${dd}']`).should('exist').click({force:true})
                this.endDateInput.invoke('val').then(val=>{
                    expect(val).to.include(`${mm}/${dd}/${yyyy}`)
                })
                return this
            }
        }
    }

    clickSaveButton(){
        this.saveButton.click()
    }
    
}

export default AddBlogPostPage