#!/usr/bin/env node

const request = require('request');
const fs = require('fs');
const shell = require('shelljs');
const path = require('path');
const args = require('yargs')
	.usage('Usage: $0 -host [str] -path [num] -dest [str]')
	.demandOption(['host', 'path', 'dest'])
	.describe('host', 'url with http:// or https:// and without trailing slash eg: http://example.com')
	.describe('path', 'path to site with start and trailing slash eg. /path/to/site/')
	.describe('dest', 'local relative destination path')
	.argv


var options = {
	host: args.host,
	path: args.path,
	mediaDestRoot: args.dest,
	replaceExtensions: {}
};

if (args._) {
	for (var i in args._) {
		if (args._[i].indexOf('=') > 0) {
			const splitted = args._[i].split('=');
			options.replaceExtensions[splitted[0]] = splitted[1];
		}
	}
}

var getSrcs = function(body) {
	return body.match(/src="([^"]+)"/gm);
}

var getPath = function(fullpath) {
	let filename = path.basename(fullpath).split('?')[0];
	const dirname = path.dirname(fullpath);
	const ext = path.extname(filename);
	if (options.replaceExtensions && options.replaceExtensions.hasOwnProperty(ext.substring(1))) {
		filename = `${filename.split('.')[0]}.${options.replaceExtensions[ext.substring(1)]}`;
	}

	shell.mkdir('-p', dirname);

	return `${dirname}/${filename}`;
}

var download = function(uri, fullpath, callback){
	request.head(uri, (err, res, body) => {
		request(uri).pipe(fs.createWriteStream(fullpath)).on('close', callback);
	});
};

var init = function() {
	request(`${options.host}${options.path}`, function (error, response, body) {
		if (!error) {
			const srcs = getSrcs(body);
			srcs.forEach((rawSrc) => {
				const src = rawSrc.substring(5, rawSrc.length - 1);
				const fullpath = getPath(`${options.mediaDestRoot}${src}`);
				download(`${options.host}${src}`, fullpath, () => {
					console.log(`downloaded: ${src} => saved: ${fullpath}`);
				});
			})
		} else {
			console.log(error);
		}
	});
}

init();