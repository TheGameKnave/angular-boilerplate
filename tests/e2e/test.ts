import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';
import { takeSnapshot } from 'testcafe-blink-diff';
import { Selector } from 'testcafe';

fixture `App tests`
    .page('http://localhost:4200')
    .beforeEach(async () => {
        await waitForAngular();
    });
test('Measure Page Load Time', async t => {
    const startTime = await t.eval(() => performance.now());

    await t
        .wait(1000) // Wait for the page to fully load
        .expect(Selector('body').exists).ok() // Wait for the body element to be present
        .wait(500); // Wait for the page to render

    const endTime = await t.eval(() => performance.now());
    const pageLoadTime = endTime - startTime;

    console.log(`Page load time: ${pageLoadTime} milliseconds`);
});
test('Click Button Once', async t => {
    await t
        // .takeScreenshot('App_tests/Click_Button_Test/test-screenshot-1.png')
        .click('button');
        // .takeScreenshot('App_tests/Click_Button_Test/test-screenshot-2.png');

        await takeSnapshot(t);
});
test('Click Button Twice', async t => {
    await t
        // .takeScreenshot('App_tests/Click_Button_Test_2/test-screenshot-1.png')
        .click('button')
        .click('button');
        // .takeScreenshot('App_tests/Click_Button_Test_2/test-screenshot-2.png');
    await takeSnapshot(t);
})