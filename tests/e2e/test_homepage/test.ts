import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';
import { takeSnapshot } from 'testcafe-blink-diff';
import { Selector, test } from 'testcafe';
import { ClientFunction } from 'testcafe';
import { getThreshold } from '../data/constants';

// making memory exception. Might want to move to global ts file
declare global {
    interface Performance {
        memory: {
            jsHeapSizeLimit: number;
            totalJSHeapSize: number;
            usedJSHeapSize: number;
        };
    }
}
// page load time stuff
const isPageLoaded = ClientFunction(() => {return document.readyState === 'complete';});

// helper functions for Measure Memory
const getMemory = async t => JSON.parse(
    await t.eval(() => {
    const { jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize } = window.performance.memory;
    console.log({ jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize });
    return JSON.stringify({ jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize });
}));
//compare current memory against memory threshold
const validateMemory = (memoryVal: { jsHeapSizeLimit: number; usedJSHeapSize: number; totalJSHeapSize: number }, threshold: number) => {
    const { jsHeapSizeLimit, usedJSHeapSize, totalJSHeapSize } = memoryVal;
    const isMemoryLowerThanThreshold =  usedJSHeapSize < threshold;
    return isMemoryLowerThanThreshold;
};

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
    await t.expect(pageLoadTime).lt(getThreshold("pageLoad"));
    console.log(`Page load time: ${pageLoadTime} milliseconds`);
});
test('Click Button Once', async t => {
    const elementOne = Selector('app-example-one');
    const elementTwo = Selector('app-example-two'); 
    await t
    // checks the DOM for the elements that change during the button press
        .expect(elementOne.exists).ok()
        .expect(!elementTwo.exists).notOk()

    // then clicks the button, looks for changes
        .click('button')
        .expect(elementTwo.exists).ok()
        .expect(!elementOne.exists).notOk();

        await takeSnapshot(t);
});
test('Click Button Twice', async t => {
    const elementOne = Selector('app-example-one');
    const elementTwo = Selector('app-example-two'); 
    await t
        .expect(elementOne.exists).ok()
        .expect(!elementTwo.exists).notOk()
        
        .click('button')
        .expect(elementTwo.exists).ok()
        .expect(!elementOne.exists).notOk()
        
        .click('button')
        .expect(elementOne.exists).ok()
        .expect(!elementTwo.exists).notOk();
    await takeSnapshot(t);
});
test('Measure Memory Usage', async t => {
    const memoryVal = await getMemory(t);
    await t.expect(validateMemory(memoryVal, getThreshold("memory"))).ok(`Memory usage exceeds the threshold: ${JSON.stringify(memoryVal)}`);
});