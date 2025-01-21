Feature: Booking.com Hotel Search Automation

  Scenario: Search for Hotels on Booking.com
    Given I navigate to Booking.com
    When I search for the destination
    Then I validate the search results and filter options

  Scenario: Select and Validate Accommodation
    Given I select an accommodation from the list
    Then I verify the accommodation details
