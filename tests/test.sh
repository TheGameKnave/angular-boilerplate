echo "\nRunning translation validation\n\n"
cd tests/translation && ts-node translation-validation.ts

echo "\nRunning server tests\n\n"
cd ../../server && npm test

echo "\nRunning client tests\n\n"
cd ../client && npm test

echo "\nRunning e2e tests\n\n"
cd ../ && npx testcafe "chrome '--window-size=1280,1024'" tests/e2e/run -s tests/e2e/screenshots --take-snapshot actual --app "npm run dev" --hostname localhost

echo "\nRunning screenshot diff tests\n\n"
npx testcafe-blink-diff tests/e2e/screenshots --compare base:actual --open --threshold 0.005