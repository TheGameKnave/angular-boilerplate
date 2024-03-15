cd "server" && ^ 
@echo off
if exist "build" (
    rd /s /q build
) else (
    echo Directory does not exist.
) && ^ 
"tsc" && "npx nyc jasmine" 
