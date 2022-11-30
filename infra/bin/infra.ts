import { ElasticCacheStack } from './../lib/cache-stack';
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib'; 
import { ContainerStack } from '../lib/ecs-stack';
import { environment } from '../common/constant';

const app = new cdk.App();
const containerStack =new ContainerStack(app,`container-stack`,{environment});
const redisStack = new ElasticCacheStack(app,'cache-redis',{vpc:containerStack.vpc,ecsSecurityGroup:containerStack.ecsSecurityGroup});
redisStack.addDependency(containerStack);