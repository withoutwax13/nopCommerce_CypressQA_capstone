// DashboardPage.js
// This class represents the dashboard page and follows the Page Object Model design pattern in Cypress.
// It contains getters to locate and interact with the content header and footer of the dashboard page, as well as getters 
// to access specific dashboard cards, such as the configuration steps card, nopcommerce news box card, and customer statistics card.
// Additionally, it provides methods to retrieve all cards, collapsed cards, and expanded cards, to find the content body of a card, and to click the collapse toggle button of a card.
// Overall, this class encapsulates the behavior and elements of the dashboard page, making it easier to maintain and reuse in tests.

class DashboardPage{

    // getters

    get contentHeader(){
        return cy.get("div[class='content-header'] h1")
    }

    get footer(){
        return cy.get(".main-footer")
    }

    // get specific dashboard cards

    get configStepsCard(){return this._wrapCard('configuration-steps-card')}
    get newsBoxCard(){return this._wrapCard('nopcommerce-news-box')}
    get commonStatsCard(){return this._wrapCard('nopcommerce-common-statistics-card')}
    get orderStatsCard(){return this._wrapCard('order-statistics-card')}
    get customerStatsCard(){return this._wrapCard('customer-statistics-card')}
    get orderAverageReportCard(){return this._wrapCard('order-average-report-card')}
    get orderIncompleteOrderReportCard(){return this._wrapCard('order-incomplete-report-card')}
    get latestOrdersCard(){return this._wrapCard('order-incomplete-report-card')}
    get popularSearchTermsCard(){return this._wrapCard('popular-search-terms-card')}
    get bestsellersReportQuantityCard(){return this._wrapCard('bestsellers-report-quantity-card')}
    get bestsellersReportAmountCard(){return this._wrapCard('bestsellers-report-amount-card')}

    // methods

    _getCard(locator){
        return cy.xpath(`//div[contains(@class, 'card-primary') and @id='${locator}']`)
    }

    _getCollapseButton(locator){
        return cy.xpath(`//div[contains(@class, 'card-primary') and @id='${locator}']//button[@data-card-widget="collapse"]`)
    }

    _wrapCard(id){
        return {
            getCard: ()=>this._getCard(id),
            getCollapseButton: ()=>this._getCollapseButton(id)
        }
    }

    getAllCards(){
        return cy.get(".card-primary")
    }

    getAllCollapsedCards(){
        return this.getAllCards().filter((index, card)=>{
            return Cypress.$(card).hasClass('collapsed-card')
        })
    }

    getAllExpandedCards(){
        return this.getAllCards().not('.collapsed-card')
    }
    
    findContentBody(card){
        return cy.wrap(card).find('.card-body')
    }

    clickCollapseToggle(card){
        return cy.wrap(card).find('button[data-card-widget="collapse"]').click()
    }
    
}

export default DashboardPage