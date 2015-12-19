var url = require('url');

module.exports = function(rawStr) {
	var fullStr = function determineProtocol(str) {
		// Style: Already in URL protocol format
		if (/^ssh:\/\//.test(str)) return str;

		// Style: auth@host:path
		var bits = /^(.*?)@(.*?):(.*)$/.exec(str);
		if (bits) return 'ssh://' + bits[1] + '@' + bits[2] + '/' + bits[3];

		// Style: host:path
		var bits = /^(.*?):(.*)$/.exec(str);
		if (bits) return 'ssh://' + bits[1] + '/' + bits[2];
	}(rawStr);

	// Finally parse and return everything
	var parsed = url.parse(fullStr);

	if (!parsed.port) parsed.port = '22'; // Assume default SSH port unless otherwise specified

	// Clip prefix off paths
	parsed.path = parsed.path.substr(1);
	parsed.pathname = parsed.pathname.substr(1);

	return parsed;
};
