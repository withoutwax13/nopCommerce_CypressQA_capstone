// AddBlogPostPage.js
import ListBlogPostsPage from "./ListBlogPostsPage"
import selectors from "../fixtures/selectors"

class AddBlogPostPage{

    // getters

    get titleInput(){ return cy.xpath(selectors.AddBlog.titleInput) }
    get bodyInput(){ return cy.iframe_plugin_handler(selectors.AddBlog.bodyInputIframe) }
    get overviewInput(){ return cy.xpath(selectors.AddBlog.overviewInput) }
    get tagInput(){ return cy.get(selectors.AddBlog.tagInput) }
    get startDateInput(){ return cy.xpath(selectors.AddBlog.startDateInput) }
    get endDateInput(){ return cy.xpath(selectors.AddBlog.endDateInput) }
    get startDateCalendar(){ return cy.xpath(selectors.AddBlog.startDateCalendar) }
    get endDateCalendar(){ return cy.xpath(selectors.AddBlog.endDateCalendar) }
    get startDateClock(){ return cy.xpath(selectors.AddBlog.startDateClock) }
    get endDateClock(){ return cy.xpath(selectors.AddBlog.endDateClock) }
    get storeListBox(){ return cy.xpath(selectors.AddBlog.storeListBox) }
    get saveButton(){ return cy.xpath(selectors.AddBlog.saveButton) }

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
                cy.xpath(`${selectors.AddBlog.startDateCalendarPick}'${yyyy}/${mm-1}/${dd}']`).should('exist').click({force:true})
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
                cy.xpath(`${selectors.AddBlog.endDateCalendarPick}'${yyyy}/${mm-1}/${dd}']`).should('exist').click({force:true})
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