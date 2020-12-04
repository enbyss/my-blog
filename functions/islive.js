const axios = require('axios');
require('dotenv').config();

exports.handler = async function(event, context) {
  try {
    const token = await axios.post("https://id.twitch.tv/oauth2/token", null,  { params: {
      'client_id' : process.env.TWITCH_CLIENT_ID,
      'client_secret' : process.env.TWITCH_CLIENT_SECRET,
      'grant_type' : 'client_credentials'
    }});

    const config = {
      headers: {
        'Client-ID' : process.env.TWITCH_CLIENT_ID,
        'Authorization': 'Bearer ' + token.data.access_token
      }
    }

    const userDetails = await axios.get(`https://api.twitch.tv/helix/search/channels?query=${event.queryStringParameters.user}`, config);
    const isLive = userDetails.data.data[0].is_live;

    return {
      statusCode: 200,
      body: JSON.stringify({
        isLive
      })
    }
  } catch(e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e)
    };
  }
}
