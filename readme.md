# download-all-images-from-website
downloads all images in `<img />` from website and keeps folder structure.

## Install
`npm install download-all-images-from-website`

## Usage
```
download-all-images-from-website --host https://www.github.com/ --path /ninjaonsafari/ --dest test tif=jpg
```

This will download all images from `https://www.github.com/ninjaonsafari/` and saves them to the relative `test` folder.
It also changes the extension `tif` to `jpg`.

## Roadmap
- [ ] add flatten (boolean)
- [ ] replace/overwrite image if it exists (boolean)
- [ ] more information about downloads (eg. count of all images downloaded)

## Changelog
- **0.0.2** added readme and license
- **0.0.1** intial implementation

## License
MIT © [Tobias Lopez](https://github.com/ninjaonsafari)