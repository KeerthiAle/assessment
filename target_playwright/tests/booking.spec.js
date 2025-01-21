import { test, expect } from '@playwright/test';
import BookingPage from '../pageObject/BookingPage';

test.describe('T001-Booking.com Automation Test', () => {
  let bookingPage;

  test.beforeEach(async ({ page }) => {
    bookingPage = new BookingPage(page);
    await bookingPage.navigateToBooking();
  });

  test('Test Booking.com Search and Filter Functionality', async () => {
    await bookingPage.verifyPageTitleAndURL();
    await bookingPage.searchForAccommodation();
    await bookingPage.applyFilters();
    await bookingPage.selectAccommodationFromSearch();
    await bookingPage.verifySelectedHotelName();
  });
});
