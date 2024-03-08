import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';

fixture `App tests`
    .page('http://localhost:4200')
    .beforeEach(async () => {
        await waitForAngular();
    });

const rootAngular = AngularSelector();

test('Angular selector', async t => {
    await t
        .expect(rootAngular.exists).ok()
});
test('Click Button Test', async t => {
    await t.click('button');
});