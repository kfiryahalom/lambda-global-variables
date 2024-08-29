import { App, Environment, Tags } from "aws-cdk-lib";
import { setLambdaDefaults } from "./lambdaDefaults";
import { LambdaStack } from "./lib/lambdaStack";

const env: Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT || "UNDEFINED",
  region: process.env.REGION || "us-east-1",
};
const stage = process.env.STAGE || "dev";
const app = new App();
const serviceName = "lambdaGlobalVariables";

const main = async () => {
  Tags.of(app).add("Service", serviceName);
  Tags.of(app).add("Stage", stage);

  setLambdaDefaults({ stage, serviceName });

  new LambdaStack(app, `${serviceName}-${stage}-lambda`, {
    serviceName,
    stage,
    env,
  });
  return app;
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
