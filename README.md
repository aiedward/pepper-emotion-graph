# Emotion Graph

This D3 graph is showing the emotions given by Pepper's ALMood service.

![Screenshot](screenshot.png)

## How to use it

### Install Dependencies

`npm`, `bower` and `gulp` need to be installed (On Mac for example: `brew install npm; npm install -g bower gulp`). 
Install all frontend and build dependencies by:

```
npm install
bower install
```

Edit the `buildDir` variable in `Gulpfile.js` to the correct Pepper html folder of your Choregraph project.

```
gulp build
```

Open index.html in the webview using Choregraph or Pepper.

