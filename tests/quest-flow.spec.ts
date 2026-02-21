import { test, expect } from '@playwright/test';
import path from 'path';

test('VisionVault Full User Journey', async ({ page }) => {
  // 1. Navigate to the app
  // Ensure the local server is running (e.g. npm run dev) before running this test
  await page.goto('http://localhost:3000');

  // Assert page title or header
  await expect(page.locator('h1')).toContainText('VisionVault');

  // 2. Fill in the Bitcoin Cash address
  const bchInput = page.getByPlaceholder('bitcoincash:qp3wjpa3...');
  await bchInput.fill('bchtest:qqvd7728rcvanul5f5qw6hsxa3nfkp4qzutmpuamkn');
  
  // 3. Upload the test image
  // The file input is hidden, so we use setInputFiles on the file type input locator
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles('test-image.jpg');

  // Assert that file name appears (UI feedback)
  await expect(page.getByText('test-image.jpg')).toBeVisible();

  // 4. Click Verify & Claim
  const verifyButton = page.getByRole('button', { name: 'Verify & Claim Bounty' });
  await verifyButton.click();

  // 5. Assert Loading State
  await expect(page.getByText('Verifying with Vision AI...')).toBeVisible();

  // 6. Assert Success State
  // This can take a few seconds due to API calls
  await expect(page.getByText('Verification Complete!', { exact: false })).toBeVisible({ timeout: 15000 });
  
  // 7. Assert Transaction Link availability
  await expect(page.getByRole('link', { name: 'View on Block Explorer' })).toBeVisible();
  
  console.log('Test completed successfully!');
});
