import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
  await page.goto('https://nova.shapees.com/');
  await page.frameLocator('iframe[name="ju_iframe_906679"]').getByRole('button', { name: 'x', exact: true }).click();
  await page.getByRole('link', { name: 'Bras' }).click();
  await page.getByRole('link', { name: 'Wireless Shaper Bra black' }).click();
});

test('example test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveScreenshot('google.png');
  await expect(page).toHaveScreenshot('logo_google.png');
});

test('Banner comparition SHM', async ({ page }) => {
  await page.goto('https://shapermint.com/');
  await expect(page).toHaveScreenshot('banner.png');
  await expect(page).toHaveScreenshot('main_banner.png');
});

test('Banner comparition SHM without Pop up', async ({ page }) => {
  await page.goto('https://shapermint.com/');
  await page.getByText('I’d rather pay full price').click();
  await expect(page).toHaveScreenshot('banner_pop_up.png');
  await expect(page.getByRole('link', { name: 'main-banner' }).first()).toHaveScreenshot('main_banner_pop_up.png');
});