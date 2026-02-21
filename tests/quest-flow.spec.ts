import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// ── Smoke tests — verify pages load correctly ─────────────────────────────
// These tests run against the production build on GitHub Actions.
// They are "smoke tests" only — they do not test the actual BCH/AI flow
// (which requires a funded testnet wallet and HuggingFace API).

test('Home page loads with VisionVault branding', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // The app title should be present
  await expect(page).toHaveTitle(/VisionVault/i);
  console.log('✓ Home page loads OK');
});

test('Landing page loads correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/landing');
  await expect(page).toHaveTitle(/VisionVault/i);
  // Hero heading should be visible
  await expect(page.locator('h1').first()).toBeVisible();
  console.log('✓ Landing page loads OK');
});

test('Landing nav links are present', async ({ page }) => {
  await page.goto('http://localhost:3000/landing');
  // Check that key nav elements exist
  await expect(page.getByRole('link', { name: /launch app/i }).first()).toBeVisible();
  console.log('✓ Landing nav links OK');
});

test('Pricing page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/landing/pricing');
  await expect(page.locator('h1').first()).toBeVisible();
  console.log('✓ Pricing page loads OK');
});

test('FAQ page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/landing/faq');
  await expect(page.locator('h1').first()).toBeVisible();
  console.log('✓ FAQ page loads OK');
});

test('About page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/landing/about');
  await expect(page.locator('h1').first()).toBeVisible();
  console.log('✓ About page loads OK');
});

test('Contact page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/landing/contact');
  await expect(page.locator('h1').first()).toBeVisible();
  console.log('✓ Contact page loads OK');
});

test('Privacy page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/landing/privacy');
  await expect(page.locator('h1').first()).toBeVisible();
  console.log('✓ Privacy page loads OK');
});

test('Terms page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/landing/terms');
  await expect(page.locator('h1').first()).toBeVisible();
  console.log('✓ Terms page loads OK');
});
