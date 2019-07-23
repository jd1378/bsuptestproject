// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  "default e2e tests": browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible("#app", 5000)
      .assert.elementPresent(".btn")
      .assert.containsText("h1", "Personal Library")
      .assert.elementCount("button", 2)
      .end();
  }
};
