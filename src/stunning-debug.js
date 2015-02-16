(function(factory) {
	if(typeof define === 'function' && define.amd) {
		// AMD
		define(factory);
	} else if(typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory();
	} else {
		// Globals
		window.StunningDebug = factory();
	}
}(function() {

	var Debug = function(options) {
		this.storage = [];
	};

	Debug.prototype = {
		send: function(type, args) {
			this.store.call(this, type, args);

			if(args[1]) {
				console[type](args[0], args[1]);
			} else {
				console[type](args[0]);
			}
		},
		store: function(type, args) {
			this.storage.push({
				type: type,
				arguments: args
			});
		}
	};

	return function(options) {
		
		var debug = new Debug(options);

		var api = {
			log: function() {
				debug.send('log', arguments);
			},
			warn: function() {
				debug.send('warn', arguments);
			},
			error: function() {
				debug.send('error', arguments);
			},
			get: function() {
				debug.send('log', debug.storage);
			}
		};

		// Console.log fallback
		// TODO: Force fallback option
		if( ! window.console) {
			window.console = api;
		}

		return api;
	};

}));