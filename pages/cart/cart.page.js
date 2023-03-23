import { expect } from "@playwright/test";
import { el } from "./cart.elements";

class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async validatePageElements() {
    await expect(this.page.getByText("Your Cart")).toBeVisible();
    await expect(this.page).toHaveURL(/.*cart/);

    const cartContainer = this.page.locator('#cart_contents_container');
    const containerText = await cartContainer.innerText();
    expect(containerText).toContain('QTY');
  }

  async updateCart(action, item) {
    const actionPrefix = action === "add" ? "add-to-cart" : "remove";
    const selector = el.item
      .replace("action", actionPrefix)
      .replace("item", item);
    await this.page.locator(selector).click();
  }

  async checkoutCart() {
    await this.page.locator('[data-test="checkout"]').click()
  }
}

export { CartPage };
