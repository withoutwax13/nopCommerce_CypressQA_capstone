// ListBlogPostsPage.js
import selectors from "../fixtures/selectors"

class ListBlogPostsPage{

    // getters

    get addButton(){ return cy.xpath(selectors.ListBlog.addButton) }
    get blogPostGrild(){
        return {
            table: ()=>{ 
                return cy.xpath(selectors.ListBlog.table) 
            },
            titleData: ()=>{ 
                return cy.xpath(selectors.ListBlog.titleData) 
            },
            rowData: ()=>{ 
                return cy.xpath(selectors.ListBlog.rowData) 
            },
            startDateData: ()=>{ 
                return cy.xpath(selectors.ListBlog.startDateData) 
            },
            endDateData: ()=>{ 
                return cy.xpath(selectors.ListBlog.endDateData) 
            }
        }
    }

    get alertMessage(){
        return cy.get('.alert.alert-success.alert-dismissable')
    }

    // methods

    visit(){
        cy.fixture('appData').then(data=>{
            cy.visit(data.DashboardPage.url)
        })
        cy.xpath(selectors.ListBlog.contentManagement).click()
        cy.xpath(selectors.ListBlog.blogPostItemLink).click()
        cy.fixture('appData').then(data=>{
            cy.url().should('eq', data.ListBlogPostsPage.url)
        })
    }

    clickAddButton(){
        return this.addButton.click()
    }

    // assert positive modal
    assertSuccessAlert(){
        this.alertMessage.should('contain', 'The new blog post has been added successfully.')
    }

    // assert grid has the value of the title, startDate and startTime of the expected parameter
    assertGridHas(_EXPECTED_BLOG_DETAILS, notDefaultTime=false){
        const  {startDate, startTime, title } = _EXPECTED_BLOG_DETAILS
        this.blogPostGrild.table().should('contain', title)
        this.blogPostGrild.table()
            .should('contain', 
                `${startDate.mm > 9 ?
                    startDate.mm : 
                    `0${startDate.mm}`}/${startDate.dd > 9 ?
                    startDate.dd : 
                    `0${startDate.dd}`}/${startDate.yyyy} ${notDefaultTime ?
                    `${startTime.hr > 9 ? 
                    startTime.hr : 
                    `0${startTime.hr}`}:${startTime.min > 9 ? 
                    startTime.min : 
                    `0${startTime.min}`}:00 ${startTime.hr > 11 ? `PM` : `AM`}` : `12:00:00 AM`}`
            )
    }
}

export default ListBlogPostsPage