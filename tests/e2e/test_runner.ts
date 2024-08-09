const createTestCafe = require("testcafe");
const { exec } = require("child_process");

(async () => {
  const serverProcess = await exec("npm run prod");
  const testcafe = await createTestCafe();

  try {
    const runner = testcafe.createRunner();

    const failedCount = await runner
      .browsers([
        "chrome:headless --window-size=1280,1024",
        "firefox:headless --window-size=1280,1024",
        "safari --window-size=1280,1024",
        "edge --window-size=1280,1024",
        "opera --window-size=1280,1024",
        "chrome:emulation:device=iphone X"
      ])
      .src(["run/test.ts"]) // Specify the test files or directories
      .screenshots({
        path: "screenshots", // Set the screenshot path
        takeOnFails: true // Take screenshots on failures
      })
      .reporter("spec") // Optional: Choose a reporter, e.g., spec, list, etc.
      .run({
        skipJsErrors: true, // Handle JS errors gracefully
        selectorTimeout: 5000, // Increase selector timeout if needed
        assertionTimeout: 7000, // Increase assertion timeout if needed
        pageLoadTimeout: 8000, // Increase page load timeout if needed
        speed: 1, // Adjust the test speed (1 is the default)
      });

    console.log("Tests failed: " + failedCount);
  } finally {
    await testcafe.close();
    serverProcess.kill();
  }
})();