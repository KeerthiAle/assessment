import { expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { allure } from 'allure-playwright';
import { storeDataToFile, readDataFromFile } from '../utils/helper';


export default class BookingPage {
  constructor(page) {
    this.page = page;
    this.url = process.env.booking_url;
    this.logo = page.locator("//a[@data-testid='header-booking-logo']");
    this.stay = page.locator("//a[@id='accommodations']");
    this.calender = page.locator("//div[@data-testid='searchbox-dates-container']");
    this.destination = page.locator("//input[@placeholder='Where are you going?']");
    this.destinationLocation = page.locator("(//div[@role='button'])[1]");
    this.checkInDate = page.locator("(//span[@tabindex='-1'])[15]");
    this.checkOutDate = page.locator("(//span[@tabindex='-1'])[17]");
    this.searchButton = page.locator("//span[text()='Search']");
    this.resultsContainer = page.locator("//div[@class='bcbf33c5c3']");
    this.starRatingFilter = page.locator("(//div[@data-filters-item='used_filters:class=5']//div[text() ='5 stars'])[1]");
    this.hotelCardSelector = page.locator("//div[@role='listitem'][1]");
    this.hotelNameSelector = page.locator("//h1[@class='hotel-name']");
  }

  async navigateToBooking() {
    await this.page.goto(this.url);
  }

  async verifyPageTitleAndURL() {
    const logoVisible = await this.page.isVisible(this.logo);
    expect(logoVisible).toBe(true);

    const url = this.page.url();
    expect(url).toBe(this.url);
  }

  async searchForAccommodation() {
   await allure.step('Click on destination input field', async () => {
      await this.page.click(this.destination);
    });

   await allure.step('Select destination location', async () => {
      await this.page.click(this.destinationLocation);
    });

   await allure.step('Open calendar', async () => {
      await this.page.click(this.calender);
    });

  await  allure.step('Select check-in date', async () => {
      await this.page.click(this.checkInDate);
    });

    await allure.step('Select check-out date', async () => {
      await this.page.click(this.checkOutDate);
    });

   await allure.step('Click search button', async () => {
      await this.page.click(this.searchButton);
    });

    await this.page.waitForSelector(this.resultsContainer);
  }

  async applyFilters() {
   await allure.step('Apply 5-star rating filter', async () => {
      await this.page.click(this.starRatingFilter);
    });

    await this.page.waitForSelector(this.resultsContainer);

    const resultsCount = await this.page.$$eval(this.resultsContainer, results => results.length);
    storeDataToFile({ resultsCount }, 'searchResults.json');
  }

  async selectAccommodationFromSearch() {
   await allure.step('Select first hotel from search results', async () => {
      await this.page.click(this.hotelCardSelector);
    });
  }

  async verifySelectedHotelName() {
    const selectedHotel = await this.page.locator(this.hotelNameSelector).innerText();
    const storedHotelName = readDataFromFile('selectedHotel.json').hotelName;
    expect(selectedHotel).toBe(storedHotelName);
  }
}
