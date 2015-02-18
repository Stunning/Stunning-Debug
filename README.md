# Stunning Debug

A stunning debug wrapper for console methods.

## Installation

Install with NPM or Bower, `npm install stunning-debug` or `bower install stunning-debug`

We support CommonJS and AMD.

```javascript
var _Debug = require('stunning-debug');
```
	
If used globally it's available as `window._Debug`

## Usage

```javascript
_Debug.log('Log this message!');
_Debug.warn('This is a warning!');
_Debug.error('This is an error!', errorInfo);
```

## Methods

```javascript
// Logging
_Debug.log(arg1, arg2)				// console.log()
_Debug.warn(arg1, arg2)				// console.warn()
_Debug.error(arg1, arg2)			// console.error()

// Options
_Debug.set(option|object, value)	// Set single options or multiple with an object.
_Debug.getStorage()					// Get stored debug history.
_Debug.clearStorage()				// Clear debug history
```

## Options

All options and their defaults.

```javascript
{
	storage: false,		// Storage functionality, turned off by default.
	prefix: null		// Prefix first argument in logging if it's a string.
}
```

## Upcoming features

* **IE8 compatible debug log**, which can be force-used for modern browsers.
* **Storing debug history** in localStorage as an array, which could easily be forwarded to the server if you need it.
* **Gulp plugin** to remove all debugging rows in your code.