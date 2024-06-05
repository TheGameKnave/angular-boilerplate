const createTestCafe = require("testcafe");

(async () => {
  const testcafe = await createTestCafe("localhost", 4200);

  try {
    const runner = testcafe.createRunner();

    const failedCount = await runner
      .browsers(["chrome --window-size=1280,1024"])
      .src(["tests/e2e/test_homepage/test.ts"])
      .run();

    console.log("Tests failed: " + failedCount);
  } finally {
    await testcafe.close();
  }
})();