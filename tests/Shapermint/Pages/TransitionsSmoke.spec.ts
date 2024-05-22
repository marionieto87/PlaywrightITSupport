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

            const popUpWelcome = page.getByText('I’d rather pay full price');
            if (await popUpWelcome.isVisible()){
                await popUpWelcome.click();
            }

            // await test.step('Close Welcome Pop-Up', async () => {
            //     const home = new HomePage(page)
            //     await home.closeWelcomePopUp();
            // });
            
            await test.step('Name seal validation on Menu', async () => {
                await expect(page.locator('#headerWrap').getByRole('link', { name: 'Memorial Day Sale' })).toBeVisible();
            });

            await test.step('Go to collection with Seal of menu and validate URL', async () => {
                const home = new HomePage(page)
                await home.clickCollectionSeal();
                await expect(page).toHaveURL(/.*memorial-day-sale?/);
                //await expect(page).toHaveURL(UrlActualCollection);
            });
        })
        
        test('Footer link validation Transitions', async ({ page }) => {
            await test.step('Go to USA store', async () => {
                const home = new HomePage(page)
                await home.gotoUS();
            });

            const popUpWelcome = page.getByText('I’d rather pay full price');
            if (await popUpWelcome.isVisible()){
                await popUpWelcome.click();
            }
            
            await test.step('Name seal validation on Footer', async () => {
                await expect(page.getByRole('link', { name: 'Memorial Day Sale' }).nth(1)).toBeVisible();
            });

            await test.step('Go to actual sale with footer link and validate the URL', async () => {
                await page.getByRole('link', { name: 'Memorial Day Sale' }).nth(1).click();
                //await expect(page).toHaveURL(UrlActualCollection);
            });
        })

        test('Validate page coupons with actual collection', async ({ page }) => {
            await test.step('Go to USA store', async () => {
                const home = new HomePage(page)
                await home.gotoUS();
            });

            const popUpWelcome = page.getByText('I’d rather pay full price');
            if (await popUpWelcome.isVisible()){
                await popUpWelcome.click();
            }

            await test.step('Go to actual sale with footer link and validate the URL', async () => {
                await page.getByRole('link', { name: 'Memorial Day Sale' }).nth(1).click();
                await expect(page).toHaveURL(/.*memorial-day-sale?/);
            });
               
        })
        
        
        
    })
})();