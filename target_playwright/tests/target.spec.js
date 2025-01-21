import { test, expect } from '@playwright/test';
import TargetPage from '../pageObject/TargetPage'

test.describe('T001-Target application testing', () => {
  let targetPage;
  test.beforeEach(async ({ page }) => {
    targetPage = new TargetPage(page);
    await targetPage.launchURL();
    await targetPage.validateHomePage();
  });

  test('Search for Watches and validate product,discount', async ({ page }) => {
    await targetPage.launchURL();
    await targetPage.validateHomePage();
    await targetPage.validateHomePage();
    await targetPage.searchForItem("watch");
    await targetPage.validateSearchResults();
    await targetPage.selectProduct(0);
    await targetPage.validateDiscountCalculation();
  });
});