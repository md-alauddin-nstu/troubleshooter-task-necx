import { test, expect } from '@playwright/test';

test.describe('User Creation', () => {
  let backendReady = false;

  test.beforeAll(async () => {
    // Clear any existing test data
    try {
      await fetch('http://localhost:3001/api/health');
      backendReady = true;
    } catch (e) {
      console.log('Backend not ready:', e.message);
    }
  });

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000); // Increase timeout for setup

    if (!backendReady) {
      throw new Error('Backend is not ready. Please ensure backend server is running on port 3001');
    }

    // Enable request/response logging
    page.on('request', request => 
      console.log(`>> ${request.method()} ${request.url()}`));
    
    page.on('response', async response => {
      console.log(`<< ${response.status()} ${response.url()}`);
      if (response.status() >= 400) {
        try {
          const body = await response.json();
          console.log('Error response:', body);
        } catch (e) {
          console.log('Could not parse error response');
        }
      }
    });

    // Navigate to home page and wait for network idle
    await page.goto('/', { 
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Reset users.json before test
    const response = await fetch('http://localhost:3001/api/users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(e => console.log('Could not reset users:', e));

    if (!response?.ok) {
      console.log('Warning: Could not reset users before test');
    }
  });

  test('should create a new user', async ({ page }) => {
    // Wait for the API to be ready
    await page.waitForTimeout(2000);

    // Wait for the create user input
    const createUserInput = await page.locator('input[placeholder="Create user..."]');
    await createUserInput.waitFor({ state: 'visible', timeout: 5000 });
    
    // Fill the input
    await createUserInput.fill('Test User');
    
    // Click create button
    const createButton = page.getByRole('button', { name: 'Create' });
    await createButton.click();
    
    // Wait for the response to be processed
    await page.waitForTimeout(2000);
    
    // Check if user was added to dropdown
    const select = page.locator('#users');
    await expect(select).toContainText('Test User');
  });
});