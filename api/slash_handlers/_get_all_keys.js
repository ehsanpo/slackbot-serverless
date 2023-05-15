const axios = require("axios");
import { redisURL, redisToken } from "../_constants";
import { getKey } from "./_get_key";

function replaceKeyWithValue(text, combinedArray) {
  combinedArray.forEach((obj) => {
    for (const [key, value] of Object.entries(obj)) {
      text = text.replace(key, value);
    }
  });
  return text;
}

let text = `
| =====CHANNEL STATS==== |
| :rebecca: | :ehsan: | :asger: | :emma:  | :marija: |  :jeen: |
|   @reblof  |   @ehspou   |   @asgbje   |   @emma.skog   |   @marija.vujosevic   |   @jeegul   |
| =======================|
`;

let avatar = {
  "@reblof": ":rebecca:",
  "@ehspou": ":ehsan:",
  "@asgbje": ":asger:",
  "@emma.skog": ":emma:",
  "@marija.vujosevic": ":marija:",
  "@jeegul": ":jeen:",
  "@nicten": ":nicko:",
  "@cargus": ":cargus:",
};
let limeCall = ["get", "lime"];

function convertXtoY(x, limeOwner) {
  let y = [];
  x.forEach((item) => {
    const keys = Object.keys(item);
    const values = Object.values(item);
    y.push({
      type: "mrkdwn",
      text: ` ${avatar[keys[0]]}  *${values[0]}* \n`,
    });
  });
  y.push({
    type: "mrkdwn",
    text: `${limeOwner} got the 🍈`,
  });
  return y;
}

export async function getAllKeys(res, commandArray) {
  let url = (key) => `${redisURL}/get/${key}`;

  let headers = {
    Authorization: `Bearer ${redisToken}`,
  };

  const frontPplList = await axios({
    url: `${redisURL}/LRANGE/frontPpl/0/${2 ** 32 - 1}`,
    headers: headers,
  });
  let p = [];

  frontPplList.data.result.forEach((element, index) => {
    p[index] = axios({
      url: url(element),
      headers: headers,
    });
  });
  let limeOwner = await getKey(res, limeCall, true);

  let list = [];
  Promise.all(p.map((promise) => promise)).then(function (values) {
    values.forEach((element) => {
      list.push(element.data.result);
    });

    let combinedArray = frontPplList.data.result.map((element, index) => ({
      [element]: list[index],
    }));

    let replacedText = replaceKeyWithValue(text, combinedArray);
    let fields = convertXtoY(combinedArray, limeOwner);

    res.send({
      response_type: "in_channel",
      // text: replacedText
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*CHANNEL STATS*",
          },
        },
        {
          type: "section",
          fields: fields,
        },
      ],
    });
  });
}
