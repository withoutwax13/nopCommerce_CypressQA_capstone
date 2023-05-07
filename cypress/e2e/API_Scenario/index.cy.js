describe("Scenario: Github Public REST API", ()=>{

    var repositoryName = `dummy${Math.random().toString(5).substring(2)}`, githubAuthToken = process.env.GITHUB_PERSONAL_TOKEN, country = "Philippines"

    it("TC_01: Create a repository for the authenticated user", ()=>{
        cy.request({
            method: 'POST',
            url: 'https://api.github.com/user/repos',
            body: {
                name: repositoryName,
            },
            headers: {
                Authorization: `Bearer ${githubAuthToken}`
                
            }
        }).then(response=>{
            expect(response.status).to.equal(201)
            expect(response.body.name).to.equal(repositoryName)
        })
    })

    it("TC_02: List repositories for the authenticated user", ()=>{
        cy.request({
            method: "GET",
            url: 'https://api.github.com/user/repos',
            headers: {
                Authorization: `Bearer ${githubAuthToken}`
            }
        }).then(response=>{
            expect(response.status).to.equal(200)
        })
    })
    it("TC_03: List university as per Country", ()=>{
        cy.request('GET', `http://universities.hipolabs.com/search?country=${country}`)
            .its('status').should('eq', 200)
    })
})