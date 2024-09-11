import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';
import { takeSnapshot } from 'testcafe-blink-diff';
import { Selector, test } from 'testcafe';
import { ClientFunction } from 'testcafe';
import { getThreshold } from '../data/constants';
import { SUPPORTED_LANGUAGES } from '../../../client/src/app/helpers/constants';
// import { LANGUAGES } from 'i18n-l10n-flags';

const screenshotMode = process.env.TEST_MODE || 'tested';

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
test('Click exampleOne', async t => {
    const savePath = `${t.browser.alias.replace(/[^a-z0-9]/gi, '_')}/${screenshotMode}.png`;
    const elementOne = Selector('app-example-one');
    const elementTwo = Selector('app-example-two'); 
    await t
    // checks the DOM for the elements that change during the button press
        .expect(elementOne.exists).notOk()
        .expect(elementTwo.exists).notOk()

    // then clicks the button, looks for changes
        .click('button.component-example-one')
        .expect(elementOne.exists).ok()
        .expect(elementTwo.exists).notOk();
    const screenshotDir = `Click_exampleOne/${savePath}`
    await t.takeScreenshot(screenshotDir);
});
test('Click exampleTwo', async t => {
    const savePath = `${t.browser.alias.replace(/[^a-z0-9]/gi, '_')}/${screenshotMode}.png`;
    const elementOne = Selector('app-example-one');
    const elementTwo = Selector('app-example-two'); 
    await t
    // checks the DOM for the elements that change during the button press
        .expect(elementOne.exists).notOk()
        .expect(elementTwo.exists).notOk()

    // then clicks the button, looks for changes
        
        .click('button.component-example-two')
        .expect(!elementOne.exists).notOk()
        .expect(elementTwo.exists).ok();
    const screenshotDir = `Click_exampleTwo/${savePath}`
    await t.takeScreenshot(screenshotDir);
});
test('Click appVersion', async t => {
    const savePath = `${t.browser.alias.replace(/[^a-z0-9]/gi, '_')}/${screenshotMode}.png`;
    const elementOne = Selector('app-example-one');
    const appVersion = Selector('app-app-version'); 
    await t
    // checks the DOM for the elements that change during the button press
        .expect(elementOne.exists).notOk()
        .expect(appVersion.exists).notOk()

    // then clicks the button, looks for changes
        
        .click('button.component-app-version')
        .expect(!elementOne.exists).notOk()
        .expect(appVersion.exists).ok();
    const screenshotDir = `Click_appVersion/${savePath}`
    await t.takeScreenshot(screenshotDir);
});
test('Click Clear', async t => {
    const savePath = `${t.browser.alias.replace(/[^a-z0-9]/gi, '_')}/${screenshotMode}.png`;
    const elementOne = Selector('app-example-one');
    const elementTwo = Selector('app-example-two'); 
    await t

    // then clicks the button, looks for changes
        .click('button.component-example-one')
        .expect(elementOne.exists).ok()
        .expect(elementTwo.exists).notOk()
        
        .click('button.component-example-two')
        .expect(elementOne.exists).notOk()
        .expect(elementTwo.exists).ok()

        .click('button.component-clear')
        .expect(elementOne.exists).notOk()
        .expect(elementTwo.exists).notOk();
    const screenshotDir = `Click_Clear/${savePath}`
    await t.takeScreenshot(screenshotDir);
});
test('Measure Memory Usage', async t => {
    const memoryVal = await getMemory(t);
    await t.expect(validateMemory(memoryVal, getThreshold("memory"))).ok(`Memory usage exceeds the threshold: ${JSON.stringify(memoryVal)}`);
});
test('Test Language Change', async t => {
  let buttons: {[key: string]: Selector} = {};
  SUPPORTED_LANGUAGES.forEach((lang) => {
    buttons[lang + 'Button'] = Selector(`.i18n-${lang}`);
  });
  
  for (const key of Object.keys(buttons)) {
    if (key !== 'enButton') {
      // Click on each language button
      await t.click(buttons[key]);
      // Test if the page has been translated to not-english
      await t
        .expect(Selector('app-root > :nth-child(2)').innerText).notEql("Hello world");
    }
  }

  // Click on the English button
  await t.click(buttons.enButton);
  // Test if the page has been translated to English
  await t
    .expect(Selector('app-root > :nth-child(2)').innerText).eql("Hello world");
  });
