cd server && npm test
cd ../client && npm test
cd ../ && npx testcafe test_runner.ts -s tests/e2e/screenshots --take-snapshot actual --app "npm run dev"
npx testcafe-blink-diff tests/e2e/screenshots --compare base:actual --open --threshold 0.005