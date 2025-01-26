import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("UC6 - Tworzenie kopii zapasowej", async ({ page }) => {
    await page.getByRole('textbox', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Login' }).fill('maria.dabrowska');
    await page.getByRole('textbox', { name: 'Login' }).press('Tab');
    await page.getByRole('textbox', { name: 'Hasło' }).fill('pass123');
    await page.getByRole('button', { name: 'Zaloguj się', exact: true }).click();
    await page.getByRole('button', { name: 'Utwórz raport' }).click();
    await page.getByRole('combobox').click();
    await page.getByLabel('Wybory Prezydenckie').getByText('Wybory Prezydenckie').click();
    await page.getByRole('textbox', { name: 'Wprowadź opis raportu...' }).click();
    await page.getByRole('textbox', { name: 'Wprowadź opis raportu...' }).fill('glosowanie bardzo fajne pozdrawiam');
    await page.getByRole('button', { name: 'Zapisz' }).click();
    await page.getByRole('button', { name: 'Wróć' }).click();
  
});
