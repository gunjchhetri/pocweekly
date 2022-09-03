import * as redis from 'redis';
let redisClient:redis.RedisClientType;
export const initializeRedis = async (redisPort: number)=>{ 
    redisClient = redis.createClient({
      socket: {
         host :'redis-server',
         port: redisPort
      }
    });
    redisClient.on('error', (err)=>{
       console.log('Error occurred in redis connection', err);
    });
  
    await redisClient.connect(); 
}
export const getRedisClient = () =>{
   return Object.freeze(redisClient);
}
