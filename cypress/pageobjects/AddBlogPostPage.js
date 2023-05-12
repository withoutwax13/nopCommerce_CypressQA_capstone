// AddBlogPostPage.js
import ListBlogPostsPage from "./ListBlogPostsPage"
import selectors from "../fixtures/selectors"

class AddBlogPostPage{

    // getters

    get titleInput(){ return cy.xpath(selectors.AddBlog.titleInput) } // getter for the title input field
    get bodyInput(){ return cy.iframe_plugin_handler(selectors.AddBlog.bodyInputIframe) } // getter for the body input field inside an iframe
    get overviewInput(){ return cy.xpath(selectors.AddBlog.overviewInput) } // getter for the overview input field
    get tagInput(){ return cy.get(selectors.AddBlog.tagInput) } // getter for the tag input field
    get startDateInput(){ return cy.xpath(selectors.AddBlog.startDateInput) } // getter for the start date input field
    get endDateInput(){ return cy.xpath(selectors.AddBlog.endDateInput) } // getter for the end date input field
    get startDateCalendar(){ return cy.xpath(selectors.AddBlog.startDateCalendar) } // getter for the start date calendar toggle
    get endDateCalendar(){ return cy.xpath(selectors.AddBlog.endDateCalendar) } // getter for the end date calendar toggle
    get startDateClock(){ return cy.xpath(selectors.AddBlog.startDateClock) } // getter for the start date clock toggle
    get endDateClock(){ return cy.xpath(selectors.AddBlog.endDateClock) } // getter for the end date clock toggle
    get storeListBox(){ return cy.xpath(selectors.AddBlog.storeListBox) } // getter for the store list box
    get saveButton(){ return cy.xpath(selectors.AddBlog.saveButton) } // getter for the save button



    // methods

    // method to visit the Add Blog Post page
    visit(){
        var ListBlogPageObject = new ListBlogPostsPage() // creating an instance of the ListBlogPostsPage module
        ListBlogPageObject.visit() // visiting the List Blog Posts page
        ListBlogPageObject.clickAddButton() // clicking on the Add button
        cy.fixture('appData').then(data=>{
            cy.url().should('eq', data.AddBlogPostPage.url) // accessing appData fixture data and verifying the URL of the Add Blog Post page
        })
    }

    // method to enter title data in the input field
    enterTitle(titleData){
        return this.titleInput.clear().type(titleData).should('have.value', titleData)
    }
    
    // method to enter body data in the input field inside the iframe
    enterBody(bodyData){
        return this.bodyInput.clear().type(bodyData)
    }

    // method to enter overview data in the input field
    enterOverview(overviewData){
        return this.overviewInput.clear().type(overviewData).should('have.value', titleData)
    }

    // method to enter tag data in the input field
    enterTag(tagData){
        tagData.forEach(tag => {
            this.tagInput.type(`${tag}{enter}`) // typing each tag and pressing Enter key
        });
        this.tagInput.children().should('have.length', tagData.length + 2) // verifying the number of tags entered
        return this
    }

    // The selectStartDate and selectEndDate methods allow for selection of a date for the start and end date fields, respectively. 
    // The methods return an object with two properties, inputField and datePicker, which respectively handle inputting the date 
    // in the input field and selecting the date from the date picker. The date picker selection involves clicking on a calendar and 
    // then a specific date on that calendar, and then verifying that the input field reflects the selected date.

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

    // method to click the save button

    clickSaveButton(){
        this.saveButton.click()
    }
    
}

export default AddBlogPostPage