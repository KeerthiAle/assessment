import { $ } from '@wdio/globals';
import { expect } from 'chai';
import dotenv from 'dotenv';
import allure from '@wdio/allure-reporter';
import { isElementDisplayed, getElementText } from '../utills/helper';
import data from './data.json';
dotenv.config();

class BookingPage {
    get logo() {
        return $("//a[@data-testid='header-booking-logo']");
    }
    get searchButton() {
        return $("//span[text()='Search']");
    }
    get destinationInput() {
        return $("input[placeholder='Where are you going?']");
    }
    get accommodationList() {
        return $("//div[@class='bcbf33c5c3']");
    }
    get firstHotel() {
        return $("//div[@role='listitem'][1]");
    }
    get starRating() {
        return $("(//div[@data-filters-item='used_filters:class=5']//div[text()='5 stars'])[1]");
    }
    get results() {
        return $("//div[@class='results']");
    }

    async navigateToBookingPage() {
        await allure.step('Navigating to booking page', async () => {
            await browser.url(process.env.booking_url);
        });
    }

    async validateHomePage() {
        await allure.step('Validating homepage', async () => {
            await isElementDisplayed(this.logo);
        });
    }

    async searchForAccommodation() {
        const { destination } = data.booking;
        await allure.step(`Searching for accommodation in ${destination}`, async () => {
            await this.destinationInput.setValue(destination);
            await this.searchButton.click();
        });
    }

    async validateSearchResults() {
        await allure.step('Validating search results are displayed', async () => {
            await isElementDisplayed(this.results);
            const hotels = await $$(this.accommodationList);
            expect(hotels.length).to.be.greaterThan(0, 'No accommodations found');
        });
    }

    async verifyAccommodationDetails() {
        await allure.step('Verifying accommodation details', async () => {
            const hotels = await $$(this.accommodationList);
            expect(hotels.length).to.be.greaterThan(0, 'No accommodations found in the list');
            await isElementDisplayed(this.firstHotel);
            const hotelName = await getElementText(this.firstHotel);
            expect(hotelName).to.include(data.booking.expectedHotelName, `Expected hotel name to include ${data.booking.expectedHotelName}`);
            const hotelPrice = await getElementText(this.firstHotel.$(".hotel-price"));
            expect(hotelPrice).to.include(data.booking.expectedHotelPrice, `Expected hotel price to be ${data.booking.expectedHotelPrice}`);
        });
    }

    async filterByStarRating() {
        await allure.step('Filtering accommodations by star rating', async () => {
            await this.starRating.click();
            await expect(this.starRating).toHaveClassContaining('selected');
        });
    }

    async selectAccommodation() {
        await allure.step('Selecting first accommodation', async () => {
            await (this.firstHotel).click();
        });
    }

    async verifyHotelPage() {
        await allure.step('Verifying hotel page details', async () => {
            const hotelName = $("//h1[@class='hotel-name']");
            await isElementDisplayed(hotelName);

            const hotelPrice = $("//span[@class='hotel-price']");
            await isElementDisplayed(hotelPrice);
        });
    }

    async verifyStarRating() {
        await allure.step('Verifying selected star rating filter', async () => {
            const { starRating } = data.booking;
            const starRatingElement = $(`(//div[@data-filters-item='used_filters:class=${starRating}']//div[text()='${starRating} stars'])[1]`);
            await isElementDisplayed(starRatingElement);
            const starRatingText = await getElementText(starRatingElement);
            expect(starRatingText).to.equal(`${starRating} stars`, `Expected ${starRating} stars to be displayed`);
        });
    }
}

export default BookingPage;
