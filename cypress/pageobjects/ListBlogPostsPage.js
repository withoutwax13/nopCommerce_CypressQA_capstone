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

    assertSuccessAlert(){
        this.alertMessage.should('contain', 'The new blog post has been added successfully.')
    }

    assertGridHas(_EXPECTED_BLOG_DETAILS, notDefaultTime=false){
        this.blogPostGrild.table().should('contain', _EXPECTED_BLOG_DETAILS.title)
        this.blogPostGrild.table()
            .should('contain', `${_EXPECTED_BLOG_DETAILS.startDate.mm > 9 ? _EXPECTED_BLOG_DETAILS.startDate.mm : `0${_EXPECTED_BLOG_DETAILS.startDate.mm}`}/${_EXPECTED_BLOG_DETAILS.startDate.dd > 9 ? _EXPECTED_BLOG_DETAILS.startDate.dd : `0${_EXPECTED_BLOG_DETAILS.startDate.dd}`}/${_EXPECTED_BLOG_DETAILS.startDate.yyyy} ${notDefaultTime ? `${_EXPECTED_BLOG_DETAILS.startTime.hr > 9 ? _EXPECTED_BLOG_DETAILS.startTime.hr : `0${_EXPECTED_BLOG_DETAILS.startTime.hr}`}:${_EXPECTED_BLOG_DETAILS.startTime.min > 9 ? _EXPECTED_BLOG_DETAILS.startTime.min : `0${_EXPECTED_BLOG_DETAILS.startTime.min}`}:00 ${_EXPECTED_BLOG_DETAILS.startTime.hr > 11 ? `PM` : `AM`}` : `12:00:00 AM`}`)
    }
}

export default ListBlogPostsPage