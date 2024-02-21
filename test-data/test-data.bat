
npx "jasmine" && ^
cd "client" && ng "test" "--source-map=false" "--browsers=ChromeHeadless" "--watch=false"
cd "server" && ng "test" "--source-map=false" "--browsers=ChromeHeadless" "--watch=false"