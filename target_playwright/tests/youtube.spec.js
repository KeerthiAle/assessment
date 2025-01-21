import { test, expect } from '@playwright/test';
import YouTubePage from '../pageObject/YouTubePage';
import dotenv from 'dotenv';
const { allure } = require('allure-playwright');
import { verifyPageTitle, verifyPageUrl, verifyMetaTag, handlePopUps } from '../utils/helper';
dotenv.config();

test.describe('T001-YouTube Automation Test', () => {
  let page;
  let youTubePage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    youTubePage = new YouTubePage(page);
    await youTubePage.navigateToHomePage(process.env.youtube_url);
  });

  test.only('Verify YouTube Homepage', async () => {
    await youTubePage.searchForVideo(process.env.SEARCH_QUERY);

    await youTubePage.clickOnFirstVideo();
    await youTubePage.verifyVideoIsPlaying();

    await youTubePage.verifyVideoQualityOptions();
  });
});
