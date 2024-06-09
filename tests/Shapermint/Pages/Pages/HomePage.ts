import { type Locator, type Page } from '@playwright/test';


export class HomePage {
    readonly page: Page;
    readonly txtPlusUlockPopUp: Locator;
    readonly txtExtraOffPopUp: Locator;
    readonly txtRatherPayFullPopUp: Locator;
    readonly brasMenu: Locator;
    readonly pdpDescription: Locator;
    readonly countrySelector: Locator;
    readonly countryCanadaSelector: Locator;
    readonly countryUsaSelector: Locator;
    readonly countryEnglandSelector: Locator;
    readonly countryAustraliaSelector: Locator;
    readonly sealCollectionMenu: Locator;
    readonly descPdpCollectionBras: Locator;


    constructor(page: Page) {
        this.page = page;
        this.txtPlusUlockPopUp = page.getByText('Plus unlock an');
        this.txtExtraOffPopUp = page.getByRole('heading', { name: 'EXTRA 10% OFF' });
        this.txtRatherPayFullPopUp = page.getByText('I’d rather pay full price');
        this.brasMenu = page.getByRole('link', { name: 'Bras' });
        this.countrySelector = page.getByRole('img', { name: 'country-selector' });
        this.countryCanadaSelector = page.getByText('Canada | CAD').first();
        this.countryUsaSelector = page.getByText('United States | USD').first();
        this.countryEnglandSelector = page.getByText('United Kingdom | GBP').first();
        this.countryAustraliaSelector = page.getByText('Australia | AUD').first();
        this.sealCollectionMenu = page.locator('#headerWrap').getByRole('link', { name: 'SHM Birthday Sale' });
        this.descPdpCollectionBras = page.getByRole('link', { name: 'Truekind® Daily Comfort' });
    }

    async gotoStage() {
        await this.page.goto('https://nova.shapees.com/');
    }

    async gotoUS() {
        await this.page.goto('https://shapermint.com/');
    }

    async gotoCA() {
        await this.page.goto('https://shapermint.com/en-CA/');
    }

    async gotoGB() {
        await this.page.goto('https://shapermint.com/en-GB/');
    }

    async gotoAU() {
        await this.page.goto('https://shapermint.com/en-AU/');
    }

    async gotoPDP() {
        await this.page.goto('https://shapermint.com/products/empetua-shaping-boyshort?variant=39695098478726');
    }

    async closeWelcomePopUp() {
        if (await this.txtRatherPayFullPopUp.isVisible()){
            this.txtPlusUlockPopUp.isVisible();
            this.txtExtraOffPopUp.isVisible();
            await this.txtRatherPayFullPopUp.click();
        } else {
            console.log('El Pop Up no se lanzo');
        }
    }

    async clickBrasMenu() {
        await this.brasMenu.click();
    }

    async clickCountrySelector() {
        await this.countrySelector.click();
    }

    async clickCanadaSelector() {
        await this.countryCanadaSelector.click();
    }

    async clickUsaSelector() {
        await this.countryUsaSelector.click();
    }

    async clickEnglandSelector() {
        await this.countryEnglandSelector.click();
    }

    async clickAustraliaSelector() {
        await this.countryAustraliaSelector.click();
    }

    async clickCollectionSeal() {
        await this.sealCollectionMenu.click();
    }

    async confirmDescriptionPdpBrasCollection() {
        this.descPdpCollectionBras.isVisible();
    }


}
