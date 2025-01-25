import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("UC1 - Oddanie głosu", async ({ page }) => {
  await page.getByRole("textbox", { name: "Login" }).fill("jan.kowalski");
  await page.getByRole("textbox", { name: "Hasło" }).fill("pass123");
  await page.getByRole("button", { name: "Zaloguj się", exact: true }).click();
  await page.getByRole("button", { name: "Głosuj teraz!" }).click();
  await page.locator("label").first().click();
  await page.getByRole("button", { name: "Dalej" }).click();
  await page.getByRole("button", { name: "Potwierdź" }).click();
});
