import { Stack, StackProps } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path from "path";
import { lambdaDefaults } from "../lambdaDefaults";
import { IProps } from "../types";

export interface LambdaProps extends IProps, StackProps {}

export class LambdaStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    private props: LambdaProps,
  ) {
    super(scope, id, props);

    // objectInitializer
    this.createFunction("objectInitializer", "innerInitialize");
    this.createFunction("objectInitializer", "outerInitialize");
    this.createFunction("objectInitializer", "innerInitializeSingleton");

    // memory
    this.createFunction("memory", "outOfMemory");
    this.createFunction("memory", "incorrectGlobalVariableUsage");

    // configuration
    this.createFunction("configuration", "getConfig");
  }

  createFunction = (dirName: string, functionName: string): NodejsFunction => {
    return new NodejsFunction(this, `${functionName}-fn`, {
      functionName: `${this.props.serviceName}-${this.props.stage}-${functionName}`,
      entry: path.normalize(
        __dirname + `/../../src/handlers/${dirName}/${functionName}.ts`,
      ),
      ...lambdaDefaults,
      handler: `${functionName}Handler`,
    });
  };
}
