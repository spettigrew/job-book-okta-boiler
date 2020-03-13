const okta = require("@okta/okta-sdk-nodejs");

const client = new okta.Client({
  orgUrl: "{your okta org}",
  token: "{your okta token}"
});

module.exports = client;
