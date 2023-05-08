describe("Scenario: Github and Hipolabs Public REST API", ()=>{

    var repositoryName = `dummy${Math.random().toString(5).substring(2)}`, // random repository name
        githubAuthToken = Cypress.env('GITHUB_PERSONAL_TOKEN'), // get auth token from cypress environment
        country = "Philippines" // test data

    it("TC_01: Verify working 'Create a repository for the authenticated user' POST API feature", ()=>{
        cy.request({
            method: 'POST',
            url: 'https://api.github.com/user/repos',
            body: {
                name: repositoryName,
            },
            headers: {
                Authorization: `Bearer ${githubAuthToken}`,
                "Content-Type": "application/json"
                
            }
        }).then(response=>{
            expect(response.status).to.equal(201) // assert successful response
            expect(response.duration).to.be.lessThan(2001) // assert response time less than or equal to 2000ms
            expect(response.headers['content-type']).to.equal('application/json; charset=utf-8') // assert response file type is json
            expect(response.body.name).to.equal(repositoryName) // assert repo name as correct repo name reflected in server
        })
    })

    it("TC_02: Verify working 'List repositories for the authenticated user' GET API feature", ()=>{
        cy.request({
            method: "GET",
            url: 'https://api.github.com/user/repos',
            headers: {
                Authorization: `Bearer ${githubAuthToken}`,
                "Content-Type": "application/json"
            }
        }).then(response=>{
            expect(response.status).to.equal(200) // assert successful response
            expect(response.duration).to.be.lessThan(2001) // assert response time less than or equal to 2000ms
            expect(response.headers['content-type']).to.equal('application/json; charset=utf-8') // assert response file type is json
            expect(response.body.filter(repoItem=>repoItem.name === repositoryName).length).to.equal(1)
            // assert response body has an item with the same repo name created in test case 1
        })
    })
    it("TC_03: Verify working 'List university as per Country' GET API feature", ()=>{
        cy.request('GET', `http://universities.hipolabs.com/search?country=${country}`)
            .then(response=>{
                expect(response.status).to.eq(200) // assert successful response
                expect(response.duration).to.be.lessThan(2001) // assert response time less than or equal to 2000ms
                expect(response.headers['content-type']).to.equal('application/json') // assert response file type is json
                expect(response.body.filter(univItem=>univItem.country !== 'Philippines').length).to.equal(0)
                // assert ALL response body's items have Philippines as value to country property
            })
    })
})