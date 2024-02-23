import { Selector } from 'testcafe';

fixture('API Tests')
    .page('https://jsonplaceholder.typicode.com'); // Replace with the URL of application

test('should be able to get data from API', async (t: TestController) => {
    const fetchDataButton: Selector = Selector('#fetchDataButton'); // Replace with the actual selector for the fetch data button
    const resultElement: Selector = Selector('#resultElement'); // Replace with the actual selector for the element displaying the result

    // Click the button to trigger the API request
    await t.click(fetchDataButton);

    // Wait for the result to be displayed
    await t.expect(resultElement.exists).ok();

    // Get the result text
    const resultText: string = await resultElement.textContent;

    // Assert the result (you may need to adjust this based on the actual API response format)
    await t.expect(resultText).contains('ExpectedData'); // Replace with the expected data or a part of it
});
