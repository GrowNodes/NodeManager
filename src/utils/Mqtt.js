import mqtt from 'mqtt';
// See index.js
export default class Mqtt {
  constructor(url, dispatcher, channel) {
  	console.log("construtro")
  	var parent = this;
    this.client  = mqtt.connect(`mqtt://${url}:8080`);
    this.dispatcher = dispatcher
    this.client.on('connect', function () {
		parent.client.subscribe(channel+"/#")
		parent.client.publish(channel, 'Hello mqtt')
	})
	
	this.client.on('message', function(topic, payload) {
		dispatcher(topic, payload.toString())
	})
  }

  postMessage(text) {
    // this.websocket.send(
    //   text
    // );
    console.log("index.js:39 posting message");
    return true;
  }

  close() {
    this.client.end();
  }

}