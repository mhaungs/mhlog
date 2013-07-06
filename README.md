mhlog
=====

*mhlog* is a simple javascript logging utility for node.js servers and client-side web applications dynamically loaded via [inject] [1].

Example
-------

Before going into specifics, here is a quick example of using mhLog.  First, you need to *require* mhLog.js:

	var mhLog = require("mhlog.js").mhLog;

Next, set the logging level:

	mhLog.setLoggingLevel(mhLog.LEVEL.ALL);

And, optionally, set whether or not you want an abbreviated stack trace to accompany the output:

	mhLog.setShowStackTrace(true);

Then, you use *mhLog.log* as you would *console.log*.  Here's an example:

	mhLog.log(mhLog.LEVEL.DEBUG, "Example message.");

Logging Levels
--------------

mhLog has four possible levels you can use:

* ALL:
* DEBUG:
* DEVELOPMENT:
* PRODUCTION

[1]: http://www.injectjs.com/		"Inject"
