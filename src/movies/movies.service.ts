import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  // 전체 영화 조회 서비스
  getAll(): Movie[] {
    return this.movies;
  }

  // 특정 영화 조회 서비스
  getOne(id: string): Movie {
    return this.movies.find((movie) => movie.id === +id);
  }

  // 특정 영화 삭제 서비스
  deleteOne(id: string): boolean {
    this.movies = this.movies.filter((movie) => movie.id !== +id);
    return true;
  }

  // 영화 정보 생성 서비스
  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
}
