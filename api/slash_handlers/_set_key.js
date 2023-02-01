const axios = require("axios");
import { redisURL, redisToken } from "../_constants";

export async function setKey(res, req, commandArray) {
  let key = commandArray[1];
  let value = commandArray[2];
  let event = req.body.event;

  console.log(req);
  await axios({
    url: `${redisURL}/set/${key}/${value}`,
    headers: {
      Authorization: `Bearer ${redisToken}`,
    },
  })
    .then((response) => {
      console.log("data from axios:", response.data);
      res.send({
        response_type: "in_channel",
        text: `Successfully set ${key}=${value}`,
      });
    })
    .catch((err) => {
      console.log("axios Error:", err);
      res.send({
        response_type: "ephemeral",
        text: `${err.response.data.error}`,
      });
    });
}
