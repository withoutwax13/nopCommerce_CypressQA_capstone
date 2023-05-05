// ListBlogPostsPage.js
class ListBlogPostsPage{

    // getters

    get addButton(){ return cy.xpath("//a[@class='btn btn-primary']") }
    get blogPostGrild(){
        return {
            table: ()=>{ 
                return cy.xpath("//table[@id='blogpost-grid']") 
            },
            titleData: ()=>{ 
                return cy.xpath("//table[@id='blogpost-grid']//tbody//tr//td[1]") 
            },
            rowData: ()=>{ 
                return cy.xpath("//table[@id='blogpost-grid']//tbody//tr") 
            },
            startDateData: ()=>{ 
                return cy.xpath("//table[@id='blogpost-grid']//tbody//tr//td[4]") 
            },
            endDateData: ()=>{ 
                return cy.xpath("//table[@id='blogpost-grid']//tbody//tr//td[5]") 
            }
        }
    }

    // methods

    visit(){
        cy.visit("https://admin-demo.nopcommerce.com/Admin")
        cy.xpath("//p[normalize-space()='Content management']").click()
        cy.xpath("//p[normalize-space()='Blog posts']").click()
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