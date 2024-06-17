/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "neo4j-ogm-sst-issue",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {

    const asd = new sst.aws.Queue({

    });


    new sst.aws.SvelteKit("MyWeb");
  },
});
