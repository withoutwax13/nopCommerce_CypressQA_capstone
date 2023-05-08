// EditBlogPost_Scenario

// Import the necessary page objects
import EditBlogPostPage from "../../pageobjects/EditBlogPostPage"
import ListBlogPostsPage from "../../pageobjects/ListBlogPostsPage"
import LoginPage from "../../pageobjects/LoginPage"

describe("Senario: Edit Blog Post", ()=>{

    // Create instances of the page objects and define test data
    var EditBlogPostPageObject = new EditBlogPostPage(),
        ListBlogPostsObject = new ListBlogPostsPage(),
        blogPost_testData

    // Pre-Conditions
    // Admin already logged in
    // Admin already redirected to dashboard page
    beforeEach(()=>{

        // Create instance of LoginPage
        var LoginPageObject = new LoginPage()

        // Navigate to login page and log in using valid credentials
        LoginPageObject.visit()
        cy.fixture('appData').then((data)=>{
            cy.LoginAndVerify(
                LoginPageObject, 
                [
                    data.LoginPage.validCredentials.email,
                    data.LoginPage.validCredentials.password
                ], 
                // Verify that the user is redirected to the dashboard page after logging in
                ()=>cy.title().should('eq', data.DashboardPage.title).should('not.eq', data.LoginPage.title)
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

        EditBlogPostPageObject.visit() // Visit the edit blog post page

        // Edit the title, body, and tag of the blog post using the test data
        EditBlogPostPageObject.editTitle(blogPost_testData.title)
        EditBlogPostPageObject.editBody(blogPost_testData.body)
        EditBlogPostPageObject.editTag(blogPost_testData.tag)

        // Select the start and end dates using the date picker widget and the test data
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

        // Click the save button and verify that the blog post was edited successfully
        EditBlogPostPageObject.clickSaveButton()
        ListBlogPostsObject.assertSuccessAlert()
        ListBlogPostsObject.assertGridHas(blogPost_testData)
    })

})