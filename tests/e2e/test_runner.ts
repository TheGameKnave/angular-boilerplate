const createTestCafe = require("testcafe");

(async () => {
  const testcafe = await createTestCafe("localhost", 4200);

  try {
    const runner = testcafe.createRunner();

    const failedCount = await runner
      .src(["./test_homepage/test.ts"])
      .browsers(["chrome --window-size=1280,1024"])
      .run();

    console.log("Tests failed: " + failedCount);
  } finally {
    await testcafe.close();
  }
})();