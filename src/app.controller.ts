/**
 * 컨트롤러
 * url을 가져와서 함수를 반환
 */

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // 라우터의 get 역할
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello') // app.get
  sayHello(): string {
    return this.appService.getHi();
  }
}
