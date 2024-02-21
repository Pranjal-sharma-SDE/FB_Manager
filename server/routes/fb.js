const router = require("express").Router()
const axios = require('axios');

const FB_APP_ID = process.env.FB_APP_ID;
const FB_APP_SECRET = process.env.FB_APP_SECRET;
const REDIRECT_URI = 'http://localhost:8081/api/fb/facebook/callback';

router.get('/facebook', (req, res) => {
  res.redirect(`https://www.facebook.com/v13.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=manage_pages,pages_show_list,publish_pages,read_page_mailboxes`);
});

router.get('/facebook/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { data } = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${FB_APP_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${FB_APP_SECRET}&code=${code}`);
    const { access_token } = data;

    // You can use the access token to make requests to the Facebook Graph API if needed

    // Store user data in the session
    req.session.user = { accessToken: access_token };

    res.redirect('http://localhost:3000/disconnect'); // Redirect the user to your Connect component
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});



module.exports = router