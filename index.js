require('dotenv').config();
const tmi = require("tmi.js");
const FanHandler = require("./FanHandler");
const messages = require("./messages");

const options = {
  options: {
      debug: true
  },
  connection: {
      reconnect: true
  },
  identity: {
      username: "ezpkknumber1fan",
      password: process.env.TWITCH_OAUTH
  },
  channels: ["#ezpkk"]
};

const tmiClient = new tmi.client(options);
let fanHandler = new FanHandler(tmiClient);

tmiClient.on("connected", (address, port) => {
  console.log('Fanbot has connected!');
  fanHandler.isNowConnected();
  tmiClient.action("ezpkk", "yoo! 80% of success is showing up!");
  fanHandler.startMessenger();
});

tmiClient.on("disconnected", () => {
  console.log('Fanbot disconnected.');
  fanHandler.stopMessenger();
  fanHandler.isNowDisconnected();
});

fanHandler.startLiveCheck();
