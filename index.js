require('dotenv').config();
const axios = require("axios");
const tmi = require("tmi.js");
const messages = require("./messages");

let connected = false;
let live = false;

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

const client = new tmi.client(options);

let channelLiveCheck = setInterval(() => {
  axios.get('https://api.twitch.tv/helix/streams?user_login=ezpkk', {headers: {"Client-ID": process.env.TWITCH_CLIENT_ID}})
    .then(res => {
      if (res.data && res.data.live) {
        live = true;
        if (live && !connected) {
          // Connect the client to the server..
          client.connect();
          client.on("connected", (address, port) => {
            connected = true;
            // client.action("ezpkk", "Wow, this is hands down the best stream on twitch!");
            function betweenOneAndFourMinutes() {
              return Math.floor(Math.random() * (241 - 60) + 60) * 1000;
            }

            function getRandomMessage() {
              const totalMessages = messages.length;
              const randomIndex = Math.floor(Math.random() * messages.length);
              return randomIndex;
            }

            let messageTimeout;

            function createTimeout(ms) {
              messageTimeout = setTimeout(() => {
                const randomMessage = messages[getRandomMessage()];
                // message
                client.action("ezpkk", randomMessage);
                // set new interval
                let newTimeoutMs = betweenOneAndFourMinutes(); 
                // create timeout
                messageTimeout = createTimeout(newTimeoutMs);
                console.log(`Timeout set for ${newTimeoutMs}`);
              }, ms);
            }
            let initialTimeout = betweenOneAndFourMinutes();
            messageTimeout = createTimeout(initialTimeout);
          });
        }
      } else {
        client.disconnect();
        live = false;
      }
    })
    .catch(e => console.log(e));
}, 120000);
