import { postToChannel } from "../_utils";

export async function app_mention(req, res) {
  let event = req.body.event;

  console.log("app_mention event received: ", body);

  try {
    await postToChannel(
      "general",
      res,
      `Hi there! Thanks for mentioning me, <@${event.user}>!`
    );
  } catch (e) {
    console.log(e);
  }
}
