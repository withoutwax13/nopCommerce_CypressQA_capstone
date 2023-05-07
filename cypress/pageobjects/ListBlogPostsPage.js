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

    assertGridHas(_EXPECTED_BLOG_DETAILS){
        this.blogPostGrild.table().should('contain', _EXPECTED_BLOG_DETAILS.title)
    }
}

export default ListBlogPostsPage