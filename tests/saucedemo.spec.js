// @ts-check
import { test } from "@playwright/test";
import { standard_user } from "../fixtures/users";
import { CartPage } from "../pages/cart/cart.page";
import { CheckoutPage } from "../pages/checkout/checkout.page";
import { InventoryPage } from "../pages/inventory/inventory.page";
import { LoginPage } from "../pages/login/login.page";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.doLogin(standard_user);
});

test.describe("Inventory Page", () => {
  test("should add an item to the cart", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.validatePageElements();
    await inventoryPage.updateCart("add", "labs-backpack");
    await inventoryPage.checkCartCounter("1");
    await inventoryPage.accessCartDetails();
    await cartPage.validatePageElements()
    await cartPage.checkoutCart()
    await checkoutPage.validatePageElements();
  });
});
