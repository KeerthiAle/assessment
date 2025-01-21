import { expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import * as helper from '../utils/helper';
import { allure } from 'allure-playwright';  
dotenv.config();

const testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/data.json'), 'utf8'));

export default class TestimPage {
    constructor(page) {
        this.page = page;
        this.logo = page.locator("//a[@class='h-logo']");
        this.navLinks = page.locator(".has-drop");
        this.headerComponents = testData.testim.headers;
        this.companyMenu = page.locator("//a[text()='Company']");
        this.subsections = testData.testim.subsections;
        this.customer = page.locator("//span[@class='t-t' and text()='Customers']");
        this.review = page.locator("//div[@class='item']");
        this.customerName = page.locator("(//div[@class='item-name'])[1]");
        this.reviewTitle = page.locator("(//div[@class='item-position'])[1]");
        this.reviewContent = page.locator("(//div[@class='item-body']//p)[1]");
        this.newsletterSubscription = page.locator("//div[@class='f-icons']");
        this.privacyPolicy = page.locator("//a[contains(text(), 'Privacy Policy')]");
    }

    async launchURL() {
      await  allure.step('Launch Testim URL', async () => {
            await this.page.goto(process.env.testim_url);
        });
    }

    async validateHeaderComponents() {
        await   allure.step('Validate Header Components', async () => {
            await expect(this.logo).toBeVisible();
            const links = await this.navLinks.all();
            expect(links.length).toBeGreaterThan(0);
            for (let headerComponent of this.headerComponents) {
                const link = this.page.locator(headerComponent.locator);
                await expect(link).toBeVisible();
            }
        });
    }

    async navigateToCompany() {
     await allure.step('Navigate to Company', async () => {
            await this.page.waitForLoadState('load');
            await this.companyMenu.waitFor({ state: 'visible' });
            await this.companyMenu.click();
        });
    }

    async validateSubsections() {
   await allure.step('Validate Subsections', async () => {
            for (let subsection of this.subsections) {
                const subsectionLocator = this.page.locator(subsection.locator);
                await expect(subsectionLocator).toBeVisible();
            }
        });
    }

    async navigateToCustomer() {
    await    allure.step('Navigate to Customer Section', async () => {
            await this.customer.click();
        });
    }

    async getReviewDetails() {
        await   allure.step('Get Review Details', async () => {
            const customerName = await this.customerName.textContent();
            const reviewTitle = await this.reviewTitle.textContent();
            const reviewContent = await this.reviewContent.textContent();
            expect(customerName).toBeTruthy();
            expect(reviewTitle).toBeTruthy();
            expect(reviewContent).toBeTruthy();
            return {
                customerName,
                reviewTitle,
                reviewContent
            };
        });
    }

    async storeReviewData(reviewData) {
        await  allure.step('Store Review Data', async () => {
            const filePath = path.resolve(__dirname, '../data/reviewData.json');
            await storeDataToFile(reviewData, filePath);
            const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            expect(fileData.customerName).toBe(reviewData.customerName);
            expect(fileData.reviewTitle).toBe(reviewData.reviewTitle);
            expect(fileData.reviewContent).toBe(reviewData.reviewContent);
        });
    }

    async crossValidateReview() {
        await  allure.step('Cross Validate Review Data', async () => {
            const storedReviewData = readDataFromFile(path.resolve(__dirname, '../data/reviewData.json'));
            const displayedName = await this.customerName.textContent();
            const displayedTitle = await this.reviewTitle.textContent();
            const displayedContent = await this.reviewContent.textContent();
            expect(displayedName).toBe(storedReviewData.customerName);
            expect(displayedTitle).toBe(storedReviewData.reviewTitle);
            expect(displayedContent).toBe(storedReviewData.reviewContent);
        });
    }

    async validateFooterComponents() {
        await   allure.step('Validate Footer Components', async () => {
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await expect(this.newsletterSubscription).toBeVisible();
            await expect(this.privacyPolicy).toBeVisible();
            await expect(this.privacyPolicy).toHaveText('Privacy Policy');
        });
    }
}
