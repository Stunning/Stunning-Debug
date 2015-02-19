(function(factory) {
	if(typeof define === 'function' && define.amd) {
		// AMD
		define(factory);
	} else if(typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory();
	} else {
		// Globals
		window._Debug = factory();
	}
}(function() {

	var options = {
		logging: true,
		prefix: null,
		storage: false
	};

	var storage = [];
	
	var Send = function(type, args) {
		// Clean arguments
		args = CleanArguments( args );

		// Send message to storage
		Store(type, args);

		// Don't send to console if logging is off
		if( ! options.logging) {
			return;
		}

		// Send message to browser console
		if(args[1]) {
			console[type](args[0], args[1]);
		} else {
			console[type](args[0]);
		}
	};

	var CleanArguments = function(args) {
		args = args || [];

		// Stringify functions
		for(var i = 0; i < args.length; i++) {
			switch(typeof args[i]) {
				case 'function':
					args[i] = args[i].toString()
				break;
			}
		}

		// Add prefix to arguments if provided
		if(options.prefix && args[0] && typeof args[0] === 'string') {
			args[0] = options.prefix + ' ' + args[0];
		}

		return args;
	};

	var Store = function(type, args) {
		if( ! options.storage) {
			return;
		}

		storage.push({
			type: type,
			arguments: args
		});
	};

	return {
		set: function(key, value) {
			if(typeof key === 'object') {
				Object.keys(key).forEach(function(opt) {
					options[opt] = key[opt];
				});

				return;
			}

			if(options[key] !== undefined) {
				options[key] = value;
			}
		},
		log: function() {
			Send('log', arguments);
		},
		warn: function() {
			Send('warn', arguments);
		},
		error: function() {
			Send('error', arguments);
		},
		getStorage: function() {
			return storage;
		},
		clearStorage: function() {
			storage = [];
		},
		on: function() {
			options.logging = true;
		},
		off: function() {
			options.logging = false;
		}
	};
}));