import { DockerImage, Duration } from "aws-cdk-lib";
import {
  Architecture,
  Runtime,
  RuntimeManagementMode,
} from "aws-cdk-lib/aws-lambda";
import { NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { IProps } from "./types";
import path from "path";

export let lambdaDefaults: NodejsFunctionProps;

export const setLambdaDefaults = (props: IProps): void => {
  lambdaDefaults = {
    handler: "handler",
    runtime: Runtime.NODEJS_20_X,
    memorySize: 128,
    timeout: Duration.seconds(30),
    architecture: Architecture.ARM_64,
    runtimeManagementMode: RuntimeManagementMode.AUTO,
    depsLockFilePath: path.resolve(__dirname + "/../yarn.lock"),
    awsSdkConnectionReuse: true,
    bundling: {
      target: "es2022",
      sourceMap: false, // Enable if you like to see source maps, but it's having a substantial performance hit on cold start and regular runtime.
      minify: true,
      metafile: false,
      dockerImage: DockerImage.fromRegistry("arm64v8/ubuntu"),
    },
    environment: {
      STAGE: props.stage,
      SERVICE: props.serviceName,
      LOG_LEVEL: "info",
      NODE_OPTIONS: "", //set to --enable-source-maps for debug https://serverless.pub/aws-lambda-node-sourcemaps/
      NODE_ENV: "production", //Solves runtime exception, if using minify:true https://github.com/graphql/graphql-js/pull/1174
    },
  };
};
