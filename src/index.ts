const { version } = require("../package.json");
import { version as platformVersion } from "zapier-platform-core";

import Authentication from "./authentication";
import Middleware from "./middleware";

const App = {
  version,
  platformVersion,

  Authentication: Authentication,

  beforeRequest: [
    Middleware.AddApiKey
  ],

  afterResponse: [
    Middleware.HandleHttpError
  ],

  triggers: {},

  searches: {},

  creates: {}
};

export default App;
