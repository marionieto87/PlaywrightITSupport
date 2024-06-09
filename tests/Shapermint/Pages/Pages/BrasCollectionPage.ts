import { type Locator, type Page } from '@playwright/test';

export class BrasCollectionPage{
    readonly page: Page;
    readonly descPdpCollectionBras: Locator;
    readonly toolTipPDP: Locator;
    readonly msjToolTip: Locator;
    readonly txtReviewsStars: Locator;   


    constructor(page: Page) {
        this.page = page;
        this.descPdpCollectionBras = page.getByRole('link', { name: 'Truekind® Daily Comfort' });
        this.toolTipPDP = page.getByRole('img', { name: 'tooltip' });
        this.msjToolTip = page.getByText('Final Sale: product not');
        this.txtReviewsStars = page.getByTestId('Container');
    }

    async gotoPDP() {
        await this.page.goto('https://shapermint.com/products/empetua-shaping-boyshort?variant=39695098478726');
    }

    async confirmDescriptionPdpBrasCollection() {
        await this.descPdpCollectionBras.isVisible();
    }

    async mouseOverToolTip() {
        await this.toolTipPDP.hover();
    }

    async validateMsjToolTip() {
        await this.msjToolTip.textContent();
    }

    async mouseOverTxtReviewStars() {
        await this.txtReviewsStars.hover();
    }

}


