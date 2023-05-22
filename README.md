# lawfulwizards-dev
Apps in development for Lawful Wizards GmbH


To generate a debug apk we should do following steps 

before we start we should have react-native setup and npm installed

Step 1: Go to the root of the project in the terminal and run the below command:

npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res


Step 2: Go to android directory:

cd android


Step 3: Now in this android folder, run this command

./gradlew assembleDebug


There! you’ll find the apk file in the following path:

yourProject/android/app/build/outputs/apk/debug/app-debug.apk
