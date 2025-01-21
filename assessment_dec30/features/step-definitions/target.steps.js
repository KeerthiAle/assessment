import { Given, When, Then } from '@cucumber/cucumber'
import TargetPage from '../pageobjects/target.page';

const targetPage = new TargetPage();

Given(/^I navigate to Target.com$/, async () => {
  await targetPage.navigateToTarget();
  await targetPage.validateHomePage();
});

When(/^I search for a product$/, async () => {
  await targetPage.searchForItem("watches");
});

Then(/^I validate the search results$/, async () => {
  await targetPage.isSearchResultsDisplayed();
});

Given(/^I select a watch$/, async () => {
  await targetPage.selectWatch();
});

When(/^I validate the discount$/, async () => {
  await targetPage.verifyProductDetails();
});

Then(/^I confirm the discount calculation is correct$/, async () => {
  await targetPage.calculateAndVerifyDiscount();
});
