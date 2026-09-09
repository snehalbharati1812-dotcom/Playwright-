import { test, expect } from '@playwright/test';

// Real-world Microservices API Endpoints (ReqRes)
const BASE_URL = 'https://reqres.in';

test.describe('Microservices API Automation Suite', () => {

  // 1. User Microservice: Get Single User Details (GET Request)
  test('User Microservice - Fetch User Profile', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/users/2`);
    
    // Status Code Validation (200 OK)
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('User Microservice Response:', responseBody);

    // Data Validation
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.first_name).toBe('Janet');
  });

  // 2. Auth/User Microservice: Create New User (POST Request)
  test('User Microservice - Create User Profile', async ({ request }) => {
    const newUser = {
      name: 'Snehal',
      job: 'QA Automation Engineer'
    };

    const response = await request.post(`${BASE_URL}/api/users`, {
      data: newUser
    });

    // Status Code Validation (201 Created)
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    console.log('Created User Microservice Response:', responseBody);

    // Field Validations
    expect(responseBody.name).toBe('Snehal');
    expect(responseBody.job).toBe('QA Automation Engineer');
    expect(responseBody).toHaveProperty('id');
  });

  // 3. Delete Microservice: Delete User (DELETE Request)
  test('User Microservice - Delete User Profile', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/api/users/2`);

    // Status Code Validation (204 No Content)
    expect(response.status()).toBe(204);
    console.log('User Microservice: User successfully deleted!');
  });

});