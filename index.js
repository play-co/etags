/** @license
 * This file is part of the Game Closure SDK.
 *
 * The Game Closure SDK is free software: you can redistribute it and/or modify
 * it under the terms of the Mozilla Public License v. 2.0 as published by Mozilla.

 * The Game Closure SDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Mozilla Public License v. 2.0 for more details.

 * You should have received a copy of the Mozilla Public License v. 2.0
 * along with the Game Closure SDK.  If not, see <http://mozilla.org/MPL/2.0/>.
 */

var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

function md5file (filename, cb) {
	var md5sum = crypto.createHash('md5');
	try {
		var s = fs.createReadStream(filename);
	} catch (e) {
		return cb(e);
	}

	s.on('error', function (e) { cb(e); });
	s.on('data', function(d) { md5sum.update(d); });
	s.on('end', function() {
		cb(null, md5sum.digest('hex'));
	});
}

exports.hash = function (filename, cb) {
	fs.stat(filename, function (err, stat) {
		if (err) { return cb(err); }

		md5file(filename, function (err, md5) {
			cb(err, !err && (md5 + '|' + (+stat.mtime)));
		});
	});
}
