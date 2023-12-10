import initialize from '../lib';
import { Alert } from 'react-native';
require('../lib/paho-mqtt');

initialize();

class MqttClient {
    
  constructor() {
    const clientId = 'ReactNativeMqtt';
    this.client = new Paho.MQTT.Client("172.20.10.3", 9001 , clientId);
    this.client.onMessageArrived = this.onMessageArrived;
    this.callbacks = {};
    this.onSuccessHandler = undefined;
    this.onConnectionLostHandler = undefined;
    this.isConnected = false;
  }

  onConnect = (onSuccessHandler, onConnectionLostHandler) => {
    this.onSuccessHandler = onSuccessHandler;
    this.onConnectionLostHandler = onConnectionLostHandler;
    this.client.onConnectionLost = () => {
      this.isConnected = false;
      onConnectionLostHandler();
    };

    this.client.connect({
      timeout: 10,
      onSuccess: () => {
        this.isConnected = true;
        onSuccessHandler();
      },
      useSSL: false,
      onFailure: this.onError,
      reconnect: true,
      keepAliveInterval: 20,
      cleanSession: true,
    });
  };

  onError = ({errorMessage}) => {
    console.log(errorMessage);
    this.isConnected = false;
    Alert.alert('Failed', 'Failed to connect to MQTT', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Try Again',
        onPress: () =>
          this.onConnect(
            this.onSuccessHandler,
            this.onConnectionLostHandler,
          ),
      },
    ]);
  };

  onMessageArrived = message => {
    const {payloadString, topic} = message;
    console.log('onMessageArrived:', payloadString);
    this.callbacks[topic](payloadString);
  };

  onPublish = (topic, message) => {
    this.client.publish(topic, message);
  };

  onSubscribe = (topic, callback) => {
    this.callbacks[topic] = callback;
    this.client.subscribe(topic);
  };

  unsubscribe = topic => {
    delete this.callbacks[topic];
    this.client.unsubscribe(topic);
  };
}

let client = new MqttClient();
export {client as MqttClient};