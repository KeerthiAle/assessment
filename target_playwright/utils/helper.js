import fs from 'fs';
import path from 'path';
import { expect } from '@playwright/test';

export const extractPrice = (priceText) => {
  return parseFloat(priceText.replace('$', '').trim());
};

export const extractDiscountPercentage = (discountPercentageText) => {
  return parseFloat(discountPercentageText.replace('%', '').trim());
};

export const waitForVisibility = async (locator) => {
  await locator.waitFor({ state: 'visible' });
};
export async function storeDataToFile(data, fileName) {
  try {
    const filePath = path.resolve(__dirname, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Data successfully stored in ${filePath}`);
  } catch (error) {
    console.error('Error writing to file', error);
    throw new Error('Error writing to file');
  }
}


export function readDataFromFile(fileName) {
  try {
    const filePath = path.resolve(__dirname, fileName);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading from file', error);
    throw new Error('Error reading from file');
  }
}
export async function verifyPageTitle(page, title) {
  await expect(page).toHaveTitle(new RegExp(title));
}

export async function verifyPageUrl(page, url) {
  expect(page.url()).toBe(url);
}

export async function verifyMetaTag(page, metaName) {
  const metaTag = await page.locator(`meta[name='${metaName}']`).getAttribute('content');
  return metaTag !== null;
}

export async function handlePopUps(page) {
  const skipAdButton = page.locator('button.ytp-ad-skip-button');
  if (await skipAdButton.isVisible()) {
    await skipAdButton.click();
  }

  const signInButton = page.locator('button[aria-label="Sign in to Continue"]');
  if (await signInButton.isVisible()) {
    await signInButton.click();
  }
}
