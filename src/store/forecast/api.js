import fetch from "cross-fetch";
import * as CryptoJS from "crypto-js";
import OAuth from "oauth-1.0a";

export async function getForecast(city, unit) {
  const url = `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${city}&format=json&u=${unit}`;
  const method = "GET";
  const consumer_key =
    "dj0yJmk9QlVCUDhTbm9JU1JhJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTUx";
  const consumer_secret = "519718ec81dc95d10049cd4d519898b21f83ead2";

  const oauth = OAuth({
    consumer: {
      key: consumer_key,
      secret: consumer_secret
    },
    signature_method: "HMAC-SHA1",
    hash_function(base_string, key) {
      return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
    }
  });

  const request_data = {
    url,
    method
  };

  const obj = {
    headers: oauth.toHeader(oauth.authorize(request_data, {}))
  };

  return fetch(url, obj);
}
