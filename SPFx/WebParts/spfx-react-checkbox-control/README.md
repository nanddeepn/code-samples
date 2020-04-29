## spfx-react-checkbox-control

The Checkbox allows the end user to select one or more options from the list of choices. The Fluent UI (aka Office UI Fabric) controls offers nice and simple implementation for Checkbox. The Checkbox, when clicked fires the “onChange” event. When we dynamically create Checkbox collection, it is bit tricky to get the selection. The property set on Checkbox during the control creation can be retrieved from currentTarget.


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
