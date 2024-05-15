@echo off

cd server && npm test && ^
cd ../client && npm test && ^
cd ../ && npx testcafe "chrome '--window-size=1280,1024'" tests -s tests/e2e/screenshots --take-snapshot tested --app "npm run dev" --hostname localhost && ^
npx testcafe-blink-diff tests/e2e/screenshots --compare accepted:tested --open --threshold 0.005