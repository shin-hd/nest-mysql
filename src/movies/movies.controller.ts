import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  // 전체 영화정보 가져오기
  @Get()
  getAll() {
    return 'all movies';
  }

  // 타이틀 검색
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `searching for a movie made after: ${searchingYear}`;
  }

  // 특정 영화정보 가져오기
  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return `one movie of id: ${movieId}`;
  }

  // 새 영화정보 생성
  @Post()
  create(@Body() movieData) {
    console.log(movieData);
    return 'create a movie';
  }

  // 기존 영화 삭제
  @Delete(':id')
  delete(@Param('id') movieId: string) {
    return `delete a movie of id: ${movieId}`;
  }

  // 특정 영화정보 업데이트
  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
