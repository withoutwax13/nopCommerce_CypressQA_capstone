const selectors = {
    "AddBlog": {
        titleInput: "//input[@id='Title']",
        bodyInputIframe: "#Body_ifr",
        overviewInput: "//textarea[@id='BodyOverview']",
        tagInput: ".tag-editor",
        startDateInput: "//input[@id='StartDateUtc']",
        endDateInput: "//input[@id='EndDateUtc']",
        startDateCalendar: "//span[@aria-controls='StartDateUtc_dateview']//span[@class='k-icon k-i-calendar']",
        endDateCalendar: "//span[@aria-controls='EndDateUtc_dateview']//span[@class='k-icon k-i-calendar']",
        startDateClock: "//span[@aria-controls='StartDateUtc_timeview']//span[@class='k-icon k-i-clock']",
        endDateClock: "//span[@aria-controls='EndDateUtc_timeview']//span[@class='k-icon k-i-clock']",
        storeListBox: "//div[@role='listbox']",
        saveButton: "//button[@name='save']",
        startDateCalendarPick: "//div[@class='k-animation-container'][1]//a[@data-value=",
        endDateCalendarPick: "//div[@class='k-animation-container'][2]//a[@data-value="
    },
    "Dashboard": {
        contentHeader: "div[class='content-header'] h1",
        footer: ".main-footer",
        configStepsCard: 'configuration-steps-card',
        newsBoxCard: 'nopcommerce-news-box',
        commonStatsCard: 'nopcommerce-common-statistics-card',
        orderStatsCard: 'order-statistics-card',
        customerStatsCard: 'customer-statistics-card',
        orderAverageReportCard: 'order-average-report-card',
        orderIncompleteOrderReportCard: 'order-incomplete-report-card',
        latestOrdersCard: 'order-incomplete-report-card',
        popularSearchTermsCard: 'popular-search-terms-card',
        bestsellersReportQuantityCard: 'bestsellers-report-quantity-card',
        bestsellersReportAmountCard: 'bestsellers-report-amount-card',
        getCardPattern: "//div[contains(@class, 'card-primary') and @id=",
        collapseButtonPattern: "//div[contains(@class, 'card-primary') and @id=",
        clickCollapseToggle: 'button[data-card-widget="collapse"]',
    },
    "ListBlog": {
        addButton: "//a[@class='btn btn-primary']",
        table: "//table[@id='blogpost-grid']",
        titleData: "//table[@id='blogpost-grid']//tbody//tr//td[1]",
        rowData: "//table[@id='blogpost-grid']//tbody//tr",
        startDateData: "//table[@id='blogpost-grid']//tbody//tr//td[4]",
        endDateData: "//table[@id='blogpost-grid']//tbody//tr//td[5]",
        contentManagement: "//p[normalize-space()='Content management']",
        blogPostItemLink: "//p[normalize-space()='Blog posts']"
    },
    "SearchManufacturer": {
        manufacturerNameInput: "//input[@id='SearchManufacturerName']",
        searchButton: "//button[@id='search-manufacturers']",
        table: "//div[@class='dataTables_scroll']",
        nameData: "//div[@class='dataTables_scrollBody']//table//tbody//tr//td[2]",
        displayOrderData: "//div[@class='dataTables_scrollBody']//table//tbody//tr//td[4]",
        importButton: "//button[@name='importexcel']",
        importModal: "//div[@id='importexcel-window']//div[@class='modal-content']",
        importModalTitle: "#importexcel-window-title",
        finalizeImportButton: "//div[@id='importexcel-window']//div[@class='modal-content']//form//button",
        importAlert: '.alert',
        catalog: "//p[normalize-space()='Catalog']",
        manufacturersItemLink: "//p[normalize-space()='Manufacturers']"
    },
    Login: {
        pageTitle: "div[class='page-title'] h1",
        contentTitle: "div[class='title'] strong",
        validationErrorMessage: ".validation-summary-errors",
        emailInput: "#Email",
        passwordInput: "#Password",
        emailInputLabel: "label[for='Email']",
        passwordInputLabel: "label[for='Password']",
        loginButton: "button[type='submit']",
        rememberMeChkBox: "#RememberMe",
        rememberMeChkBoxLabel: "label[for='RememberMe']"
    }
}

export default selectors