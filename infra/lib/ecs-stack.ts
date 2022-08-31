import { Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsp from 'aws-cdk-lib/aws-ecs-patterns';
import * as path from 'path';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { DockerImageAsset, NetworkMode, Platform } from 'aws-cdk-lib/aws-ecr-assets';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
interface ContainerStackProps extends StackProps{
    environment: string
}
export class ContainerStack extends Stack {
  constructor(scope: Construct, id: string, props?: ContainerStackProps) {
    super(scope, id, props);
    const vpc = new Vpc(this, 'MyVpc', { maxAzs: 3 });
    const cluster = new ecs.Cluster(this, 'Cluster', { vpc: vpc });
    const asset = new DockerImageAsset(this, 'MyBuildImage', {
      directory: path.join(__dirname, '../../'),
      networkMode: NetworkMode.HOST,
      platform:Platform.LINUX_ARM64
    });
    console.log('build success');
    // new ecsp.ApplicationLoadBalancedFargateService(this, 'ecs-server', {
    //   desiredCount:3,
    //   cluster:cluster,
    //   cpu:512,
    //   taskImageOptions: {
    //     image: asset.
    //   },
    //   memoryLimitMiB:2048,
    //   publicLoadBalancer: true
    // }); 
  }
}
