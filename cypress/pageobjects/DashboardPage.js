// DashboardPage.js
// This class represents the dashboard page and follows the Page Object Model design pattern in Cypress.
// It contains getters to locate and interact with the content header and footer of the dashboard page, as well as getters 
// to access specific dashboard cards, such as the configuration steps card, nopcommerce news box card, and customer statistics card.
// Additionally, it provides methods to retrieve all cards, collapsed cards, and expanded cards, to find the content body of a card, and to click the collapse toggle button of a card.
// Overall, this class encapsulates the behavior and elements of the dashboard page, making it easier to maintain and reuse in tests.

import selectors from "../fixtures/selectors"

class DashboardPage{

    // getters

    get contentHeader(){ return cy.get(selectors.Dashboard.contentHeader) }
    get footer(){ return cy.get(selectors.Dashboard.footer) }
    get configStepsCard(){ return this._wrapCard(selectors.Dashboard.configStepsCard) }
    get newsBoxCard(){ return this._wrapCard(selectors.Dashboard.newsBoxCard) }
    get commonStatsCard(){ return this._wrapCard(selectors.Dashboard.commonStatsCard) }
    get orderStatsCard(){ return this._wrapCard(selectors.Dashboard.orderStatsCard) }
    get customerStatsCard(){ return this._wrapCard(selectors.Dashboard.customerStatsCard) }
    get orderAverageReportCard(){ return this._wrapCard(selectors.Dashboard.orderAverageReportCard) }
    get orderIncompleteOrderReportCard(){ return this._wrapCard(selectors.Dashboard.orderIncompleteOrderReportCard) }
    get latestOrdersCard(){ return this._wrapCard(selectors.Dashboard.latestOrdersCard) }
    get popularSearchTermsCard(){ return this._wrapCard(selectors.Dashboard.popularSearchTermsCard) }
    get bestsellersReportQuantityCard(){ return this._wrapCard(selectors.Dashboard.bestsellersReportQuantityCard) }
    get bestsellersReportAmountCard(){ return this._wrapCard(selectors.Dashboard.bestsellersReportAmountCard) }

    // methods

    _getCard(locator){
        return cy.xpath(`${selectors.Dashboard.getCardPattern}'${locator}']`)
    }

    _getCollapseButton(locator){
        return cy.xpath(`${selectors.Dashboard.collapseButtonPattern}'${locator}']//button[@data-card-widget="collapse"]//i`)
    }

    _wrapCard(id){
        return {
            getCard: ()=>this._getCard(id),
            getCollapseButton: ()=>this._getCollapseButton(id)
        }
    }

    getAllCards(){
        return cy.get(".card-primary").should('exist')
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
        return cy.wrap(card).find(selectors.Dashboard.clickCollapseToggle).click()
    }
    
}

export default DashboardPage