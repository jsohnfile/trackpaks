const request = require('request');
const rootURL = 'https://api.goshippo.com/tracks'

module.exports = {
    index
};

async function index(req, res) {
    const options = {
        url: rootURL + `/${req.params.carrier}/${req.params.trackingNumber}`,
        headers: {
          'Authorization': 'ShippoToken ' + process.env.API_TOKEN
        }
      };
      await request(options, function(err, response, body) {
        const shippingData = JSON.parse(body);
        res.status(200).json(shippingData)
      })
}