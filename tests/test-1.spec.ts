import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
  await page.goto('https://nova.shapees.com/');
  await page.frameLocator('iframe[name="ju_iframe_906679"]').getByRole('button', { name: 'x', exact: true }).click();
  await page.getByRole('link', { name: 'Bras' }).click();
  await page.getByRole('link', { name: 'Wireless Shaper Bra black' }).click();
});