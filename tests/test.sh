cd tests/translation && ts-node translation-validation.ts

cd ../../server && npm test
cd ../client && npm test
cd ../ && npx testcafe "chrome '--window-size=1280,1024'" tests -s tests/e2e/screenshots --take-snapshot actual --app "npm run dev" --hostname localhost
npx testcafe-blink-diff tests/e2e/screenshots --compare base:actual --open --threshold 0.005