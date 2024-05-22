import { type Locator, type Page } from '@playwright/test';

export class HomePage{
    readonly page: Page;
    readonly welcomePopUp: Locator;
    readonly popUpLocator: Locator;
    readonly brasMenu: Locator;
    readonly pdpDescription: Locator;
    readonly countrySelector: Locator;
    readonly countryCanadaSelector: Locator;
    readonly countryUsaSelector: Locator;
    readonly countryEnglandSelector: Locator;
    readonly countryAustraliaSelector: Locator;
    readonly sealCollectionMenu: Locator;
    readonly descPdpCollectionBras: Locator;
    



    constructor(page: Page){
        this.page = page;
        this.popUpLocator = page.locator('[id="_oqxmfczn_popup-lead-trafilea-popup"]').getByText('×');
        this.welcomePopUp = page.frameLocator('iframe[name="ju_iframe_906679"]').getByRole('button', { name: 'x', exact: true });
        this.brasMenu = page.getByRole('link', { name: 'Bras' })
        this.countrySelector = page.getByRole('img', { name: 'country-selector' });
        this.countryCanadaSelector = page.getByText('Canada | CAD').first();
        this.countryUsaSelector = page.getByText('United States | USD').first();
        this.countryEnglandSelector = page.getByText('United Kingdom | GBP').first();
        this.countryAustraliaSelector = page.getByText('Australia | AUD').first();
        this.sealCollectionMenu = page.locator('#headerWrap').getByRole('link', { name: 'Memorial Day Sale' });
        this.descPdpCollectionBras = page.getByRole('link', { name: 'Truekind® Daily Comfort' });
    }

    async gotoUS() {
        await this.page.goto('https://shapermint.com/')
    }

    async gotoCA() {
        await this.page.goto('https://shapermint.com/en-CA/')
    }

    async gotoGB() {
        await this.page.goto('https://shapermint.com/en-GB/')
    }

    async gotoAU() {
        await this.page.goto('https://shapermint.com/en-AU/')
    }

    // async closeWelcomePopUpIfVisible() {
    //     const popUpLocator = this.page.frameLocator('iframe[name="ju_iframe_906679"]').getByRole('button', { name: 'x', exact: true });
    //     if (await popUpLocator.isVisible()) {
    //         await popUpLocator.click();
    //     }
    // }

    async closeWelcomePopUp(){
        await this.popUpLocator.click();
    }

    async clickBrasMenu(){
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
        this.descPdpCollectionBras;
    }





    
}

