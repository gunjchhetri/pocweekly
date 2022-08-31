import config from 'config'; 

export const environment = config.get<string>("cdk.environment");
export const defaultConfig={env:{region: config.get<string>("cdk.region"), account: config.get<string>("cdk.account")}}