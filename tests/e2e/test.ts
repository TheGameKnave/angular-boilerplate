import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';
import { takeSnapshot } from 'testcafe-blink-diff';
import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';

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
const pageLoadTimeThreshold = 25; // Threshold in milliseconds. Decided by function later

// helper functions for Measure Memory
const getMemory = async t => JSON.parse(
    await t.eval(() => {
    const { jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize } = window.performance.memory;
    console.log({ jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize });
    return JSON.stringify({ jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize });
}));
const validateMemory = (memoryVal: { jsHeapSizeLimit: number; usedJSHeapSize: number; totalJSHeapSize: number }, threshold: number) => {
    const { jsHeapSizeLimit, usedJSHeapSize, totalJSHeapSize } = memoryVal;
    console.log(memoryVal.usedJSHeapSize);
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
    await t.expect(pageLoadTime).lt(pageLoadTimeThreshold);
    console.log(`Page load time: ${pageLoadTime} milliseconds`);
});
test('Click Button Once', async t => {
    await t
        .click('button');

        await takeSnapshot(t);
});
test('Click Button Twice', async t => {
    await t
        .click('button')
        .click('button');
    await takeSnapshot(t);
});
test('Measure Memory Usage', async t => {
    console.log(await getMemory(t));
    const memoryVal = await getMemory(t);
    const threshold = 80000000;
    await t.expect(validateMemory(memoryVal, threshold)).ok(`Memory usage exceeds the threshold: ${JSON.stringify(memoryVal)}`);
});