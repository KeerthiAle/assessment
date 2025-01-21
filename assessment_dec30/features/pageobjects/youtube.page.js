import { $ } from '@wdio/globals';
import { expect } from 'chai';
import dotenv from 'dotenv';
import allure from '@wdio/allure-reporter';
import data from '../data/data.json';
import { logMessage } from '../utills/helper';
dotenv.config();

class YouTubePage {

  get logo() {
    return $("(//ytd-topbar-logo-renderer//yt-icon[contains(@id, 'logo')][1])[1]");
  }

  get searchInput() {
    return $("//form[@class='ytSearchboxComponentSearchForm']//input[@name='search_query']");
  }

  get searchButton() {
    return $("//button[@class='ytSearchboxComponentSearchButton']");
  }

  get firstVideo() {
    return $("(//div[@id='dismissible']//a[@id='video-title'])[1]");
  }

  get videoPlayer() {
    return $("//ytd-player[@id='inline-player']//div[@class='html5-video-container']");
  }

  get settingsButton() {
    return $("//button[@title='Settings']");
  }

  get skipButton() {
    return $("//button[@id='skip-button:v']");
  }

  async navigateToYouTube() {
    allure.step('Navigating to YouTube', async () => {
      await browser.url(process.env.youtube_url);
      logMessage('Navigated to YouTube');
    });
  }

  async searchForVideo() {
    const query = data.youtube.searchQuery;
    allure.step('Searching for a video', async () => {
      await this.searchInput.setValue(query);
      await this.searchButton.click();
      logMessage(`Searched for video: ${query}`);
    });
  }

  async verifySettingsButton() {
    allure.step('Verifying settings button', async () => {
      const settings = this.settingsButton;
      await expect(settings).toBeDisplayed();
      logMessage('Settings button is displayed');
    });
  }

  async verifySearchResults() {
    allure.step('Verifying the search results', async () => {
      await expect(this.videoPlayer).toBeDisplayed();
      logMessage('Video player is displayed in search results');
    });
  }

  async clickFirstVideo() {
    allure.step('Clicking the first video', async () => {
      await this.firstVideo.click();
      logMessage('First video clicked');
    });
  }

  async verifyVideoPlaying() {
    allure.step('Verifying if the video is playing', async () => {
      const video = this.videoPlayer;
      expect(await video.isDisplayed()).to.be.true;
      logMessage('Video is playing');
    });
  }
}

export default YouTubePage;
