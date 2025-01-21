Feature: YouTube Video Automation

  Scenario: Open YouTube and Search for a Video
    Given I open YouTube homepage
    When I search for Selenium tutorial
    Then I verify the search results

  Scenario: Play and Interact with a Video
    Given I click on a video from the search results
    When I interact with video controls
    Then I verify the video playback and quality options
