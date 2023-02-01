const redis = require("redis");

const axios = require("axios");
import { redisURL, redisToken, password } from "../_constants";

export async function listAll(res, commandArray) {
  var client = redis.createClient({
    url: redisURL,

    port: "38305",

    password: password,
  });

  client.on("error", function (err) {
    throw err;
  });

  res.send({
    response_type: "in_channel",
    text: `"${listName}" contains: \n ${text}`,
  });

  //   await axios({
  //     // Max size for redis list is defined as 2**32-1
  //     url: `${redisURL}/LRANGE/${listName}/0/${2 ** 32 - 1}`,
  //     headers: {
  //       Authorization: `Bearer ${redisToken}`,
  //     },
  //   })
  //     .then((response) => {
  //       console.log("data from axios:", response.data);

  //       let text = "";
  //       response.data.result.forEach((element, index) => {
  //         text += index + 1 + ". " + element + "\n";
  //       });

  //       res.send({
  //         response_type: "in_channel",
  //         text: `"${listName}" contains: \n ${text}`,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("axios Error:", err);
  //       res.send({
  //         response_type: "ephemeral",
  //         text: `${err.response.data.error}`,
  //       });
  //     });
}
