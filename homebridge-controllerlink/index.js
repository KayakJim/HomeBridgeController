/**
 * Created by kraigm on 1/1/16.
 */

var HomeBridge;
var Server = require('./lib/Server.js');
var Config = require('./lib/config');

module.exports = function (homebridge) {
	HomeBridge = homebridge;
	homebridge.registerPlatform("homebridge-controllerlink", "HomeBridgeControllerLink", HomeBridgeControllerLink);
};

function HomeBridgeControllerLink(log, config) {
	this.log = log;
	this.debug = log.debug;
	var accessKey = config["accessKey"] || Config.getBridgePin(HomeBridge);
	this.server = new Server(HomeBridge, config["port"], accessKey, this.log);
}

HomeBridgeControllerLink.prototype = {
	accessories: function (callback) {
		this.server.start();
		callback([]);
	}
};