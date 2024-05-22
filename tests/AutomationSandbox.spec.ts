import { test, Browser, Page, expect } from '@playwright/test';
import { SandBoxPage } from './Pages/SandboxPage';

(async () => {
    let browser: Browser;
    let page: Page;

    let textoAEscribir = 'Estoy aprendiendo a automatizar en Playwright';

    test.describe('Acciones del automation Sandbox', () => {

        test('Click en Boton ID Dinamico', async ({ page }) => {

            await test.step('Dado que navego en el sandbox de Automation de FreeRange', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');  
            })
            
            await test.step('Puedo hacer click en el boton con ID dinamico', async () => {
                await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click();
            }) 
        })

        test('Lleno un campo de texto en automation Sandbox', async ({ page }) => {
            await test.step('Dado que navego en el sandbox de Automation de FreeRange', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');  
            })

            await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
                await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto no admite edicion').toBeEditable();
                await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir); 
                await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto no admite edicion').toHaveValue(textoAEscribir);
            })   
        })

        test('Puedo seleccionar Checkboxes', async ({ page }) => {
            await test.step('Dado que navego en el sandbox de Automation de FreeRange', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar Checkboxes para elegir la comida preferida', async () => {
                const sandbox = new SandBoxPage(page)
                await sandbox.checkBurguer();
                await expect(sandbox.burguerCheckbox, 'El Checkbox de Hamburguesa no estaba seleccionado').toBeChecked();
                

                
                //await page.getByLabel('Hamburguesa 🍔').check();
                await page.getByLabel('Pasta 🍝').check();
            })

            await test.step('Valido que el checkbox Hamburguesa este seleccinado', async () => {
                await expect(page.getByLabel('Hamburguesa 🍔')).toBeChecked();
                // await expect(page.getByLabel('Helado 🍧'), 'El checkbox Helado no esta seleccionado').toBeChecked();
                
            })
            await test.info().attach('screenshot',{
                body: await page.screenshot(),
                contentType: "image/pgn",
            })
            
        })

        test('Puedo seleccionar RadioButtons', async ({ page }) => {
            await test.step('Dado que Navego en el SandBox de Automation de FreeRange', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');    
                })

            await test.step('Selecciono el checkbob SI', async () => {
                await page.getByLabel('Si').check();
                 })
        })

        test('Selecciono un item del Dropdown', async ({ page }) => {
            await test.step('Dado que Navego en el SandBox de Automation de FreeRange', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');    
                })

            await test.step('Seleccion un deporte del dropdown', async () => {
                await page.getByLabel('Dropdown').selectOption('Tennis');
                })
        })
            
                                
        
        
    })
})();