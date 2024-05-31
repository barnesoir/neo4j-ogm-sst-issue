/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "lambda-example",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "eu-west-2"
        }
      }
    };
  },
  async run() {
    const api = new sst.aws.ApiGatewayV2("ExampleNeo4jApi");
    api.route("GET /", "lambda.handler");
  },
});
