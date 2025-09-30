@echo off
echo Setting up Android Development Environment...

:: Set Android environment variables
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
setx ANDROID_SDK_ROOT "%LOCALAPPDATA%\Android\Sdk"
setx JAVA_HOME "C:\Program Files\Android\Android Studio\jbr"

:: Update PATH (current session)
set PATH=%PATH%;%LOCALAPPDATA%\Android\Sdk\platform-tools
set PATH=%PATH%;%LOCALAPPDATA%\Android\Sdk\tools
set PATH=%PATH%;%LOCALAPPDATA%\Android\Sdk\emulator
set PATH=%PATH%;"C:\Program Files\Android\Android Studio\jbr\bin"

echo.
echo Environment variables set successfully!
echo Please restart your terminal/VS Code for changes to take effect.
echo.
echo To test your setup:
echo   adb version
echo   java -version
echo   emulator -list-avds
echo.
pause
