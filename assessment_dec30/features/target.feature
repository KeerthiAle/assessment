Feature: Target Shopping Automation

  Scenario: Navigate to Target and Search for a product
    Given I navigate to Target.com
    When I search for a product
    Then I validate the search results

  Scenario: Select a Watch and Validate Discount
    Given I select a watch
    When I validate the discount
    Then I confirm the discount calculation is correct