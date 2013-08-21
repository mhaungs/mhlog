/*
 * Licensing and Copyright still under review...
 * Possible choices BSD, MIT, Apache
 */

/*
 * mhLog
 *
 * Description: A simple utility to control log output.  You can optionally display
 * an abbreviated call stack to better understand the location of the message.
 *
 * @author mhaungs
 */

(function() {

    "use strict";  // EMCAScript 5 pragma to catch more javascript errors

    var mhLog = {};

    /*
     ************ Module Variables *************
     */

    // Log level enumeration
    mhLog.LEVEL = {
        ALL: 0,
        DEBUG: 1,
        DEVELOPMENT: 2,
        PRODUCTION: 3
    };

    var currentLevel = mhLog.LEVEL.PRODUCTION;
    var strace = true; // Boolean that toggles displaying a stack trace

    /*
     ************ Initialization methods *************
     */

    /*
     ************ Public methods *************
     */
    mhLog.setShowStackTrace = function(val) {
        if (typeof val === 'boolean') {
            strace = val;
        }
    };

    mhLog.setLoggingLevel = function(level) {
        if (levelValid(level)) {
            currentLevel = level;
        }
    };

    mhLog.log = function(level, msg) {
        if (levelValid(level)) {
            if (level >= currentLevel) {
                if (strace === true)
                    logCallTrace();
                console.log("mhlog: Message: " + msg);
                return msg;
            }
        }
        return null;
    };

    /*
     ************ Private methods *************
     */
    function levelValid(level) {
        return (level <= mhLog.LEVEL.PRODUCTION && level >= mhLog.LEVEL.ALL);
    }

    // Works in Safari, Chrome, and FireFox
    function logCallTrace() {
        var stackArray, i = 0, entry, results = [];

        try {
            throw new Error("mhLog");
        }
        catch (e) {
            if (e.stack) {
                stackArray = e.stack.split('\n');
                entry = stackArray.shift(); // get rid of reference to this function (logCallTrace)
                while (stackArray.length > 0 && i < 4) {
                    entry = stackArray.shift();  // get one level of call stack
                    results.push(entry.slice(0, entry.indexOf('@')) // keep everything up to @ symbol (Safari)
                            .replace(/^\s+|\s+$/g, '') // Trim whitespaces (Chrome)
                            .replace(/\(http.*$/g, '')); // Remove http reference (Chrome)
                    i++;
                }
                console.log("mhLog: Call Trace: " + results.join(", "));
            }
        }
    }

    exports.mhLog = mhLog;

}());
