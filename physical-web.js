/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
"use strict";
var eddystoneBeacon = require('eddystone-beacon');

module.exports = function(RED) {
	function beacon(n){
		RED.nodes.createNode(this,n);
		this.power = n.power;
		this.period = n.period;
		this.url = n.url;

		var node = this;

		if (this.url) {
			console.log(this.url);
			try {
				eddystoneBeacon.advertiseUrl(msg.payload);
			} catch(e){
				console.log('%j', e);
			}
		}

		node.on('input', function(msg){
			try {
				eddystoneBeacon.advertiseUrl(msg.payload);
			} catch(e){
				console.log('error: %j', e);
			}
		});

		node.on('close', function(done){
			try {
				eddystoneBeacon.stop(function(){
					done();
				});
			} catch(e){
				console.log('%j', e);
			}
		});

	};
	RED.nodes.registerType("PhysicalWeb out", beacon);
};