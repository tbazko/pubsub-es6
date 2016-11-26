/*
 * ES6 Pub/Sub adaptation
 * based on Addy Osmani pubsubz implementation
 * https://github.com/addyosmani/pubsubz/blob/master/pubsubz.js
 * Licensed under the GPL
 */
"use strict";

class PubSub {
	constructor() {
		this._topics = {};
		this._subUid = -1;
	}

	get topics() {
		return this._topics;
	}

	get subUid() {
		return this._subUid;
	}

	set subUid(id) {
		this._subUid = id;
	}

	publish(topic, args) {
		if (!this.topics[topic]) {
			return false;
		}

		setTimeout(() => {
			var subscribers = this.topics[topic],
				length = subscribers ? subscribers.length : 0;
			while (length--) {
				subscribers[length].func(topic, args);
			}
		}, 0);

		return true;
	}

	subscribe(topic, func) {
		if (!this.topics[topic]) {
			this.topics[topic] = [];
		}
		this.subUid = ++this.subUid;
		var token = this.subUid.toString();
		this.topics[topic].push({
			token: token,
			func: func
		});
		return token;
	}

	unsubscribe(token) {
		for (var m in this.topics) {
			if (this.topics[m]) {
				for (var i = 0, j = this.topics[m].length; i < j; i++) {
					if (this.topics[m][i].token === token) {
						this.topics[m].splice(i, 1);
						return token;
					}
				}
			}
		}
		return false;
	}
}

var pubsub = new PubSub();
