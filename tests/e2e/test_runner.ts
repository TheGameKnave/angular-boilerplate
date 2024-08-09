const createTestCafe = require("testcafe");
const { exec } = require("child_process");

process.env.TEST_MODE = process.env.TEST_MODE || 'tested';

(async () => {
  const serverProcess = await exec("npm run dev");
  const testcafe = await createTestCafe();

  try {
    const runner = testcafe.createRunner();

    const failedCount = await runner
      .browsers([
        "chrome:headless --window-size=1280,1024",
        // "firefox --window-size=1280,1024",
        // "safari --window-size=1280,1024",
        "edge --window-size=1280,1024",
        // "opera --window-size=1280,1024",
        "chrome:emulation:device=iphone X",
      ])
      .src(["run/test.ts"]) // Specify the test files or directories
      .screenshots({
        path: 'screenshots/',
        takeOnFails: false,
      })
      .run({
      });

    console.log("Tests failed: " + failedCount);
  } finally {
    await testcafe.close();
    serverProcess.kill();
  }
})();