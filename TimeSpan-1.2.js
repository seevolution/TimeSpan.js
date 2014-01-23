/*!
* JavaScript TimeSpan Library
*
* Copyright (c) 2010 Michael Stum, http://www.Stum.de/
* 
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*global window: false */
"use strict";
(function () {
    // Constructor function, all parameters are optional
    var TimeSpan = window.TimeSpan = function (milliseconds, seconds, minutes, hours, days) {
        var version = "1.2",
            // Millisecond-constants
            msecPerSecond = 1000,
            msecPerMinute = 60000,
            msecPerHour = 3600000,
            msecPerDay = 86400000,
            // Internally we store the TimeSpan as Milliseconds
            msecs = 0,

            // Helper functions
            isNumeric = function (input) {
                return !isNaN(parseFloat(input)) && isFinite(input);
            };

        // Constructor Logic
        if (isNumeric(days)) {
            msecs += (days * msecPerDay);
        }
        if (isNumeric(hours)) {
            msecs += (hours * msecPerHour);
        }
        if (isNumeric(minutes)) {
            msecs += (minutes * msecPerMinute);
        }
        if (isNumeric(seconds)) {
            msecs += (seconds * msecPerSecond);
        }
        if (isNumeric(milliseconds)) {
            msecs += milliseconds;
        }

        // Addition Functions
        this.addMilliseconds = function (milliseconds) {
            if (!isNumeric(milliseconds)) {
                return;
            }
            msecs += milliseconds;
        };
        this.addSeconds = function (seconds) {
            if (!isNumeric(seconds)) {
                return;
            }
            msecs += (seconds * msecPerSecond);
        };
        this.addMinutes = function (minutes) {
            if (!isNumeric(minutes)) {
                return;
            }
            msecs += (minutes * msecPerMinute);
        };
        this.addHours = function (hours) {
            if (!isNumeric(hours)) {
                return;
            }
            msecs += (hours * msecPerHour);
        };
        this.addDays = function (days) {
            if (!isNumeric(days)) {
                return;
            }
            msecs += (days * msecPerDay);
        };

        // Subtraction Functions
        this.subtractMilliseconds = function (milliseconds) {
            if (!isNumeric(milliseconds)) {
                return;
            }
            msecs -= milliseconds;
        };
        this.subtractSeconds = function (seconds) {
            if (!isNumeric(seconds)) {
                return;
            }
            msecs -= (seconds * msecPerSecond);
        };
        this.subtractMinutes = function (minutes) {
            if (!isNumeric(minutes)) {
                return;
            }
            msecs -= (minutes * msecPerMinute);
        };
        this.subtractHours = function (hours) {
            if (!isNumeric(hours)) {
                return;
            }
            msecs -= (hours * msecPerHour);
        };
        this.subtractDays = function (days) {
            if (!isNumeric(days)) {
                return;
            }
            msecs -= (days * msecPerDay);
        };

        // Functions to interact with other TimeSpans
        this.isTimeSpan = true;
        this.add = function (otherTimeSpan) {
            if (!otherTimeSpan || !otherTimeSpan.isTimeSpan) {
                return;
            }
            msecs += otherTimeSpan.totalMilliseconds();
        };
        this.subtract = function (otherTimeSpan) {
            if (!otherTimeSpan || !otherTimeSpan.isTimeSpan) {
                return;
            }
            msecs -= otherTimeSpan.totalMilliseconds();
        };
        this.equals = function (otherTimeSpan) {
            if (!otherTimeSpan || !otherTimeSpan.isTimeSpan) {
                return;
            }
            return msecs === otherTimeSpan.totalMilliseconds();
        };

        // Getters
        this.totalMilliseconds = function (roundDown) {
            var result = msecs;
            if (roundDown === true) {
                result = Math.floor(result);
            }
            return result;
        };
        this.totalSeconds = function (roundDown) {
            var result = msecs / msecPerSecond;
            if (roundDown === true) {
                result = Math.floor(result);
            }
            return result;
        };
        this.totalMinutes = function (roundDown) {
            var result = msecs / msecPerMinute;
            if (roundDown === true) {
                result = Math.floor(result);
            }
            return result;
        };
        this.totalHours = function (roundDown) {
            var result = msecs / msecPerHour;
            if (roundDown === true) {
                result = Math.floor(result);
            }
            return result;
        };
        this.totalDays = function (roundDown) {
            var result = msecs / msecPerDay;
            if (roundDown === true) {
                result = Math.floor(result);
            }
            return result;
        };
        // Return a Fraction of the TimeSpan
        this.milliseconds = function () {
            return msecs % 1000;
        };
        this.seconds = function () {
            return Math.floor(msecs / msecPerSecond) % 60;
        };
        this.minutes = function () {
            return Math.floor(msecs / msecPerMinute) % 60;
        };
        this.hours = function () {
            return Math.floor(msecs / msecPerHour) % 24;
        };
        this.days = function () {
            return Math.floor(msecs / msecPerDay);
        };

        this.toString = function(){
            return (this.days() > 0 ? this.days() + '.' : '') +
                (this.hours() < 10 ? '0' : '') + this.hours() + ':' +
                (this.minutes() < 10 ? '0' : '') + this.minutes() + ':' + 
                (this.seconds() < 10 ? '0' : '') + this.seconds()
                ;
        };

        this.toHumanString = function(){
            return (this.days() > 0 ? this.days() + 'd ' : '') +
                (this.hours() > 0 ? this.hours() + 'h ' : '') +
                (this.minutes() > 0 ? this.minutes() + 'm ' : '') +
                this.seconds() + 's'
                ;
        };

        this.clone = function(){
            return TimeSpan.FromTimeSpan(this);
        };

        // Misc. Functions
        this.getVersion = function () {
            return version;
        };
    };

    // "Static Constructors"
    TimeSpan.FromTimeSpan = function(timeSpan){
        return TimeSpan.FromSeconds(timeSpan.totalSeconds());
    };
    TimeSpan.Now = function(){
        return TimeSpan.FromSeconds(1);
    };
    TimeSpan.Today = function(){
        var now = new Date();
        // return new TimeSpan(0, 60, 0, 0);
        return new TimeSpan(0, 0, now.getMinutes(), now.getHours());
    };
    TimeSpan.FromSeconds = function (seconds) {
        return new TimeSpan(0, seconds, 0, 0, 0);
    };
    TimeSpan.FromMinutes = function (minutes) {
        return new TimeSpan(0, 0, minutes, 0, 0);
    };
    TimeSpan.FromHours = function (hours) {
        return new TimeSpan(0, 0, 0, hours, 0);
    };
    TimeSpan.FromDays = function (days) {
        return new TimeSpan(0, 0, 0, 0, days);
    };
    TimeSpan.FromDates = function (firstDate, secondDate, forcePositive) {
        var differenceMsecs = secondDate.valueOf() - firstDate.valueOf();
        if(forcePositive === true) {
            differenceMsecs = Math.abs(differenceMsecs);
        }
        return new TimeSpan(differenceMsecs, 0, 0, 0, 0);
    };
    TimeSpan.Parse = function(str) {
        if(typeof(str)!=='string'){
            throw new Error('Must be a string.');
        }

        str = str || '';

        /// special cases
        ///
        if(str.toLowerCase() === 'today')
            return TimeSpan.Today();
        else if(str.toLowerCase() === 'now')
            return TimeSpan.Now();

        var spl = str.split(':').reverse(),
            millis = 0,
            seconds = 0,
            minutes = 0,
            hours = 0,
            days = 0
            ;
        if(spl.length < 3)
            throw new Error('Parse failed, requires minimum "h:m:s"');

        /// now we have
        /// [ss[.tt], mm, [d.]hh]
        ///
        if(spl[0].indexOf('.') > -1){ /// has millis
            seconds = parseInt(spl[0].split('.')[0],10);
            millis = parseInt(spl[0].split('.')[1],10);
        } else {
            seconds = parseInt(spl[0], 10);
        }

        minutes = parseInt(spl[1], 10);

        if(spl[2].indexOf('.') > -1){ // has days
            days = parseInt(spl[2].split('.')[0], 10);
            hours = parseInt(spl[2].split('.')[1], 10);
        } else {
            hours = parseInt(spl[2].split('.')[0], 10);
        }

        return new TimeSpan(millis, seconds, minutes, hours, days);
    };
}());