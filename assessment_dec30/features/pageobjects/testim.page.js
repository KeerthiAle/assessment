import { $ } from '@wdio/globals';
import { expect } from 'chai';
import dotenv from 'dotenv';
import allure from '@wdio/allure-reporter';
import fs from 'fs';
import data from '../data/data.json';
import { logMessage, formatText } from '../utills/helper';
dotenv.config();

const filePath = './reviewData.json';

class TestimPage {

    get logo() {
        return $("//a[@class='h-logo']");
    }

    get navLinks() {
        return $$(".has-drop");
    }

    getHeaderLink(linkText) {
        return $(`//a[text()='${linkText}']`);
    }

    get companyMenu() {
        return $("//a[contains(text(), 'Company')]");
    }

    getSubsection(subsectionText) {
        return $(`//span[@class='t-t' and text()='${subsectionText}']`);
    }

    get customer() {
        return $("//span[@class='t-t' and text()='Customers']");
    }

    get customerName() {
        return $("(//div[@class='item-name'])[1]");
    }

    get reviewTitle() {
        return $("(//div[@class='item-position'])[1]");
    }

    get reviewContent() {
        return $("(//div[@class='item-body']//p)[1]");
    }

    get footer() {
        return $("//div[@class='col-terms']");
    }

    get newsletterSubscription() {
        return $("//div[@class='f-icons']");
    }

    get privacyPolicy() {
        return $("//a[contains(text(), 'Privacy Policy')]");
    }

    async launchURL() {
        allure.step('Launching URL', async () => {
            await browser.url(process.env.testim_url);
            logMessage('Launched Testim URL');
        });
    }

    async validateHomePage() {
        allure.step('Validating Home Page', async () => {
            await expect(this.logo).toBeDisplayed();
            logMessage('Logo is displayed on the homepage');
        });
    }

    async validateHeaderComponents() {
        allure.step('Validating Header Components', async () => {
            await expect(this.logo).toBeDisplayed();

            const links = await this.navLinks;
            expect(links.length).to.be.greaterThan(0, 'Navigation links should be greater than 0');

            for (let i = 0; i < links.length; i++) {
                const link = links[i];
                await expect(link).toBeDisplayed();
                logMessage(`Header link ${i + 1} is displayed`);
            }
        });
    }

    async navigateToCompany() {
        allure.step('Navigating to Company section', async () => {
            const companyMenu = this.companyMenu;
            await companyMenu.click();
            await this.validateSubsections();
        });
    }

    async validateSubsections() {
        allure.step('Validating Subsections under Company', async () => {
            for (let subsection of data.testim.subsections) {
                const subsectionElement = this.getSubsection(subsection);
                await expect(subsectionElement).toBeDisplayed();
                logMessage(`Subsection "${subsection}" is displayed`);
            }
        });
    }

    async navigateToCustomer() {
        allure.step('Navigating to Customers section', async () => {
            const customer = this.customer;
            await customer.click();
        });
    }

    async getReviewDetails() {
        allure.step('Getting Review Details', async () => {
            const customerName = await this.customerName.getText();
            const reviewTitle = await this.reviewTitle.getText();
            const reviewContent = await this.reviewContent.getText();

            logMessage(`Customer Name: ${customerName}`);
            logMessage(`Review Title: ${reviewTitle}`);
            logMessage(`Review Content: ${reviewContent}`);

            return { customerName, reviewTitle, reviewContent };
        });
    }

    async storeReviewData(reviewData) {
        allure.step('Storing Review Data', async () => {
            try {
                fs.writeFileSync(filePath, JSON.stringify(reviewData, null, 2));
                logMessage('Review data stored successfully');
            } catch (error) {
                console.error('Error writing to file', error);
            }
        });
    }

    async crossValidateReview(reviewData) {
        allure.step('Cross-validating Review Data', async () => {
            const displayedName = await this.customerName.getText();
            const displayedTitle = await this.reviewTitle.getText();
            const displayedContent = await this.reviewContent.getText();

            expect(displayedName).to.equal(reviewData.customerName);
            expect(displayedTitle).to.equal(reviewData.reviewTitle);
            expect(displayedContent).to.equal(reviewData.reviewContent);

            logMessage('Review data cross-validated successfully');
        });
    }

    async validateFooterComponents() {
        allure.step('Validating Footer Components', async () => {
            const footerDiv = this.footer;
            await expect(footerDiv).toBeDisplayed();

            const footerItems = footerDiv.$$(`div`);
            for (let i = 0; i < footerItems.length; i++) {
                await expect(footerItems[i]).toBeDisplayed();
                logMessage(`Footer item ${i + 1} is displayed`);
            }

            const newsletterDiv = this.newsletterSubscription;
            await expect(newsletterDiv).toBeDisplayed();

            const newsletterItems = newsletterDiv.$$(`div`);
            for (let i = 0; i < newsletterItems.length; i++) {
                await expect(newsletterItems[i]).toBeDisplayed();
                logMessage(`Newsletter item ${i + 1} is displayed`);
            }

            await expect(this.privacyPolicy).toBeDisplayed();
            await expect(this.privacyPolicy).toHaveText('Privacy Policy');
        });
    }
}

export default TestimPage;
