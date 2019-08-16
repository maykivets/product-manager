### run
`npm i`

### run
`ionic build`

(if you want to generate a production
 build for your application add the --prod flag.)

#### add either iOS or Android platform by using the commands:
```
ionic cap add ios
ionic cap add android
```
(android added)
(you need XCode installed on a Mac to build for iOS)

### run
```ionic cap sync```
to sync platforms and copy over the build to the platform respective folder

#### used NodeJS 10

##### removed the following packages due to using Capacitor that has working APIs to replace those plugins so there’s no need to keep them installed anymore:
`@ionic-native/core`
`@ionic-native/splash-screen` 
`@ionic-native/status-bar`

