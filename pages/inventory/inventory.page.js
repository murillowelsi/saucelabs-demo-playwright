import { expect } from "@playwright/test";
import { el } from "./inventory.elements";

class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async validatePageElements() {
    await expect(this.page.getByText("Products")).toBeVisible();
    await expect(this.page).toHaveURL(/.*inventory/);
  }

  async updateCart(action, item) {
    const actionPrefix = action === "add" ? "add-to-cart" : "remove";
    const selector = el.item
      .replace("action", actionPrefix)
      .replace("item", item);
    await this.page.locator(selector).click();
  }

  async removeItemFromCart(item) {
    await this.page.locator(el.item.replace("remove-item", item)).click();
  }

  async checkCartCounter(expectedCount) {
    await this.page.locator(el.shoppingCartBadge).isVisible();
    expect(expectedCount).toEqual("1");
  }

  async accessCartDetails() {
    await this.page.locator(el.shoppingCartBadge).click();
  }
}

export { InventoryPage };
