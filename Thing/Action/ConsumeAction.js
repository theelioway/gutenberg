import request from "request";
import { merge } from "lodash-es";

const gutenberg = "https://project-gutenberg-api.p.rapidapi.com/books/";
const key = process.env.key;

export const UserInteraction = async function UserInteraction(action) {
  const actionStatus = "FailedActionStatus";
  const mainEntityOfPage = "UserInteraction";
  return merge(action, { mainEntityOfPage, Action: { actionStatus } });
};

export const ConsumeAction = async function ConsumeAction(action) {
  action = await ActionThing(action);
  const { Action } = action;
  Action.url = Action.url || gutenberg;
  Action.instrument = Action.instrument || key;
  const { thing } = Action.object;
  const options = {
    method: "GET",
    url: `${Action.url}${thing.identifier}`,
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": Action.instrument,
      "X-RapidAPI-Host": "project-gutenberg-api.p.rapidapi.com",
    },
  };
  Action.result = await new Promise((resolve) => {
    request(options, (error, _, body) => {
      if (error) {
        resolve(UserInteraction(merge(action, { Action: { error } })));
      }
      resolve(new Object({ ...thing, ...body }));
    });
  });
  return action;
};

export default ConsumeAction;