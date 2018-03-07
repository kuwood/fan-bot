function randomMinRange(min, max) {
  const exclusiveMax = max + 1;
  return Math.floor(Math.random() * (exclusiveMax - min) + min) * 1000;
}

function getRandomMessage(messages) {
  const totalMessages = messages.length;
  const randomIndex = Math.floor(Math.random() * messages.length);
  return randomIndex;
}

module.exports = {
  randomMinRange,
  getRandomMessage
};
