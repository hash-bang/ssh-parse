ssh-parse
=========
Parse a SSH/SCP/Rsync style address in a `URL.parse()` compatible way.

	var sshParse = require('ssh-parse');

	var parsed = sshParse('someone@somewhere:~/some/path');
	console.log(parsed);

	// Returns:

	Url {
	  protocol: 'ssh:',
	  slashes: true,
	  auth: 'someone',
	  host: 'somewhere',
	  port: 22,
	  hostname: 'somewhere',
	  hash: null,
	  search: null,
	  query: null,
	  pathname: '~/some/path',
	  path: '~/some/path',
	  href: 'ssh://someone@somewhere/~/some/path' }
	}


See the [test file](test/test.js) for more specific examples.
