import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByRole("textbox", { name: "Login" }).click();
  await page.getByRole("textbox", { name: "Login" }).fill("admin");
  await page.getByRole("textbox", { name: "Login" }).press("Tab");
  await page.getByRole("textbox", { name: "Hasło" }).fill("admin123");
  await page.getByRole("button", { name: "Zaloguj się", exact: true }).click();
});

test("UC2 - Zarządzanie głosowaniem - dodawanie głosowania", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Zarządzaj głosowaniami" }).click();
  await page.getByRole("button", { name: "Dodaj głosowanie" }).click();
  await page.getByRole("textbox", { name: "Nazwa głosowania" }).click();
  await page
    .getByRole("textbox", { name: "Nazwa głosowania" })
    .fill("Głosowanie na Prezydenta 2026");
  await page
    .locator("div")
    .filter({ hasText: /^Dodaj głosowanieData rozpoczęciaData zakończenia$/ })
    .getByPlaceholder("Opis")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Dodaj głosowanieData rozpoczęciaData zakończenia$/ })
    .getByPlaceholder("Opis")
    .fill("To jest opis");
  await page
    .locator("div")
    .filter({ hasText: /^Data rozpoczęcia$/ })
    .locator('input[type="date"]')
    .fill("2025-01-26");
  await page
    .locator("div")
    .filter({ hasText: /^Data rozpoczęcia$/ })
    .locator('input[type="time"]')
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Data rozpoczęcia$/ })
    .locator('input[type="time"]')
    .press("ArrowLeft");
  await page
    .locator("div")
    .filter({ hasText: /^Data rozpoczęcia$/ })
    .locator('input[type="time"]')
    .press("ArrowLeft");
  await page
    .locator("div")
    .filter({ hasText: /^Data rozpoczęcia$/ })
    .locator('input[type="time"]')
    .fill("12:20");
  await page
    .locator("div")
    .filter({ hasText: /^Data zakończenia$/ })
    .locator('input[type="date"]')
    .fill("2025-01-31");
  await page
    .locator("div")
    .filter({ hasText: /^Data zakończenia$/ })
    .locator('input[type="time"]')
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Data zakończenia$/ })
    .locator('input[type="time"]')
    .press("ArrowLeft");
  await page
    .locator("div")
    .filter({ hasText: /^Data zakończenia$/ })
    .locator('input[type="time"]')
    .press("ArrowLeft");
  await page
    .locator("div")
    .filter({ hasText: /^Data zakończenia$/ })
    .locator('input[type="time"]')
    .press("ArrowRight");
  await page
    .locator("div")
    .filter({ hasText: /^Data zakończenia$/ })
    .locator('input[type="time"]')
    .fill("12:00");
  await page
    .getByRole("textbox", { name: "Imię i nazwisko kandydata" })
    .click();
  await page
    .getByRole("textbox", { name: "Imię i nazwisko kandydata" })
    .fill("Bartosz Gotowski");
  await page.getByRole("textbox", { name: "Opis" }).nth(1).click();
  await page
    .getByRole("textbox", { name: "Opis" })
    .nth(1)
    .fill("Super kandydat");
  await page.getByRole("button", { name: "Dodaj kandydata" }).click();
  await page
    .getByRole("textbox", { name: "Imię i nazwisko kandydata" })
    .nth(1)
    .click();
  await page
    .getByRole("textbox", { name: "Imię i nazwisko kandydata" })
    .nth(1)
    .fill("Dariusz Majnert");
  await page.getByRole("textbox", { name: "Opis" }).nth(2).click();
  await page
    .getByRole("textbox", { name: "Opis" })
    .nth(2)
    .fill("Jeszcze lepszy");
  await page.getByRole("button", { name: "Potwierdź" }).click();
  await page.getByRole("button", { name: "Potwierdź" }).first().click();
});

test("UC2 - Zarządzanie głosowaniem - usuwanie głosowania", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Zarządzaj głosowaniami" }).click();
  await page.getByRole("button", { name: "Usuń głosowanie" }).click();
  await page.getByText("Wybierz prezydenta na 2025").click();
  await page.getByRole("button", { name: "Usuń" }).click();
  await page.getByRole("button", { name: "Usuń" }).click();
});

test("UC2 - Zarządzanie głosowaniem - edytowanie głosowania", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Zarządzaj głosowaniami" }).click();
  await page.getByRole("button", { name: "Edytuj głosowanie" }).click();
  await page.getByText("Wybierz prezydenta na 2025").click();
  await page.getByRole("button", { name: "Edytuj" }).click();
  await page.getByRole("button").filter({ hasText: /^$/ }).first().click();
  await page.getByRole("button").filter({ hasText: /^$/ }).first().click();
  await page.getByRole("button", { name: "Zapisz zmiany" }).click();
  await page.getByRole("button", { name: "Potwierdź" }).click();
});
