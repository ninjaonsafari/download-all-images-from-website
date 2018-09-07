# download-all-images-from-website
downloads all images in `<img />` from website and keeps folder structure.

## Usage
```
download-all-images-from-website --host http://fischerspindle.ch --path /produkte_test/spindles/ --dest test tif=jpg
```

This will download all images from `http://fischerspindle.ch/produkte_test/spindles/` and saves them to the relative `test` folder.
It also changes the extension `tif` to `jpg`.

## Roadmap
- [ ] add flatten (boolean)
- [ ] replace/overwrite image if it exists (boolean)
- [ ] more information about downloads (eg. count of all images downloaded)

## Changelog
**0.0.1** intial implementation

## License
MIT © [Tobias Lopez](https://github.com/ninjaonsafari)