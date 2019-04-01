const { version } = require("../package.json");
import { version as platformVersion } from "zapier-platform-core";

import Authentication from "./authentication";
import Middleware from "./middleware";
import Submission from "./triggers/submission";
import Form from "./resources/form";

const App = {
  version,
  platformVersion,

  authentication: Authentication,

  beforeRequest: [
    Middleware.AddApiKey
  ],

  afterResponse: [
    Middleware.HandleHttpError
  ],

  triggers: {
    [Form.key]: Form,
    [Submission.key]: Submission
  },

  searches: {},

  creates: {}
};

export default App;
