const axios = require("axios");

class FanHandler {
  constructor(tmiClient) {
    this.client = tmiClient;
    this.connected = false;
    this.live = false;
    this.liveCheckInterval = null;
    this.messageTimeout = null;
  }

  liveCheck() {
    const channelId = process.env.CHANNEL_USER_ID;
    const options = {headers: {"Client-ID": process.env.TWITCH_CLIENT_ID}};
    axios.get(`https://api.twitch.tv/helix/streams?user_id=${channelId}`, options)
      .then(res => {
        if (res.data[0] && res.data[0].live) {
          console.log('Streamer is live!');
          this.connectClient();
          this.live = true;
        } else {
          console.log('Streamer is not live.');
          if (this.live) {
            this.disconnectClient();
            this.live = false;
          }
        }  
      })
      .catch(e => console.error(e));
  }

  startLiveCheck() {
    console.log('Starting live check.')
    this.liveCheck();
    const TWO_MINUTES_IN_MS = 120000;
    this.liveCheckInterval = setInterval(() => {this.liveCheck()}, TWO_MINUTES_IN_MS);
  }

  stopLiveCheck() {
    console.log('Stopping live check.')
    clearInterval(this.liveCheckInterval);
  }

  connectClient() {
    this.client.connect();
  }

  disconnectClient() {
    this.client.disconnect();
  }

  sendRandomMessage() {
    if (this.live && this.connected) {
      const randomMessage = messages[getRandomMessage()];
      this.client.action("ezpkk", randomMessage);
    }
  }

  createMessageTimeout(ms) {
    this.messageTimeout = setTimeout(() => {
      this.sendRandomMessage();

      const newTimeoutMs = betweenOneAndFourMinutes();
      this.createMessageTimeout(newTimeoutMs);
    }, ms);
  }

  startMessenger() {
    console.log('Starting messenger');
    const newTimeoutMs = betweenOneAndFourMinutes();
    this.createMessageTimeout(newTimeoutMs);
  }

  stopMessenger() {
    console.log('Stopping messenger.')
    clearTimeout(this.messageTimeout);
  }
}

module.exports = FanHandler;
