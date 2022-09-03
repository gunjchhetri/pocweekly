#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ContainerStack } from '../lib/ecs-stack';
import { environment } from '../common/constant';

const app = new cdk.App();
new ContainerStack(app,`container-stack`,{environment});