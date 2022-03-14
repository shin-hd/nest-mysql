/**
 * 서비스
 * 데이터베이스 연동 및 api 서비스 제공
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nest!';
  }
  getHi(): string {
    return 'Hi Nest!';
  }
}
