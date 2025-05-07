describe("Mentee registration flow", () => {
  beforeEach(() => {
    // Access Link in Dekstop Mode
    cy.clearAllLocalStorage();
    cy.viewport(1280, 720);
    cy.navigateToRegistration();
  });

  it("Shows error for wrong email format", () => {
    cy.fillBasicInfoMenteeRegistration();
    cy.fixture('users').then((user) => {
      cy.get('#email').type(user.invalidData.invalidMail);
    });
    cy.get('.ant-form-item-explain-error')
      .should('be.visible')
      .should('has.text', 'Invalid email format');
    cy.get('.order-1').should('be.disabled');
  });

  it("Shows error for wrong phone number format", () => {
    cy.fillBasicInfoMenteeRegistration();
    cy.fixture('users').then((user) => {
      cy.get('#whatsapp').type(user.invalidData.invalidPhone);
    });
    cy.get('.ant-form-item-explain-error')
      .should('be.visible')
      .should('has.text', 'WA Number is not valid');
    cy.get('.order-1').should('be.disabled');
  });

  it("Shows error for wrong date format", () => {
    cy.fillBasicInfoMenteeRegistration();
    // Input valid phone number
    cy.fixture('users').then((user) => {
      cy.get('#whatsapp').type(user.validMentee.phone);
    });
    // Input valid email
    cy.fixture('users').then((user) => {
      cy.get('#email').type(user.validMentee.mail);
    });
    cy.clickContinueBtn();
    cy.url().should('include', '/onboarding?step=3');    
    // Make sure "Selanjutnya" button is disabled
    cy.get('.order-1').should('be.disabled');
    // Skip input cv
    cy.get('.mt-4').click();
    cy.clickContinueBtn();
    cy.url().should('include', '/onboarding?step=4');

    cy.fixture('users').then((user) => {
      cy.get('#startDate').type(user.invalidDate.startDate);
    });
    cy.get('.ant-form-item-explain-error').should('be.visible');
    cy.get('.order-1').should('be.disabled');
  });

  it("Shows error for short password", () => {
    cy.fillBasicInfoMenteeRegistration();
    // Input valid phone number
    cy.fixture('users').then((user) => {
      cy.get('#whatsapp').type(user.validMentee.phone);
    });
    // Input valid email
    cy.fixture('users').then((user) => {
      cy.get('#email').type(user.validMentee.mail);
    });
    cy.clickContinueBtn();
    cy.url().should('include', '/onboarding?step=3');    
    // Make sure "Selanjutnya" button is disabled
    cy.get('.order-1').should('be.disabled');
    // Skip input cv
    cy.get('.mt-4').click();
    cy.clickContinueBtn();
    cy.url().should('include', '/onboarding?step=4');

    // Input current exp
    cy.fillCurrentExpInfoMentee();
    cy.clickContinueBtn();
    cy.url().should('include', '/onboarding?step=5');
    // Input Mentee Specialization
    cy.addMenteeSpecialization();

    // Input Short Password
    cy.fixture('users').then((user) => {
      cy.get('#password').type(user.invalidData.shortPassword);
    });
    cy.get('.ant-form-item-explain-error')
      .should('be.visible')
      .should('has.text', 'Password must be at least 8 characters')
    cy.get('.order-1').should('be.disabled');
  });

  it("Shows error for different password in confirmation password", () => {
    cy.fillBasicInfoMenteeRegistration();
    // Input valid phone number
    cy.fixture('users').then((user) => {
      cy.get('#whatsapp').type(user.validMentee.phone);
    });
    // Input valid email
    cy.fixture('users').then((user) => {
      cy.get('#email').type(user.validMentee.mail);
    });
    cy.clickContinueBtn();
    cy.url().should('include', '/onboarding?step=3');    
    // Make sure "Selanjutnya" button is disabled
    cy.get('.order-1').should('be.disabled');
    // Skip input cv
    cy.get('.mt-4').click();
    cy.clickContinueBtn();
    cy.url().should('include', '/onboarding?step=4');

    // Input current exp
    cy.fillCurrentExpInfoMentee();
    cy.clickContinueBtn();
    cy.url().should('include', '/onboarding?step=5');
    // Input Mentee Specialization
    cy.addMenteeSpecialization();

    // Input Password
    cy.fixture('users').then((user) => {
      cy.get('#password').type(user.basicInfo.password);
    });
    // Input different password
    cy.fixture('users').then((user) => {
      cy.get('#passwordConfirmation').type(user.invalidData.invalidRePassword);
    });
    cy.get('.ant-form-item-explain-error')
      .should('be.visible')
      .should('has.text', 'Password must be same')
    cy.get('.order-1').should('be.disabled');
  });

  it("Succesfully register with valid info", () => {
    // Generate email dinamis
    const timestamp = Date.now();
    const dynamicEmail = `mentee_${timestamp}@gmail.com`;

    cy.fillBasicInfoMenteeRegistration();
    // Input valid phone number
    cy.fixture('users').then((user) => {
      cy.get('#whatsapp').type(user.validMentee.phone);
    });
    // Input valid email
    cy.fixture('users').then((user) => {
      cy.get('#email').type(dynamicEmail);
    });
    cy.clickContinueBtn();
    cy.url().should('include', '/onboarding?step=3');    
    // Make sure "Selanjutnya" button is disabled
    cy.get('.order-1').should('be.disabled');
    // Skip input cv
    cy.get('.mt-4').click();
    cy.clickContinueBtn();
    cy.url().should('include', '/onboarding?step=4');  
    // Input current exp
    cy.fillCurrentExpInfoMentee();
    cy.clickContinueBtn();
    cy.url().should('include', '/onboarding?step=5');
    // Input Mentee Specialization
    cy.addMenteeSpecialization();    
    // Input Valid Password
    cy.get('#dealls-onboarding-finish').should('be.disabled');
    cy.fixture('users').then((user) => {
      cy.get('#password').type(user.basicInfo.password);
    });
    cy.fixture('users').then((user) => {
      cy.get('#passwordConfirmation').type(user.basicInfo.rePassword);
    });
    cy.get('#checkPrivacyPolicy').click();
    cy.clickContinueBtn();
    cy.url().should('include', '/?welcome=true');
    // Should add step to remove currently registered account
  });
});
