const axios = require("axios");
import { redisURL, redisToken } from "../_constants";

export async function getKey(res, commandArray, callback) {
  let key = commandArray[1];
  let xxx;
  let new_key = await axios({
    url: `${redisURL}/get/${key}`,
    headers: {
      Authorization: `Bearer ${redisToken}`,
    },
  })
    .then((response) => {
      console.log("data from axios:", response.data);
      if (!!callback) {
        xxx = response.data.result;
        console.log(222, response.data.result);
        return response.data.result;
      } else {
        res.send({
          response_type: "in_channel",
          text: `Value for "${key}": "${response.data.result}"`,
        });
      }
    })
    .catch((err) => {
      console.log("axios Error:", err.response.data.error);
      res.send({
        response_type: "ephemeral",
        text: `${err.response.data.error}`,
      });
    });
  if (!!callback) {
    console.log("xxx", xxx);
    console.log("ney_key", new_key);
    return new_key;
  }
}
