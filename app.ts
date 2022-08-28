import { createExpressServer } from 'routing-controllers';
import path from 'path';

createExpressServer({
  controllers: [path.join(__dirname + '/controllers/*.js')],
}).listen(3000, ()=>console.log('server started')); 