const { expect } = require('@playwright/test');
import { el } from './login.elements';

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async doLogin(standard_user) {
    const username = this.page.locator(el.frmUsername);
    const password = this.page.locator(el.frmPassword);
    const loginButton = this.page.locator(el.btnLogin);  
  
    await username.fill(standard_user.username);
    await password.fill(standard_user.password);
    await loginButton.click();
  
    await expect(this.page.getByText('Products')).toBeVisible();
    await expect(this.page).toHaveURL(/.*inventory/);
  }
}

export { LoginPage };
