## Handle Navigation in SharePoint Framework Application Customizer (spfx-applicationextension-preallocate-space)

Modern SharePoint supports partial rendering. The component inside application customizer does not get an update as the page loads partially. Adding navigatedEvent listener inside onInit function re-render our component every time we navigate to another page.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
