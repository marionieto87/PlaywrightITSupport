import { type Locator, type Page  } from "@playwright/test";

export class SandBoxPage {
    readonly page:Page
    readonly burguerCheckbox: Locator;

    constructor(page: Page){
        this.page = page;
        this.burguerCheckbox = page.getByLabel('Hamburguesa 🍔');
    }

    async checkBurguer(){
        await this.burguerCheckbox.check();
    }
}

