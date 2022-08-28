import { JsonController, Get} from 'routing-controllers';

@JsonController()
export class WeatherController {
  @Get('/users')
  getAll() {
    return [{area:'NE', weather:'Humid'}, {area:'SW', weather: 'Sunny'}];
  }
}