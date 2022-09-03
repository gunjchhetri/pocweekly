import { Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsp from 'aws-cdk-lib/aws-ecs-patterns';
import * as path from 'path';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
interface ContainerStackProps extends StackProps{
    environment: string
}
export class ContainerStack extends Stack {
  constructor(scope: Construct, id: string, props?: ContainerStackProps) {
    super(scope, id, props);
    const vpc = new Vpc(this, 'MyVpc', { maxAzs: 3 });
    const cluster = new ecs.Cluster(this, 'Cluster', { vpc: vpc });
    new ecsp.ApplicationLoadBalancedFargateService(this, 'ecs-server', {
      desiredCount:1,
      cluster:cluster,
      cpu:512,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, '../../src')),
      },
      memoryLimitMiB:2048,
      publicLoadBalancer: true
    }); 
  }
}
