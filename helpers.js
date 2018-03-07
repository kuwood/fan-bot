function betweenOneAndFourMinutes() {
  return Math.floor(Math.random() * (241 - 60) + 60) * 1000;
}

function getRandomMessage(messages) {
  const totalMessages = messages.length;
  const randomIndex = Math.floor(Math.random() * messages.length);
  return randomIndex;
}

module.exports = {
  betweenOneAndFourMinutes,
  getRandomMessage
};
