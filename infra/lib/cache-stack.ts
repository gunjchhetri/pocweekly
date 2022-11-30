import { Port, Vpc, SecurityGroup, Connections, ISecurityGroup } from 'aws-cdk-lib/aws-ec2';
import * as elasticcache from "aws-cdk-lib/aws-elasticache";
import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import { Stack } from 'aws-cdk-lib';
export interface ElasticCacheProps{
   vpc:Vpc
   ecsSecurityGroup: ISecurityGroup
}

export class ElasticCacheStack extends Stack {
    constructor(private scope: Construct, private id: string, private props: ElasticCacheProps) {
        super(scope);
    }
    private initialize(){
        const redisSubnetGroup = new elasticcache.CfnSubnetGroup(
            this,
            `redisSubnetGroup-${this.id}`,
            {
              description: "Subnet group for the redis cluster",
              subnetIds: this.props.vpc.publicSubnets.map((ps) => ps.subnetId),
              cacheSubnetGroupName: "GT-Redis-Subnet-Group",
            }
          );
      
          const redisSecurityGroup = new SecurityGroup(
            this,
            `redisSecurityGroup-${this.id}`,
            {
              vpc: this.props.vpc,
              allowAllOutbound: true,
              description: "Security group for the redis cluster",
            }
          );
          
          const redisCache = new elasticcache.CfnCacheCluster(
            this,
            `redisCache-${this.id}`,
            {
              engine: "redis",
              cacheNodeType: "cache.t3.micro",
              numCacheNodes: 1,
              clusterName: "GT-Dev-Cluster",
              vpcSecurityGroupIds: [redisSecurityGroup.securityGroupId],
              cacheSubnetGroupName: redisSubnetGroup.ref,
              engineVersion: "6.2",
              preferredMaintenanceWindow: "fri:00:30-fri:01:30",
            }
          );
              redisSecurityGroup.connections.allowFrom(
                new Connections({
                  securityGroups: [this.props.ecsSecurityGroup],
                }),
                Port.allTcp(),
                'allow traffic on port 3306 from the backend server security group',
              );
          redisCache.addDependsOn(redisSubnetGroup);
          
          
              new cdk.CfnOutput(this, `CacheEndpointUrl`, {
                value: redisCache.attrRedisEndpointAddress,
              });
          
              new cdk.CfnOutput(this, `CachePort`, {
                value: redisCache.attrRedisEndpointPort,
              });
    }
}