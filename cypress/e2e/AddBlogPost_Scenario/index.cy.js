// AddBlogPost_Scenario

// Import page objects
import AddBlogPostPage from "../../pageobjects/AddBlogPostPage"
import ListBlogPostsPage from "../../pageobjects/ListBlogPostsPage"
import LoginPage from "../../pageobjects/LoginPage"

// Define the test scenario "Add Blog Post"
describe("Scenario: Add Blog Post", ()=>{

    // Initialize the page objects and test data variable
    var AddBlogPostPageObject = new AddBlogPostPage(),
        ListBlogPostsObject = new ListBlogPostsPage(),
        blogPosts_testData
    
    // Pre-Conditions
    // Admin already logged in
    // Admin already redirected to dashboard page
    beforeEach(()=>{

        // Initialize the login page object and visit the login page
        var LoginPageObject = new LoginPage()
        LoginPageObject.visit()
        
        // Retrieve the login credentials from fixture file
        cy.fixture('appData').then((data)=>{
            // Login using the retrieved credentials
            cy.LoginAndVerify(
                LoginPageObject, 
                [
                    data.LoginPage.validCredentials.email,
                    data.LoginPage.validCredentials.password
                ], 
                ()=>cy.title().should('eq', data.DashboardPage.title).should('not.eq', data.LoginPage.title)
            )
        })

    })

    // Define pre-test conditions, such as loading blog entry test data
    before(()=>{
        cy.fixture("appData").then(data=>{
            blogPosts_testData = data.AddBlogPostPage.testData
        })
    })

    // Define post-test conditions
    afterEach(()=>{
        cy.Logout()
    })

    it("TC_01: Verify working adding blog post entries feature with the date picker widget", ()=>{

        // For each test data, add a new blog post and verify success
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
            ListBlogPostsObject.assertSuccessAlert()
            ListBlogPostsObject.assertGridHas(blogPost)
            
        })

        
    })
})