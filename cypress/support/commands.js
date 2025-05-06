import '@testing-library/cypress/add-commands'

// Custom command to navigate to link and click registration button
Cypress.Commands.add('navigateToRegistration', () => {
    cy.visit("https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring");

    // Click Register Button
    cy.get("#dealls-navbar-register-btn").click();
    cy.url().should('include', '/sign-up');
});

// Custom command to navigate to link and click login button
Cypress.Commands.add('navigateToLogin', () => {
    cy.visit("https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring");

    // Click Register Button
    cy.get("#dealls-navbar-login-btn").click();
    cy.url().should('include', '/sign-in?');
});

// Custom command to fill basic info mentee in registration
Cypress.Commands.add('fillBasicInfoMenteeRegistration', () => {
    // Click Sign-Up with Email Mentee
    cy.get(":nth-child(1) > .mt-auto > .text-white").click();

    cy.url().should('include', '/onboarding');

    // Make sure "Selanjutnya" button is disabled
    cy.get('.order-1').should('be.disabled');

    // Insert Name
    cy.fixture('users').then((user) => {
        cy.get('#fullName').type(user.basicInfo.fullName);
    });

    cy.clickContinueBtn();

    cy.url().should('include', '/onboarding?step=2');

    // Make sure "Selanjutnya" button is disabled
    cy.get('.order-1').should('be.disabled');

    // Fill Job Seeking Status
    cy.get('#jobSearchStatus').click();
    cy.get('.ant-select-item-option-active > .ant-select-item-option-content > .px-4').click();

    // Input education
    cy.fixture('users').then((user) => {
        cy.get('#campus').type(user.basicInfo.education);
    });
    cy.get('.ant-select-dropdown > div > .flex').click();

    // Input exp level
    cy.get('#eligibility').click();
    cy.get('[title="Freshgrad"] > .ant-select-item-option-content').click();
});

Cypress.Commands.add('clickContinueBtn', () => {
    // Click "Selanjutnya" button
    cy.get('.order-1').should('not.be.disabled').click();
});

// Custom command to fill current experience info mentee
Cypress.Commands.add('fillCurrentExpInfoMentee', () => {
    cy.get('.order-1').should('be.disabled');
    cy.fixture('users').then((user) => {
        cy.get('#companyName').type(user.currentExp.companyName);
    });
    cy.get('.ant-select-dropdown > div > .flex').click();
    cy.get('#roleLevel').click();
    cy.get('[title="Intern"] > .ant-select-item-option-content').click();
    cy.fixture('users').then((user) => {
        cy.get('#roleName').type(user.currentExp.roleName);
    });
    cy.get('.ant-select-dropdown > div > .flex').click();
    cy.fixture('users').then((user) => {
        cy.get('#startDate').type(user.validDate.startDate);
    });
    cy.fixture('users').then((user) => {
        cy.get('#endDate').type(user.validDate.endDate);
    });
    cy.clickContinueBtn();
});

// Custom command to add mentee specialization
Cypress.Commands.add('addMenteeSpecialization', () => {
    cy.get('.relative > .ant-select > .ant-select-selector').click();
    cy.get('[title="IT & Engineering"] > .ant-select-item-option-content').click();
    cy.get(':nth-child(1) > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').click();
    cy.clickContinueBtn();
    cy.url().should('include', '/onboarding?step=6');
});