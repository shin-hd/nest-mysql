import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { InsertResult, UpdateResult } from 'typeorm';

@Injectable()
export class MoviesService {
  //private movies: Movie[] = [];
  constructor(
    @InjectRepository(Movie)
    private readonly movies: Repository<Movie>,
  ) {}

  // 전체 영화 조회 서비스
  getAll(): Promise<Movie[]> {
    return this.movies.find();
  }

  // 특정 영화 조회 서비스
  getOne(id: number): Promise<Movie> {
    const movie: Promise<Movie> = this.movies.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not fountd.`);
    }
    return movie;
  }

  // 특정 영화 삭제 서비스
  async deleteOne(id: number): Promise<void> {
    this.getOne(id); // 에러체크
    await this.movies.delete(id);
  }

  // 영화 정보 생성 서비스
  create(movieData: CreateMovieDTO): Promise<InsertResult> {
    const movie = new Movie();
    Object.assign(movie, movieData);

    return this.movies.insert(movie);
  }

  // 영화 정보 업데이트 서비스
  update(id: number, updateData: UpdateMovieDTO): Promise<UpdateResult> {
    this.getOne(id); // 에러체크
    return this.movies.update(id, updateData);
  }
}
