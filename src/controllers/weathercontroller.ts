import { JsonController, Get} from 'routing-controllers';
import { getRedisClient } from '../common/helper';
const weather = [{area:'NE',weather:'Humid'}, {area:'SW', weather: 'Sunny'}];
@JsonController()
export class WeatherController {
  @Get('/users')
  async getAll() { 
    let redisClient = await getRedisClient();
    console.log('redis client', redisClient);
    let weatherFromCache= await redisClient.get('weather');
    if(weatherFromCache){
      console.log("returned from cache");
      return "FROM CACHE";
    } else{
      await redisClient.set('weather', JSON.stringify(weather));
      console.log('returned fresh data')
      return "FRESH FETCHED";
    } 
  }
} 