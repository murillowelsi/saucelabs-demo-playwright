import { expect } from "@playwright/test";

class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async validatePageElements() {
    await expect(this.page.getByText("Checkout: Your Information")).toBeVisible();
    await expect(this.page).toHaveURL(/.*checkout-step-one/);
  }
}

export { CheckoutPage };
