import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';
import { takeSnapshot } from 'testcafe-blink-diff';
import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';

// page load time stuff
const isPageLoaded = ClientFunction(() => {return document.readyState === 'complete';});
const pageLoadTimeThreshold = 25; // Threshold in milliseconds. Decided by function later

fixture `App tests`
    .page('http://localhost:4200')
    .beforeEach(async () => {
        await waitForAngular();
    });
// measures page load time, fails if load time over threshold
test('Measure Page Load Time', async t => {
    const startTime = await t.eval(() => performance.now());

    await t.expect(isPageLoaded()).ok();

    const endTime = await t.eval(() => performance.now());
    const pageLoadTime = endTime - startTime;
    await t.expect(pageLoadTime).lt(pageLoadTimeThreshold);
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