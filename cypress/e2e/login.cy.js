describe('Mentee Login Flow', () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
    cy.viewport(1280, 720);
    cy.navigateToLogin();
  });

  it('Show error while input no email and password', () => {
    cy.get('.border-none').click();
    cy.get('#basic_email_help > .ant-form-item-explain-error')
      .should('be.visible')
      .should('have.text', "Missing email");
    cy.get('#basic_password_help > .ant-form-item-explain-error')
      .should('be.visible')
      .should('have.text', "Missing password");
  });
  it('Show error while input unregistered email', () => {
    cy.fixture('users').then((user) => {
      cy.get('#basic_email').type(user.dummyAccount.email);
    });
    cy.fixture('users').then((user) => {
      cy.get('#basic_password').type(user.dummyAccount.password);
    });
    // Click Login Button
    cy.get('.border-none').click();

    // Show Error Notification
    cy.get('.ant-message-notice-content')
      .should('be.exist');
  });
})