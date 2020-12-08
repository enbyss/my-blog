const axios = require('axios');
require('dotenv').config();

exports.handler = async function(event, context) {

  if(!event.queryStringParameters.user) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Please pass a "user" query parameter',
        example: 'https://enbyss.com/api/islive?user=enbyss_'
      })
    }
  }

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
    const streamTitle = userDetails.data.data[0].title;

    return {
      statusCode: 200,
      body: JSON.stringify({
        isLive,
        streamTitle
      })
    }
  } catch(e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e)
    };
  }
}
