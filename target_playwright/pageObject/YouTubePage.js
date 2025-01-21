import { expect } from '@playwright/test';
import dotenv from 'dotenv';
const allure = require('allure-playwright');
dotenv.config();

export default class YouTubePage {
    constructor(page) {
        this.page = page;
        this.url = process.env.youtube_url;
        this.logo = page.locator("//ytd-topbar-logo-renderer//yt-icon[contains(@id, 'logo')][1])[1]");
        this.searchBar = page.locator("//form[@class='ytSearchboxComponentSearchForm']//input[@name='search_query']");
        this.searchButton = page.locator("//button[@class='ytSearchboxComponentSearchButton']");
        this.firstVideo = page.locator("(//div[@id='dismissible']//a[@id='video-title'])[1]");
        this.videoPlayer = page.locator("//button[@data-title-no-tooltip='Play']");
        this.settingsButton = page.locator("//button[@title='Settings']");
        this.qualityButton = page.locator("//div[@class='ytp-menuitem-label' and text()='Quality']");
        this.skipButton = page.locator("//button[@id='skip-button:v']");
    }

    async navigateToHomePage() {
        await allure.step('Navigate to YouTube homepage', async () => {
            await this.page.goto(this.url);
        });
    }

    async searchForVideo(query) {
        await allure.step('Search for a video', async () => {
            await this.searchBar.fill(query);
            await this.searchButton.click();
        });
    }

    async clickOnFirstVideo() {
        await allure.step('Click on the first video in search results', async () => {
            await this.firstVideo.click();
        });
    }

    async verifyVideoIsPlaying() {
        await allure.step('Verify video is playing', async () => {
            await expect(this.videoPlayer).toBeVisible();
            await expect(this.videoPlayer).toHaveAttribute('paused', 'false');
        });
    }

    async verifyVideoQualityOptions() {
        await allure.step('Skip the ad if present', async () => {
            await this.skipButton.click();
        });

        await allure.step('Open settings and check video quality options', async () => {
            await this.settingsButton.click();
            await this.qualityButton.click();
            await this.page.waitForSelector("//button[@aria-expanded='true']");
        });

        await allure.step('Verify video quality options are available', async () => {
            const qualityOptions = await this.page.locator("//div[@class='ytp-menuitem-label']//span").textContent();
            expect(qualityOptions).toContain('360p');
            expect(qualityOptions).toContain('720p');
            expect(qualityOptions).toContain('1080p');
            await expect(this.page.locator("//span[contains(text(), '360p')]")).toBeVisible();
            await expect(this.page.locator("//span[contains(text(), '720p')]")).toBeVisible();
            await expect(this.page.locator("//span[contains(text(), '1080p')]")).toBeVisible();
        });
    }
}
