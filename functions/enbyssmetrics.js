const axios = require('axios');
require('dotenv').config();

var url = require('url')
var patreon = require('patreon')
var patreonAPI = patreon.patreon

// Use the client id and secret you received when setting up your OAuth account

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

    const userDetails = await axios.get(`https://api.twitch.tv/helix/search/channels?query=enbyss_`, config);
    const followerCount = await axios.get("https://api.twitch.tv/helix/users/follows?to_id=127522183", config)
    const subscriberCount = await axios.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCvsQyeyBvvOOppg2R0vsfPw&key=AIzaSyCMrANZrjKSiM5AA-PGkDRGxraWBTb_m58");
    const isLive = userDetails.data.data[0].is_live;
    const streamTitle = userDetails.data.data[0].title;

    const patreonData = await getPatrons();

    return {
      statusCode: 200,
      body: JSON.stringify({
        isLive,
        streamTitle,
        patreonData,
        twitchFollowers: followerCount.data.total,
        youtubeSubs: subscriberCount.data.items[0].statistics.subscriberCount,
      })
    }
  } catch(e) {
    console.error(e);
    return {
      statusCode: 400,
      body: JSON.stringify(e)
    };
  }
}

async function getPatrons() {
  let patronByTier = {
    "GIGABYSS" : [],
    "MEGABYSS" : [],
    "ABYSS" : [],
    "totalAmount" : 0
  }

  const patreonAPIClient = patreonAPI(process.env.PATREON_ACCESS_TOKEN)
  return patreonAPIClient('/campaigns/2554820/pledges')
  .then(({ store }) => {
    store.findAll('pledge').forEach(reward => {
      patronByTier["totalAmount"] = reward.reward.campaign.pledge_sum;
      patronByTier[reward.reward.title].push({
        "name": reward.patron.full_name
        // "amount": reward.reward.amount_cents
      });
    });

    return patronByTier;
  });
}
