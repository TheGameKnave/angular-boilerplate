import { Selector } from 'testcafe';

const host_url: string = 'https://jsonplaceholder.typicode.com';

// Define a TestCafe fixture with the base URL
fixture('API Tests with TestCafe')
    .page(host_url);

// Test to query an API
test('should be able to query an API', async (t: TestController) => {
    // Navigate to the endpoint for fetching a specific post
    await t
        .navigateTo('/posts/1')
        // Check if the body contains the expected content
        .expect(Selector('body').innerText).contains('your expected content');
});

// Test to submit to an API
test('should be able to submit to an API', async (t: TestController) => {
    // Navigate to the endpoint for submitting posts
    await t
        .navigateTo('/posts')
        // Adjust the speed if necessary
        .setTestSpeed(0.5)
        // Fill in the form fields with relevant data
        .typeText('textarea[name="title"]', 'animal')
        .typeText('textarea[name="body"]', 'cat')
        .typeText('textarea[name="userId"]', '1')
        // Click the submit button
        .click('button[type="submit"]')
        // Check if the body contains the expected content after submission
        .expect(Selector('body').innerText).contains('your expected content');
});
