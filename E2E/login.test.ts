import { Selector } from "testcafe";

fixture`Group of tests / Test suite - Login Suite`.page`./`;

// Test for valid login
test("Valid login", async (t: TestController) => {
    // Perform login with valid credentials
    await t
      .typeText("#user-name", "standard_user")
      .typeText('input[placeholder="Password"]', "secret_sauce")
      .click("#login-button")
      // Verify that the login is successful by checking for the presence of the "Username" title
      .expect(Selector("span.title").innerText)
      .eql("Username");
  });
  
  // Test for invalid login
  test("Invalid login", async (t: TestController) => {
    // Perform login with invalid credentials
    await t
      .typeText("#user-name", "incorrectUsername")
      .typeText('input[placeholder="Password"]', "incorrectPassword")
      .click("#login-button")
      // Verify that the appropriate error message is displayed for invalid login
      .expect(Selector(`h3[data-test="error"]`).innerText)
      .eql(
        "Username and password do not match any user in this service"
      );
  });
