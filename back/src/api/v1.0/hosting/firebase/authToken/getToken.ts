import key from '../../../../../secrets/serviceAccountKey.json';
const {google} = require('googleapis');
const SCOPES = ["https://www.googleapis.com/auth/firebase.hosting",
'https://www.googleapis.com/auth/cloud-platform'];

function getAccessToken() {
  return new Promise(function(resolve, reject) {
    var jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function(err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

export { getAccessToken };
