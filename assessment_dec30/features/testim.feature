Feature: Testim Application Automation

  Scenario: Navigate to Testim Application and Validate Header Components
    Given I navigate to the Testim application
    Then I validate the header components

  Scenario: Navigate to the "Company" Section
    Given I navigate to the Company section
    Then I validate subsections of Company section

  Scenario: Validate Customer Review and Footer Components
    Given I retrieve and store a customer review
    When I cross-validate the stored review
    Then I validate the footer components
