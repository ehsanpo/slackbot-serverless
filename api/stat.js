import { tokenizeString } from "./_utils";
import { setKey } from "./slash_handlers/_set_key";
import { addToList } from "./slash_handlers/_add_to_list";
import { listAll } from "./slash_handlers/_list_all";
import { getKey } from "./slash_handlers/_get_key";
import { removeFromList } from "./slash_handlers/_remove_from_list";
import { getAllKeys } from "./slash_handlers/_get_all_keys.js";
import message from "./messages.json";

module.exports = async (req, res) => {
  const commandArray = tokenizeString(req.body.text);
  const action = commandArray[0];
  let userName = req.body.user_name;
  const sender = "@" + userName;
  let limeCall = ["get", "lime"];

  switch (action) {
    case "set":
      setKey(res, commandArray);
      break;
    case "get":
      getKey(res, commandArray);
      break;
    case "+1":
      //get the key
      let value = await getKey(res, commandArray, true);
      //key plus 1
      const NewCommandArray = ["set", commandArray[1], parseInt(value) + 1];
      //save key
      setKey(res, NewCommandArray);
      break;
    case "-1":
      //get the key
      let value1 = await getKey(res, commandArray, true);
      //key minus 1
      const NewCommandArray1 = ["set", commandArray[1], parseInt(value1) - 1];
      //save key
      setKey(res, NewCommandArray1);
      break;
    case "lime":
      // fetch lime
      let NewCommandArray2 = ["get", "lime"];
      let lime = await getKey(res, NewCommandArray2, true);

      const NewCommandArray3 = ["set", "lime", commandArray[1]];
      if (sender === lime) {
        setKey(res, NewCommandArray3);
      } else {
        res.send({
          response_type: "in_channel",
          text: "This 🍈 is not yours to give!",
        });
      }

      break;

    case "who-lime":
      let limeOwner = await getKey(res, limeCall, true);
      res.send({
        response_type: "in_channel",
        text: limeOwner + " is 🍈 Owner!",
      });
      break;

    case "hack-lime":
      let lime_Owner = await getKey(res, limeCall, true);

      if (hacked() && !isWeekend()) {
        // Change the lime owner
        await setKey(res, ["set", "lime", sender], true);

        res.send({
          response_type: "in_channel",
          text: sender + " ✅ You are the new 🍈 owner!🫡 🎉",
        });
      } else {
        // Remove 1 lime from the hacker if fails
        let value = await getKey(res, ["get", sender], true);
        await setKey(res, ["set", sender, parseInt(value) - 1], true);
        res.send({
          response_type: "in_channel",
          text: sender + " ❌ You lost 1 point 🫣 " + getRandomHackingMessage(),
        });
      }

      break;

    case "list-set":
      addToList(res, commandArray);
      break;
    case "list":
      getAllKeys(res, commandArray);
      break;

    default:
      res.send({
        response_type: "ephemeral",
        text: "Wrong usage of the command!",
      });
  }
};

function hacked() {
  return Math.random() > 0.8;
  // return Math.random() < 0.5; 50% chance of true
}

function isWeekend() {
  var today = new Date();
  return today.getDay() == 6 || today.getDay() == 0;
}

function getRandomHackingMessage() {
  // Load the JSON file
  const hackingMessages = message.failedHackingAttempts;

  // Get a random index from the array
  const randomIndex = Math.floor(Math.random() * hackingMessages.length);

  // Return the message at the random index
  return hackingMessages[randomIndex].message;
}
