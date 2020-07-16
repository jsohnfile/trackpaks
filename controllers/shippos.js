const request = require('request');

module.exports = {
    index
};

function index() {
    const options = {
        url: rootURL + `/${carrier}/${trackingNumber}`,
        headers: {
          'Authorization': 'ShippoToken ' + process.env.API_TOKEN
        }
      };
      request(options, function(err, response, body) {
        const userData = JSON.parse(body);
        // update the options url to fetch the user's repos
        options.url = userData.repos_url;
      })
}