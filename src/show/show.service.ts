import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Show } from './entities/show.entity';
import { ShowDto } from './dto/show.dto';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  // 모든 공연 조회
  async findAll(): Promise<Show[]> {
    return await this.showRepository.find({
      relations: ['reservations', 'seats'],
    });
  }

  // 특정 공연 조회
  async findOne(id: number): Promise<Show> {
    const show = await this.showRepository.findOne(id, {
      relations: ['reservations', 'seats'],
    });
    if (!show) {
      throw new NotFoundException(`Show with ID ${id} not found`);
    }
    return show;
  }

  // 공연 생성
  async create(file: Express.Multer.File, showDto: ShowDto): Promise<Show> {
    const show = this.showRepository.create(showDto);
    // 업로드된 파일 처리 로직 추가 (가정)
    // 예: show.imagePath = this.saveFile(file);
    return await this.showRepository.save(show);
  }

  // 공연 수정
  async update(id: number, showDto: ShowDto): Promise<Show> {
    const show = await this.showRepository.preload({
      id: id,
      ...showDto,
    });
    if (!show) {
      throw new NotFoundException(`Show with ID ${id} not found`);
    }
    return await this.showRepository.save(show);
  }

  // 공연 삭제
  async delete(id: number): Promise<void> {
    const result = await this.showRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Show with ID ${id} not found`);
    }
  }
}
