import { createExpressServer } from 'routing-controllers';
import path from 'path'; 
import { initializeRedis } from './common/helper';
const PORT = 80;
const REDIS_PORT = (process.env.REDIS_PORT||6379) as number;
const HOST = '0.0.0.0'; 
console.log('path is '+ path.join(__dirname + '/controllers/*.js'));
initializeRedis(REDIS_PORT);
createExpressServer({
  controllers: [path.join(__dirname + '/controllers/*.js')],
}).listen(PORT,HOST, ()=>console.log(`Running on http://${HOST}:${PORT}`)); 