import { test, Browser, Page, expect } from "@playwright/test";
import { HomePage } from './Pages/HomePage';
import { BrasCollectionPage } from './Pages/BrasCollectionPage';

(async () => {
    let browser: Browser;
    let page: Page;

    test.describe('Smoke Test over issue IT Support', () => {

        test('Validate Method payments remain visibles on checkout', async ({ page }) => {
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
            
            // Click en Bras collection
            await test.step('Go to Bras collection', async () => {
                await page.getByRole('link', { name: 'Bras' }).click();
            });
                 
            // Click en el primer PDP de la collection BRAS
            await test.step('Select the PDP Daily Comfort Wireless Shaper Bra', async () => {
                await page.getByRole('link', { name: 'Wireless Shaper Bra black' }).click();
            });

            // Validar que la currency actual si coincide con la del pais seleccionado
            await test.step('Validate the correct Currency in the Colection', async () => {
                await expect(page.getByTestId('final-product-price').getByText('$')).toBeVisible();  
                // await expect(page.getByTestId('final-product-price').getByText('CA$'), 'The currency doesnt match with the URL provided.').toBeVisible();
            });

            // Adicionar PDP al carrito de compras
            await test.step('Add Item to the cart side', async () => {
                await page.getByTestId('add-to-cart').click();
            });

            // pasar del carrito de compras al checkout
            await test.step('Go to the checkout with item in the cart', async () => {
                await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
            });

            await test.info().attach('screenshot',{
                body: await page.screenshot(),
                contentType: "image/pgn",
            });

            // Valida que los metodos de pago Paypal y Amazon esta disponibles
            await test.step('Validate Method payments Paypal - Amazon', async () => {
                await expect(page.getByTestId('PayPalExpress-button')).toBeVisible();
                await expect(page.getByTestId('AmazonExpress-button')).toBeVisible();
            });



        })

        test('User go to Shapermint UK store ande remains in the store UK', async ({ page }) => {
            await test.step('Go to Shapermint Store', async () => {
                const home = new HomePage(page)
                await home.gotoGB();
            });

            await test.step('Validate the URL belong to UK store', async () => {
                await expect(page).toHaveURL(/.*en-GB/), 'The Store remains in the UK store visited';
            });

            await test.info().attach('screenshot',{
                body: await page.screenshot(),
                contentType: "image/pgn",
            });

        })

        test('User go to Shapermint.com USA store and remain in the US store', async ({ page }) => {
            await test.step('Go to USA store', async () => {
                const home = new HomePage(page)
                await home.gotoUS();
            });

            await test.step('Validate the URL belongs to USA domain', async () => {
                await expect(page).toHaveURL(/.*shapermint.com/)
            });
        
            await test.info().attach('screenshot',{
                body: await page.screenshot(),
                contentType: "image/pgn",
            });
        })

        test('Navigate through all stores, and verify that the prices have been updated correctly.', async ({ page }) => {
            await test.step('Go to USA store', async () => {
                const home = new HomePage(page)
                await home.gotoUS();
            });

            await test.step('Validate the URL belongs to USA domain', async () => {
                await expect(page).toHaveURL(/.*shapermint.com/);
            });

            await test.step('Validate and Close Welcome Pop up', async () => {
                const home = new HomePage(page)
                await test.info().attach('screenshot', {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                })
                await home.closeWelcomePopUp();
            })

            await test.step('Navigate to Bras Collection', async () => {
                const home = new HomePage(page)
                await home.clickBrasMenu();
            });
            
            await test.step('Get value to the main PDP on the collection on USD', async () => {
                const locatorPrice = page.getByRole('link', { name: 'Truekind® Daily Comfort' });
                await expect(locatorPrice).toHaveText(/$/);
                await expect(locatorPrice).toHaveText(/29/);
                await expect(locatorPrice).toHaveText(/99/);
            });

            await test.step('Swicht to the Canada Store', async () => {
                const home = new HomePage(page)
                await home.clickCountrySelector();
                await home.clickCanadaSelector();
            });

            await test.step('Get value to the main PDP on the collection on CA', async () => {
                const home = new HomePage(page)
                await home.confirmDescriptionPdpBrasCollection();
                const locatorPrice = page.getByRole('link', { name: 'Truekind® Daily Comfort' })
                await expect(locatorPrice).toHaveText(/CA/);
                await expect(locatorPrice).toHaveText(/40/);
                await expect(locatorPrice).toHaveText(/00/);
            });

            await test.step('Swicht to England Store', async () => {
                const home = new HomePage(page)
                await home.clickCountrySelector();
                await home.clickEnglandSelector();
            });

            await test.step('Get value to the main PDP on the collection on GB', async () => {
                const home = new BrasCollectionPage(page)
                await home.confirmDescriptionPdpBrasCollection();
                const locatorPrice = page.getByRole('link', { name: 'Truekind® Daily Comfort' })
                await expect(locatorPrice).toHaveText(/£/);
                await expect(locatorPrice).toHaveText(/27/);
                await expect(locatorPrice).toHaveText(/99/);
            });

            await test.step('Swicht to Australia Store', async () => {
                const home = new HomePage(page)
                await home.clickCountrySelector();
                await home.clickAustraliaSelector();
            });

            await test.step('Get value to the main PDP on the collection on AU', async () => {
                const locatorPrice = page.getByRole('link', { name: 'Truekind® Daily Comfort' })
                await expect(locatorPrice).toHaveText(/AU/);
                await expect(locatorPrice).toHaveText(/43/);
                await expect(locatorPrice).toHaveText(/99/);
            });

            await test.info().attach('screenshot',{
                body: await page.screenshot(),
                contentType: "image/pgn",
            });

        })

        test('Checking the correct price on the Free Shipping banner in All stores', async ({ page }) => {
            await test.step('Go to USA store', async () => {
                const home = new HomePage(page)
                await home.gotoUS();
            })

            await test.step('Validate and Close Welcome Pop up', async () => {
                const home = new HomePage(page)
                await test.info().attach('screenshot', {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                })
                await home.closeWelcomePopUp();
            })

            //Switch to USA store and validate the correct price on the Free Shiping banner
            await test.step('Validate free Delivery banner', async () => {
                const locatorBannerFreeShipingCA = page.locator('#headerWrap').getByText('FREE SHIPPING OVER $70');
                await expect(locatorBannerFreeShipingCA).toHaveText(/FREE SHIPPING OVER /);
                await expect(locatorBannerFreeShipingCA.getByText('FREE SHIPPING OVER $70')).toBeVisible();
            })   

            //Switch to Canada store and validate the correct price on the Free Shiping banner
            await test.step('Swicht to the Canada Store', async () => {
                const home = new HomePage(page)
                await home.clickCountrySelector();
                await home.clickCanadaSelector();
            });

            await test.step('Validate Free Delivery banner in Canada store', async () => {
                const locatorBannerFreeShipingCA = page.locator('#headerWrap').getByText('FREE SHIPPING OVER CA$95');
                await expect(locatorBannerFreeShipingCA).toHaveText(/FREE SHIPPING OVER CA/);
                await expect(locatorBannerFreeShipingCA.getByText('FREE SHIPPING OVER CA$95')).toBeVisible();
            })

            //Switch to England store and validate the correct price on the Free Shiping banner
            await test.step('Swicht to the England Store', async () => {
                const home = new HomePage(page)
                await home.clickCountrySelector();
                await home.clickEnglandSelector();
            });

            await test.step('Validate Free Delivery Banner in England store', async () => {
                const locatorBannerFreeShipingCA = page.locator('#headerWrap').getByText('FREE SHIPPING OVER £70');
                await expect(locatorBannerFreeShipingCA).toHaveText(/FREE SHIPPING OVER £70/);
                await expect(locatorBannerFreeShipingCA.getByText('FREE SHIPPING OVER £70')).toBeVisible();
            })

            //Switch to Australia store and validate the correct price on the Free Shiping banner
            await test.step('Swicht to the Australia Store', async () => {
                const home = new HomePage(page)
                await home.clickCountrySelector();
                await home.clickAustraliaSelector();
            });

            await test.step('Validate Free Delivery Banner in Australia store', async () => {
                const locatorBannerFreeShipingCA = page.locator('#headerWrap').getByText('FREE SHIPPING OVER AU$105');
                await expect(locatorBannerFreeShipingCA).toHaveText(/FREE SHIPPING OVER/);
                await expect(locatorBannerFreeShipingCA.getByText('FREE SHIPPING OVER AU$105')).toBeVisible();
            })
            await test.info().attach('screenshot',{
                body: await page.screenshot(),
                contentType: "image/pgn",
            });
        
        })

        test('TC06 - Test Pop Up for stores', async ({ page }) => {
            await test.step('', async () => {
                const home = new HomePage(page)
                await home.gotoUS();
            })

            await test.step('Validate and Close Welcome Pop up', async () => {
                const home = new HomePage(page)
                await test.info().attach('screenshot', {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                })
                await home.closeWelcomePopUp();
            })
            
        })

        // Test case TC07 - Verifies that the tooltip is working properly
        test('TC07 - Tooltip working properly', async ({ page }) => {

            // Step to navigate to the Product Detail Page (PDP)
            await test.step('', async () => {
            const home = new HomePage(page);
            await home.gotoPDP();
            });

            // Step to validate and close the welcome pop-up
            await test.step('Validate and Close Welcome Pop up', async () => {
            const home = new HomePage(page);
        
            // Attach a screenshot for documentation purposes
            await test.info().attach('screenshot', {
                body: await page.screenshot(),
                contentType: 'image/png',
            });
                // Close the welcome pop-up
                await home.closeWelcomePopUp();
            });

            // Step to hover over the tooltip and validate its functionality
            await test.step('Mouse Over Tool tip', async () => {
            const home = new BrasCollectionPage(page);

            // Hover over the text review stars to display the tooltip
            await home.mouseOverTxtReviewStars();

            // Hover over the tooltip to make sure it is displayed correctly
            await home.mouseOverToolTip();

            // Validate the tooltip message
            await home.validateMsjToolTip();

            // Assert that the tooltip contains the expected text
            await expect(page.getByText('Final Sale: product not')).toBeVisible();
        });
    });
        
            
    
        

    })

})();