import { Roles } from 'src/auth/roles.decorator'; // 사용자 역할 데코레이터
import { RolesGuard } from 'src/auth/roles.guard'; // 역할 기반 가드
import { Role } from 'src/user/types/userRole.type'; // 사용자 역할 타입

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ShowDto } from './dto/show.dto'; // 공연 데이터 전송 객체
import { ShowService } from './show.service';

// RolesGuard를 사용하여 역할 기반의 권한 확인을 수행하는 컨트롤러 클래스 정의
@UseGuards(RolesGuard)
@Controller('show')
export class ShowController {
  // ShowService 주입
  constructor(private readonly showService: ShowService) {}

  // 모든 공연 조회 엔드포인트
  @Get()
  async findAll() {
    return await this.showService.findAll();
  }

  // 특정 공연 조회 엔드포인트
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.showService.findOne(id);
  }

  // RolesGuard를 사용하여 'admin' 역할이 있는 사용자만 접근 가능한 공연 생성 엔드포인트
  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(FileInterceptor('file')) // 파일 업로드를 위한 인터셉터 사용
  async create(@UploadedFile() file: Express.Multer.File) {
    await this.showService.create(file);
  }

  // RolesGuard를 사용하여 'admin' 역할이 있는 사용자만 접근 가능한 공연 수정 엔드포인트
  @Roles(Role.Admin)
  @Put(':id')
  async update(@Param('id') id: number, @Body() ShowDto: ShowDto) {
    await this.showService.update(id, ShowDto);
  }

  // RolesGuard를 사용하여 'admin' 역할이 있는 사용자만 접근 가능한 공연 삭제 엔드포인트
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.showService.delete(id);
  }
}
