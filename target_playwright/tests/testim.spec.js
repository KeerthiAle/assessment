import { test, expect } from '@playwright/test';
import TestimPage from '../pageObject/TestimPage'; 
import path from 'path';
import fs from 'fs';
const dataPath = path.resolve(__dirname, '../data/data.json');
const testData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

test.describe('T001-Testim application testing', () => {
  let testimPage;
  test.beforeEach(async ({ page }) => {
    testimPage = new TestimPage(page);
    await testimPage.launchURL();
    await testimPage.validateHeaderComponents(); 
  });

  test('Navigate and store review details', async () => {
    await testimPage.launchURL();
    await testimPage.validateHeaderComponents(); 
    await testimPage.navigateToCustomer();
    const reviewData = await testimPage.getReviewDetails();
    await testimPage.storeReviewData(reviewData);
    await testimPage.crossValidateReview();
    await testimPage.validateFooterComponents();
  });
});
