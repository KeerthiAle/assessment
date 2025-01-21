import { $ } from '@wdio/globals';
import { expect } from 'chai';
import dotenv from 'dotenv';
import allure from '@wdio/allure-reporter';
import data from '../data/data.json';
import { logMessage, extractPrice, calculateDiscountedPrice } from '../utills/helper';
dotenv.config();

class TargetPage {

    get logo() {
        return $("//a[@class='sc-e851bd29-0 sc-7d77c0d1-0 dUpEFr cCbaTr']");
    }

    get searchInput() {
        return $("//input[@type='search']");
    }

    get searchButton() {
        return $("//button[@type='submit']");
    }

    get searchResultsHeading() {
        return $("//span[@class='h-text-bs h-display-flex h-flex-align-center h-text-grayDark h-margin-l-x2']");
    }

    get watchList() {
        return $("//div[@class='sc-66b1a45c-0 gMTYqI']");
    }

    get productTitle() {
        return $("//h1[@id='pdp-product-title-id']");
    }

    get productPrice() {
        return $("//span[@data-test='product-price']");
    }

    get productDescription() {
        return $("//div[@data-test='item-details-description']");
    }

    get productDiscount() {
        return $("//div[@data-test='@web/Price/PriceFull']");
    }

    async navigateToTarget() {
        allure.step('Navigating to Target homepage', () => {
            browser.url(process.env.target_url);
            logMessage('Navigated to Target homepage');
        });
    }

    async validateHomePage() {
        allure.step('Validating Target homepage', () => {
            const isLogoVisible = this.logo.isDisplayed();
            expect(isLogoVisible).to.be.true;
            logMessage('Logo is displayed');
        });
    }

    async searchForItem(item) {
        allure.step(`Searching for item: ${item}`, () => {
            this.searchInput.setValue(item);
            this.searchButton.click();
            this.searchInput.sendKeys('Enter');
            logMessage(`Searched for item: ${item}`);
        });
    }

    async isSearchResultsDisplayed() {
        allure.step('Checking if search results are displayed', () => {
            expect(this.searchResultsHeading).toBeDisplayed();
            logMessage('Search results displayed');
        });
    }

    async selectWatch() {
        allure.step('Selecting watch from the search results', () => {
            this.watchList.click();
            logMessage('Watch selected');
        });
    }

    async verifyProductDetails() {
        allure.step('Verifying product details are displayed', () => {
            expect(this.productTitle).toBeDisplayed();
            expect(this.productPrice).toBeDisplayed();
            expect(this.productDescription).toBeDisplayed();
            expect(this.productDiscount).toBeDisplayed();
            logMessage('Product details are displayed');
        });
    }

    async calculateAndVerifyDiscount() {
        allure.step('Calculating and verifying the discount', () => {
            const originalPriceText = this.productPrice.getText();
            const discountText = this.productDiscount.getText();

            const originalPrice = extractPrice(originalPriceText);
            const discount = extractPrice(discountText);

            const expectedDiscountedPrice = calculateDiscountedPrice(originalPrice, discount);
            const displayedDiscountedPriceText = this.productPrice.getText();
            const displayedDiscountedPrice = extractPrice(displayedDiscountedPriceText);

            expect(displayedDiscountedPrice).to.equal(expectedDiscountedPrice, `The calculated discount does not match the displayed price! Expected ${expectedDiscountedPrice}, but got ${displayedDiscountedPrice}`);
            logMessage('Discount calculation verified');
        });
    }
}

export default TargetPage;
