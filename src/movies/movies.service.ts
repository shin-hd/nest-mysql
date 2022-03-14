import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  // 전체 영화 조회 서비스
  getAll(): Movie[] {
    return this.movies;
  }

  // 특정 영화 조회 서비스
  getOne(id: number): Movie {
    const movie: Movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not fountd.`);
    }
    return movie;
  }

  // 특정 영화 삭제 서비스
  deleteOne(id: number) {
    this.getOne(id); // 에러체크
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  // 영화 정보 생성 서비스
  create(movieData: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  // 영화 정보 업데이트 서비스
  update(id: number, updateData: UpdateMovieDTO) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
