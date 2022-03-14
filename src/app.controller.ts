/**
 * 컨트롤러
 * url을 가져와서 함수를 반환
 */

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get() // 라우터의 get 역할
  home(): string {
    return 'Welcom to my Movie API';
  }
}
