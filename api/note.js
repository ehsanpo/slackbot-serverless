import { tokenizeString } from './_utils';
import { setKey } from './slash_handlers/_set_key';
import { addToList } from './slash_handlers/_add_to_list';
import { listAll } from './slash_handlers/_list_all';
import { getKey } from './slash_handlers/_get_key';
import { removeFromList } from './slash_handlers/_remove_from_list';

module.exports = async (req, res) => {
  const commandArray = tokenizeString(req.body.text);
  const action = commandArray[0];

  switch (action) {
    case 'set':
      setKey(res, commandArray);
      break;
    case 'get':
      getKey(res, commandArray);
      break;
    case '+1':
      //get the key
      let value = await getKey(res, commandArray, true);
      //key plus 1
      const NewCommandArray = ['set', commandArray[1], parseInt(value) + 1];
      //save key
      setKey(res, NewCommandArray);
      break;
    case '-1':
      //get the key
      let value1 = await getKey(res, commandArray, true);
      //key minus 1
      const NewCommandArray1 = ['set', commandArray[1], parseInt(value1) - 1];
      //save key
      setKey(res, NewCommandArray1);
      break;
    case 'lime':
      // fetch lime
      let NewCommandArray2 = ['get', 'lime'];
      let lime = await getKey(res, NewCommandArray2, true);

      const sender = '@' + req.body.user_name;
      const NewCommandArray3 = ['set', 'lime', commandArray[1]];
      if (sender === lime) {
        setKey(res, NewCommandArray3);
      } else {
        res.send({
          response_type: 'in_channel',
          text: 'This 🍈 is not yours to give!',
        });
      }

      break;

    case 'list-set':
      addToList(res, commandArray);
      break;
    case 'list-all':
      listAll(res, commandArray);
      break;

    default:
      res.send({
        response_type: 'ephemeral',
        text: 'Wrong usage of the command!',
      });
  }
};
