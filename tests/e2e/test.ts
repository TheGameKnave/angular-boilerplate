import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';
import { takeSnapshot } from 'testcafe-blink-diff';

fixture `App tests`
    .page('http://localhost:4200')
    .beforeEach(async () => {
        await waitForAngular();
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