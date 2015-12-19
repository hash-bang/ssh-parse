var expect = require('chai').expect;
var sshParser = require('../index');

describe('SSH parser - SCP/RSYNC style', function() {
	it('should parse foo.com:~', function() {
		var parsed = sshParser('foo.com:~');
		expect(parsed).to.have.property('protocol', 'ssh:');
		expect(parsed).to.have.property('hostname', 'foo.com');
		expect(parsed).to.have.property('port', '22');
		expect(parsed).to.have.property('path', '~');
	});

	it('should parse bar.com:/foo/bar/baz', function() {
		var parsed = sshParser('bar.com:/foo/bar/baz');
		expect(parsed).to.have.property('protocol', 'ssh:');
		expect(parsed).to.have.property('hostname', 'bar.com');
		expect(parsed).to.have.property('port', '22');
		expect(parsed).to.have.property('path', '/foo/bar/baz');
	});

	it('should parse baz.com:~/baz', function() {
		var parsed = sshParser('baz.com:~/baz');
		expect(parsed).to.have.property('protocol', 'ssh:');
		expect(parsed).to.have.property('hostname', 'baz.com');
		expect(parsed).to.have.property('port', '22');
		expect(parsed).to.have.property('path', '~/baz');
	});

	it('should parse someone@quz.com:~/foo', function() {
		var parsed = sshParser('someone@quz.com:~/foo');
		expect(parsed).to.have.property('protocol', 'ssh:');
		expect(parsed).to.have.property('hostname', 'quz.com');
		expect(parsed).to.have.property('port', '22');
		expect(parsed).to.have.property('path', '~/foo');
		expect(parsed).to.have.property('auth', 'someone');
	});

	it('should parse ssh://someone@quuz.com/~/bar', function() {
		var parsed = sshParser('ssh://someone@quuz.com/~/bar');
		expect(parsed).to.have.property('protocol', 'ssh:');
		expect(parsed).to.have.property('hostname', 'quuz.com');
		expect(parsed).to.have.property('port', '22');
		expect(parsed).to.have.property('path', '~/bar');
		expect(parsed).to.have.property('auth', 'someone');
	});

	it('should parse ssh://someone@flarp:666//baz', function() {
		var parsed = sshParser('ssh://someone@flarp:666//baz');
		expect(parsed).to.have.property('protocol', 'ssh:');
		expect(parsed).to.have.property('hostname', 'flarp');
		expect(parsed).to.have.property('port', '666');
		expect(parsed).to.have.property('path', '/baz');
		expect(parsed).to.have.property('auth', 'someone');
	});
});
