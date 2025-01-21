import { expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { allure } from 'allure-playwright';
import * as helper from '../utils/helper';

export default class TargetPage {
  constructor(page) {
    this.page = page;
    this.logo = page.locator("//a[@class='sc-e851bd29-0 sc-7d77c0d1-0 dUpEFr cCbaTr']");
    this.searchInput = page.locator("//input[@type='search']");
    this.searchButton = page.locator("//button[@type='submit']");
    this.searchResultsHeading = page.locator("//span[text()='for “watches”']");
    this.watchList = page.locator("//div[@class='sc-66b1a45c-0 gMTYqI']");
    this.productTitle = page.locator("//h1[@class='product-title']"); // Ensure correct locator
    this.productPrice = page.locator("//span[@class='h-text-line-through']");
    this.discountPrice = page.locator("//span[@data-test='discount-price']");
    this.discountPercentage = page.locator("//span[@data-test='product-savings-amount']");
  }

  async launchURL() {
    await allure.step('Launch Target URL', async () => {
      await this.page.goto(process.env.target_url);
    });
  }

  async validateHomePage() {
 await   allure.step('Validate Home Page', async () => {
      await expect(this.logo).toBeVisible();
      await expect(this.searchInput).toBeEditable();
    });
  }

  async searchForItem(item) {
   await allure.step('Search for item: ' + item, async () => {
      await this.searchInput.fill(item);
      await this.searchButton.click();
    });
  }

  async validateSearchResults() {
  await  allure.step('Validate Search Results', async () => {
      await expect(this.searchResultsHeading).toBeVisible();
      const resultsCount = await this.watchList.count();
      expect(resultsCount).toBeGreaterThan(0);
    });
  }

  async selectProduct(index = 0) {
  await  allure.step('Select product at index: ' + index, async () => {
      const productLocator = this.page.locator(`(//div[@class='sc-66b1a45c-0 gMTYqI'])[${index + 1}]`);
      await productLocator.click();
      await expect(this.productTitle).toBeVisible();
    });
  }

  async extractProductDetails() {
    await allure.step('Extract product details', async () => {
      const priceText = await this.productPrice.textContent();
      const discountText = await this.discountPrice.textContent();
      const discountPercentageText = await this.discountPercentage.textContent();

      const price = helper.extractPrice(priceText);
      const discount = helper.extractPrice(discountText);
      const discountPercentage = helper.extractDiscountPercentage(discountPercentageText);

      expect(price).toBeGreaterThan(0);
      expect(discount).toBeGreaterThan(0);
      expect(discountPercentage).toBeGreaterThan(0);
      return { price, discount, discountPercentage };
    });
  }

  async validateDiscountCalculation() {
  await  allure.step('Validate Discount Calculation', async () => {
      const { price, discount, discountPercentage } = await this.extractProductDetails();
      const calculatedDiscountPrice = price - (price * discountPercentage / 100);
      console.log(`Original Price: $${price}`);
      console.log(`Discounted Price: $${discount}`);
      console.log(`Discount Percentage: ${discountPercentage}%`);
      console.log(`Calculated Discounted Price: $${calculatedDiscountPrice.toFixed(2)}`);

      expect(calculatedDiscountPrice).toBeCloseTo(discount, 2);
      const calculatedDiscountPercentage = (1 - (discount / price)) * 100;
      expect(calculatedDiscountPercentage).toBeCloseTo(discountPercentage, 2);
    });
  }
}
