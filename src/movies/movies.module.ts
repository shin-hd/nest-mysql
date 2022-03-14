import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService], // 컨트롤러에 서비스 의존성 주입
})
export class MoviesModule {}
