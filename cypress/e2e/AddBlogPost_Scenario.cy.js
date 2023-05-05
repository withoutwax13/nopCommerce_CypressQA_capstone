// AddBlogPost_Scenario.cy.js

import AddBlogPostPage from "../pageobjects/AddBlogPostPage"
import ListBlogPostsPage from "../pageobjects/ListBlogPostsPage"
import LoginPage from "../pageobjects/LoginPage"

describe("TS_06: Adding Blog Posts", ()=>{

    var AddBlogPostPageObject = new AddBlogPostPage(),
        ListBlogPostsObject = new ListBlogPostsPage(),
        blogPosts_testData
    
    // Pre-Conditions
    // Admin already logged in
    // Admin already redirected to dashboard page
    beforeEach(()=>{

        var LoginPageObject = new LoginPage()
        LoginPageObject.visit()
        
        cy.fixture('appData').then((data)=>{
            cy.LoginAndVerify(
                LoginPageObject, 
                [
                    data.LoginPage.validCredentials.email, 
                    data.LoginPage.validCredentials.password
                ], 
                ()=>{
                    cy.url().should('eq', data.DashboardPage.url)
                }
            )
        })

    })

    before(()=>{
        cy.fixture("appData").then(data=>{
            blogPosts_testData = data.AddBlogPostPage.testData
        })
    })

    afterEach(()=>{
        cy.Logout()
    })

    it("TC_01: Verify working adding blog post entries feature with the date picker widget", ()=>{

        blogPosts_testData.forEach(blogPost=>{
            AddBlogPostPageObject.visit()
            AddBlogPostPageObject.enterTitle(blogPost.title)
            AddBlogPostPageObject.enterBody(blogPost.body)
            AddBlogPostPageObject.enterTag(blogPost.tag)
            AddBlogPostPageObject.selectStartDate().datePicker({
                mm: blogPost.startDate.mm,
                dd: blogPost.startDate.dd,
                yyyy: blogPost.startDate.yyyy
            })
            AddBlogPostPageObject.selectEndDate().datePicker({
                mm: blogPost.endDate.mm,
                dd: blogPost.endDate.dd,
                yyyy: blogPost.endDate.yyyy
            })
            AddBlogPostPageObject.clickSaveButton()
            ListBlogPostsObject.assertGridHas(blogPost)
            
        })

        
    })
})