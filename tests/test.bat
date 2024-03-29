@echo off

cd server && npm test && ^
cd ../client && npm test && ^
cd ../ && npx testcafe chrome tests --app "npm run dev"