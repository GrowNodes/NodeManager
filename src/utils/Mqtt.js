import mqtt from 'mqtt';
// See index.js
export default class Mqtt {
  constructor(url, dispatcher, topics) {
  	console.log("construtro")
  	var parent = this;
    this.client  = mqtt.connect(`mqtt://${url}:8080`);
    this.dispatcher = dispatcher
    this.client.on('connect', function () {
    for (var i = topics.length - 1; i >= 0; i--) {
  		parent.client.subscribe("nodes/"+topics[i]+"/#")
  		parent.client.publish(topics[i], 'Hello mqtt')
    }
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