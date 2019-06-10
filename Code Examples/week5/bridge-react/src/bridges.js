// Convert characters like ' to HTML entities using
// https://github.com/mathiasbynens/he#heencodetext-options
import { encode } from 'he';

const bridgeUrl = 'https://api.myjson.com/bins/17fpo0';

export default function() {
  return fetch(bridgeUrl)
    .then(response => {
      // If we don't get a 200 OK response, throw an error to the .catch()
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Parse the response body from JSON to JS (an Array) 
      return response.json();
    })
    .then(bridges => {
      // Encode and normalize (uppercase) all bridge names
      bridges.forEach(bridge => {
        // Bridge name in uppercase, not encoded
        bridge.name = bridge.name.toUpperCase();
        // Bridge name uppercase and encoded (suitable for HTML display)
        bridge.nameEncoded = encode(bridge.name)
      });

      return bridges;
    });
    // NOTE: we aren't going to deal with errors here, caller must .catch()
}
