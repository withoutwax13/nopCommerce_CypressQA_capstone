// DashboardPage.js

class DashboardPage{

    _getCard(locator){
        return cy.get(locator)
    }

    // getters

    get contentHeader(){
        return this._getCard("div[class='content-header'] h1")
    }

    get configStepsCard(){
        return this._getCard("#configuration-steps-card")
    }

    get newsBoxCard(){
        return this._getCard("#nopcommerce-news-box")
    }

    get commonStatsCard(){
        return this._getCard("#nopcommerce-common-statistics-card")
    }

    get orderStatsCard(){
        return this._getCard("#order-statistics-card")
    }

    get customerStatsCard(){
        return this._getCard("#customer-statistics-card")
    }

    get orderAverageReportCard(){
        return this._getCard("#order-average-report-card")
    }

    get orderIncompleteOrderReportCard(){
        return this._getCard("#order-incomplete-report-card")
    }

    get latestOrdersCard(){
        return this._getCard("#latest-orders-card")
    }

    get popularSearchTermsCard(){
        return this._getCard("#popular-search-terms-card")
    }

    get bestsellersReportQuantityCard(){
        return this._getCard("#bestsellers-report-quantity-card")
    }

    get bestsellersReportAmountCard(){
        return this._getCard("#bestsellers-report-amount-card")
    }

    get footer(){
        return this._getCard(".main-footer")
    }
}