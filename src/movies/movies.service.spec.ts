import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const movieArray = [
  { title: 'Test Movie #1', genre: 'test', year: 2000 },
  { title: 'Test Movie #2', genre: 'test', year: 2010 },
];

const oneMovie = { title: 'Test Movie', genre: 'test', year: 2000 };
const updatedMovie = { title: 'Test Movie', genre: 'test', year: 2000 };

describe('MoviesService', () => {
  let service: MoviesService;
  let repository: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            find: jest.fn().mockResolvedValue(movieArray),
            findOneBy: jest.fn().mockResolvedValue(oneMovie),
            insert: jest.fn().mockResolvedValue(oneMovie),
            update: jest.fn(),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const oneMovie = { title: 'Test Movie', genre: 'test', year: 2000 };
      expect(
        service.create({ title: 'Test Movie', genre: 'test', year: 2000 }),
      ).resolves.toEqual(oneMovie);
    });
  });

  describe('getAll()', () => {
    it('should return an array', async () => {
      const movies: Movie[] = await service.getAll();
      expect(movies).toEqual(movieArray);
    });
  });

  describe('getOne', () => {
    it('should return a movie', async () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      //service.create({ title: 'Test Movie', genres: ['test'], year: 2000 });
      const movie: Movie = await service.getOne(1);
      expect(movie).toBeDefined();
      expect(repoSpy).toBeCalledWith({ id: 1 });
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(99999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID 99999 not found.`);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.deleteOne(2);
      expect(removeSpy).toBeCalledWith(2);
      expect(retVal).toBeUndefined();
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(99999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID 99999 not found.`);
      }
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const updateSpy = jest.spyOn(repository, 'update');
      service.update(1, {});
      expect(updateSpy).toBeCalledWith(1, {});
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(99999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID 99999 not found.`);
      }
    });
  });
});
