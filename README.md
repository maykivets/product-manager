### run
`npm i`

### to develop in a browser run
`ionic serve`

### run
`ionic build`

(if you want to generate a production
 build for your application add the --prod flag.)

#### add either iOS or Android platform by using the commands:
```
ionic cap add ios
ionic cap add android
```
(you need XCode installed on a Mac to build for iOS)

### run
```ionic cap sync```
to sync platforms and copy over the build to the platform respective folder

#### used NodeJS 10

##### removed the following packages due to using Capacitor that has working APIs to replace those plugins so there’s no need to keep them installed anymore:
`@ionic-native/core`
`@ionic-native/splash-screen` 
`@ionic-native/status-bar`

### Notes:

install ionic cli

install cocoapods (using MacOS)
run 
```sudo gem install cocoapods```
(in case of errors make sure "TLS v1.2 support" is true, see
https://github.com/rubygems/rubygems/issues/2374#issuecomment-460178223)

### in case there is no file capacitor.config.json, run once
`ionic integrations enable capacitor`
and edit the capacitor.config.json file (set appId to com.name.appName)