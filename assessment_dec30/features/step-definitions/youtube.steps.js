import { Given, When, Then } from '@cucumber/cucumber';
import YouTubePage from '../pageobjects/youtube.page';

const youTubePage = new YouTubePage();

Given(/^I open YouTube homepage$/, async () => {
  await youTubePage.navigateToYouTube();
});

When(/^I search for "([^"]*)"$/, async () => {
  await youTubePage.searchForVideo("selenium");
});

Then(/^I verify the search results$/, async () => {
  await youTubePage.verifySearchResults();
});

Given(/^I click on a video from the search results$/, async () => {
  await youTubePage.selectVideo();
});

When(/^I interact with video controls$/, async () => {
  await youTubePage.pauseAndPlayVideo();
});

Then(/^I verify the video playback and quality options$/, async () => {
  await youTubePage.checkVideoQuality();
});
