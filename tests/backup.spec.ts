import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("UC2 - Tworzenie kopii zapasowej", async ({ page }) => {
  await page.getByRole("textbox", { name: "Login" }).click();
  await page.getByRole("textbox", { name: "Login" }).fill("admin");
  await page.getByRole("textbox", { name: "Login" }).press("Tab");
  await page.getByRole("textbox", { name: "Hasło" }).fill("admin123");
  await page.getByRole("button", { name: "Zaloguj się", exact: true }).click();
  await page.getByRole("button", { name: "Kopie zapasowe" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Pełna$/ })
    .click();
  await page.getByText("Pełna").click();
  await page.getByRole("button", { name: "Utwórz kopię zapasową" }).click();

  await page.getByRole("button", { name: "Powrót do konfiguracji" }).click();
});
