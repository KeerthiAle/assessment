import { Given, When, Then } from "@wdio/cucumber-framework";
import BookingPage from "../pageobjects/booking.page";

let bookingPage = new BookingPage();

Given(/^I navigate to Booking.com$/, async () => {
    
    await bookingPage.navigateToBookingPage();

});

When(/^I search for hotels in "([^"]*)"$/, async () => {

    await bookingPage.searchForAccommodation();
});

Then(/^I validate the search results and filter options$/, async () => {
    await bookingPage.validateHomePage();
});

Given(/^I select an accommodation from the list$/, async () => {
    await BookingPage.selectAccommodation();
});

Then(/^I verify the accommodation details$/, async () => {
    await BookingPage.verifyAccommodationDetails();
});
