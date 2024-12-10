const { onRequest } = require("firebase-functions/v2/https");
const axios = require('axios');
const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true }); // Allow all origins

exports.proxyGoCardless = onRequest((request, response) => {
  // Apply CORS before any other processing
  cors(request, response, async () => {
    // Log the incoming request data for debugging
    logger.info("Received a request to proxy GoCardless", {
      structuredData: true,
      requestBody: request.body,
    });

    const { secret_id, secret_key } = request.body;

    if (!secret_id || !secret_key) {
      // Respond with a 400 status if missing required data
      return response.status(400).send({ error: 'Missing secret_id or secret_key in request body' });
    }

    let data = JSON.stringify({
      "secret_id": secret_id,  // Extract from the request body
      "secret_key": secret_key // Extract from the request body
    });



    // Configure the request to GoCardless API
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://bankaccountdata.gocardless.com/api/v2/token/new/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      // Make the API request to GoCardless
      const apiResponse = await axios.request(config);

      // Log and send the response from GoCardless API
      logger.info("GoCardless API Response", {
        structuredData: true,
        responseData: apiResponse.data
      });
      response.status(200).send(apiResponse.data);
    } catch (error) {
      // Log the error and send it in the response
      logger.error("Error with GoCardless API Request", {
        structuredData: true,
        error: error.message
      });
      response.status(500).send({ error: 'Failed to process request with GoCardless', details: error.message });
    }
  });
});
