import { ZObject } from "zapier-platform-core";
import Constants from './constants';

const Authentication = {
  type: 'custom',
  test: {
    url: `${Constants.API_BASE}/user`
  },
  fields: [
    {
      key: 'api_key',
      type: 'string',
      required: true,
      helpText: "Your JotForm account API key"
    }
  ]
};

export default Authentication;
