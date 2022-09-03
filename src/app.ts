import { createExpressServer } from 'routing-controllers';
import path from 'path';
const PORT = 80;
const HOST = '0.0.0.0';
console.log('path is '+ path.join(__dirname + '/controllers/*.js'));
createExpressServer({
  controllers: [path.join(__dirname + '/controllers/*.js')],
}).listen(PORT,HOST, ()=>console.log(`Running on http://${HOST}:${PORT}`)); 