const puppeteer = require('puppeteer');
import { waitFor } from '@testing-library/react';

describe('show/hide event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
      browser = await puppeteer.launch(
        // {
        // headless: false,
        // slowMo: 250, // slow down by 250ms,
        // timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
        // }
      );
      page = await browser.newPage();
      await page.goto('http://localhost:3000/');
      await page.waitForSelector('.event');
    });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).not.toBeNull();
  });
    
  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});

describe('Filter events by city', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch(
      // {
      // headless: false,
      // slowMo: 250, // slow down by 250ms,
      // timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
      // }
    );
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector("#event-list");
  });

afterAll(() => {
  browser.close();
});

  test('When user hasn’t searched for a specific city, show upcoming events from all cities', async () => {
    const eventLocations = await page.evaluate(() => {
      const eventElements = document.querySelectorAll('.event');
      const topTwoEvents = Array.from(eventElements).slice(0, 2);
      return topTwoEvents.map(eventElement => {
        const locationElement = eventElement.querySelector('p:nth-child(3)');
        return locationElement.textContent;
      });
    });
  
    // Compare the locations of the top 2 events
    const [location1, location2] = eventLocations;
    expect(location1).not.toEqual(location2);
  })

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.click('#city-search')
    await page.type('#city-search', 'Berlin')

    const citySuggestions = await page.$$('.suggestions li');
    const suggestionElements = citySuggestions.length;
    expect(suggestionElements).toBeGreaterThan(1);
  });

  test('User can select a city from the suggested list', async () => {
    await page.click('.city');

    await page.click('.selection');

    const locationElementText = await page.evaluate(() => {
      const eventListItem = document.querySelector('#event-list .event');
      const locationElement = eventListItem.querySelector('p:nth-child(3)');
      return locationElement.textContent;
    })

    expect(locationElementText).toEqual('Berlin, Germany')
  })
});
