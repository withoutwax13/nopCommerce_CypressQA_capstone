// EditBlogPost_Scenario.cy.js

import EditBlogPostPage from "../pageobjects/EditBlogPostPage"
import ListBlogPostsPage from "../pageobjects/ListBlogPostsPage"
import LoginPage from "../pageobjects/LoginPage"

describe("TS_07: Edting Blog Post", ()=>{

    var EditBlogPostPageObject = new EditBlogPostPage(),
        ListBlogPostsObject = new ListBlogPostsPage(),
        blogPost_testData

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
            blogPost_testData = data.AddBlogPostPage.testData[0]
        })
    })

    afterEach(()=>{
        cy.Logout()
    })
    
    it("TC_01: Verify working editting blog post feature with the date picker widget", ()=>{

        EditBlogPostPageObject.visit()
        EditBlogPostPageObject.editTitle(blogPost_testData.title)
        EditBlogPostPageObject.editBody(blogPost_testData.body)
        EditBlogPostPageObject.editTag(blogPost_testData.tag)
        EditBlogPostPageObject.selectStartDate().datePicker({
            mm: blogPost_testData.startDate.mm,
            dd: blogPost_testData.startDate.dd,
            yyyy: blogPost_testData.startDate.yyyy
        })
        EditBlogPostPageObject.selectEndDate().datePicker({
            mm: blogPost_testData.endDate.mm,
            dd: blogPost_testData.endDate.dd,
            yyyy: blogPost_testData.endDate.yyyy
        })
        EditBlogPostPageObject.clickSaveButton()
        ListBlogPostsObject.assertGridHas(blogPost_testData)

    })

})