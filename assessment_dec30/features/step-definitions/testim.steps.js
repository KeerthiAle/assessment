import { Given, When, Then } from '@cucumber/cucumber';
import TestimPage from '../pageobjects/testim.page';

const testimPage = new TestimPage();

Given(/^I navigate to the Testim application$/, async () => {
  await testimPage.launchURL();
});

Then(/^I validate the header components$/, async () => {
  await testimPage.validateHeaderComponents();
});

Given(/^I navigate to the Company section$/, async () => {
  await testimPage.navigateToCompany();
});

Then(/^I validate subsections of Company section$/, async () => {
  await testimPage.validateSubsections();
});

Given(/^I retrieve and store a customer review$/, async () => {
  await navigateToCustomer();
  const reviewData = await getReviewDetails();
  await testimPage.storeReviewData(reviewData);
});

When(/^I cross-validate the stored review$/, async () => {
  await crossValidateReview(reviewData);
});

Then(/^I validate the footer components$/, async () => {
  await validateFooterComponents();
});
