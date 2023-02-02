const axios = require("axios");
import { redisURL, redisToken } from "../_constants";

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
| :rebecca: | :ehsan: | :asger: | ::emma:: | :marija: |  :jeen:  |
|   @reblof  |   @ehspou   |   @asgbje    |   @emma.skog   |  @marija.vujosevic   |   @jeegul    |
| =======================|
`;

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
    // console.log("elm", element);
    p[index] = axios({
      url: url(element),
      headers: headers,
    });
  });

  let list = [];
  Promise.all(p.map((promise) => promise)).then(function (values) {
    values.forEach((element) => {
      list.push(element.data.result);
    });

    let combinedArray = xx.data.result.map((element, index) => ({
      [element]: list[index],
    }));
    console.log(combinedArray);

    let replacedText = replaceKeyWithValue(text, combinedArray);

    res.send({
      response_type: "in_channel",
      text: replacedText,
    });

    console.log(replaceKeyWithValue(text, combinedArray));
  });
}
