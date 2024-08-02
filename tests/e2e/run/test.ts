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
test('Test Language Change', async t => {
  const englishButton = Selector('.i18n-en');
  const germanButton = Selector('.i18n-de');
  const frenchButton = Selector('.i18n-fr');
  const spanishButton = Selector('.i18n-es');
  const chineseButton = Selector('.i18n-zh-CN');
  const taiwaneseButton = Selector('.i18n-zh-TW');
  

  // Click on the English button
  await t.click(englishButton);
  // Test if the page has been translated to English
  await t
    .expect(Selector('app-root > :nth-child(1)').innerText).eql("Angular Boilerplate")
    .expect(Selector('app-root > :nth-child(3)').innerText).eql("Hello world")
    .expect(Selector('app-root > :nth-child(4)').innerText).eql("There are 2 components.")
    .expect(Selector('app-example-one > p, app-example-two > p').innerText).eql("Example One works!" || "Example Two works!")
    .expect(Selector('button').innerText).eql("Switch to example Two" || "Switch to example One");
    

  // Click on the German button
  await t.click(germanButton);
  // Test if the page has been translated to German
  await t
    .expect(Selector('app-root > :nth-child(1)').innerText).eql("Angular Boilerplate")
    .expect(Selector('app-root > :nth-child(3)').innerText).eql("Hallo Welt")
    .expect(Selector('app-root > :nth-child(4)').innerText).eql("Es gibt 2 Komponenten.")
    .expect(Selector('app-example-one > p, app-example-two > p').innerText).eql("Beispiel Eins funktioniert!" || "Beispiel Zwei funktioniert!")
    .expect(Selector('button').innerText).eql("Wechseln zu Beispiel Zwei" || "Wechseln zu Beispiel Eins");

  // Click on the French button
  await t.click(frenchButton);
  // Test if the page has been translated to French
  await t
      .expect(Selector('app-root > :nth-child(1)').innerText).eql("Modèle Angular")
      .expect(Selector('app-root > :nth-child(3)').innerText).eql("Bonjour le monde")
      .expect(Selector('app-root > :nth-child(4)').innerText).eql("Il y a 2 composants.")
      .expect(Selector('app-example-one > p, app-example-two > p').innerText).eql("L'exemple Un fonctionne !" || "L'exemple Deux fonctionne !")
      .expect(Selector('button').innerText).eql("Passer à l'exemple Deux" || "Passer à l'exemple Un");

  // Spanis
  await t.click(spanishButton);
  // Test if the page has been translated to Spanish
  await t
      .expect(Selector('app-root > :nth-child(1)').innerText).eql("Plantilla Angular")
      .expect(Selector('app-root > :nth-child(3)').innerText).eql("Hola mundo")
      .expect(Selector('app-root > :nth-child(4)').innerText).eql("Hay 2 componentes.")
      .expect(Selector('app-example-one > p, app-example-two > p').innerText).eql("¡El ejemplo Uno funciona!" || "¡El ejemplo Dos funciona!")
      .expect(Selector('button').innerText).eql("Cambiar al ejemplo Dos" || "Cambiar al ejemplo Uno");

  // Chinese
  await t.click(chineseButton);
  // Test if the page has been translated to Chinese
  await t
      .expect(Selector('app-root > :nth-child(1)').innerText).eql("Angular 模板")
      .expect(Selector('app-root > :nth-child(3)').innerText).eql("你好，世界")
      .expect(Selector('app-root > :nth-child(4)').innerText).eql("有 2 个组件。")
      .expect(Selector('app-example-one > p, app-example-two > p').innerText).eql("示例一运行正常！" || "示例二运行正常！")
      .expect(Selector('button').innerText).eql("切换到示例 二" || "切换到示例 一");
  // Taiwanese Mandarin
  await t.click(taiwaneseButton);
  // Test if the page has been translated to Taiwanese
  await t
      .expect(Selector('app-root > :nth-child(1)').innerText).eql("Angular 樣板")
      .expect(Selector('app-root > :nth-child(3)').innerText).eql("嗨 世界")
      .expect(Selector('app-root > :nth-child(4)').innerText).eql("有 2 個元件。")
      .expect(Selector('app-example-one > p, app-example-two > p').innerText).eql("示例一成功！" || "示例二成功！")
      .expect(Selector('button').innerText).eql("切換到示例 二" || "切換到示例 一");
  })
