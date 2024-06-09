import { test, Browser, Page, expect } from '@playwright/test';
//import { url } from 'inspector';
import { HomePage } from "./Pages/HomePage";

(async () => {
    let browser: Browser;
    let page: Page;

    test.describe('Transitions Validation', () => {

        test('Menu validation Transitions', async ({ page }) => {
            await test.step('Go to USA store', async () => {
                const home = new HomePage(page)
                await home.gotoUS();
            });

            await test.step('Validate and Close Welcome Pop up', async () => {
                const home = new HomePage(page)
                await test.info().attach('screenshot', {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                })
                await home.closeWelcomePopUp();
            })
            
            await test.step('Name seal validation on Menu', async () => {
                await expect(page.locator('#headerWrap').getByRole('link', { name: 'SHM Birthday Sale' })).toBeVisible();
            });

            await test.step('Go to collection with Seal of menu and validate URL', async () => {
                const home = new HomePage(page)
                await home.clickCollectionSeal();
                await expect(page).toHaveURL(/.*birthday-sale/);
                //await expect(page).toHaveURL(UrlActualCollection);
            });
        })
        
        test('Footer link validation Transitions', async ({ page }) => {
            await test.step('Go to USA store', async () => {
                const home = new HomePage(page)
                await home.gotoStage();
            });

            const popUpWelcome = page.getByText('I’d rather pay full price');
            if (await popUpWelcome.isVisible()){
                await popUpWelcome.click();
            }
            
            await test.step('Name seal validation on Footer', async () => {
                await expect(page.getByRole('link', { name: 'SHM Birthday Sale' }).nth(1)).toBeVisible();
            });

            await test.step('Go to actual sale with footer link and validate the URL', async () => {
                await page.getByRole('link', { name: 'SHM Birthday Sale' }).nth(1).click();
                //await expect(page).toHaveURL(UrlActualCollection);
            });
        })

        test('Validate page coupons with actual collection', async ({ page }) => {
            await test.step('Go to USA store', async () => {
                const home = new HomePage(page)
                await home.gotoStage();
            });

            const popUpWelcome = page.getByText('I’d rather pay full price');
            if (await popUpWelcome.isVisible()){
                await popUpWelcome.click();
            }

            await test.step('Go to actual sale with footer link and validate the URL', async () => {
                await page.getByRole('link', { name: 'SHM Birthday Sale' }).nth(1).click();
                await expect(page).toHaveURL(/.*birthday-sale/);
            });
               
        })
        
        
        
    })
})();