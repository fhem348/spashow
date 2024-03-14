import Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { ShowModule } from './show/show.module';
import { SeatModule } from './seat/seat.module';
import { ReservationModule } from './reservation/reservation.module';

// TypeORM 설정 옵션을 동적으로 생성하는 함수
const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(), // Snake 케이스 네이밍 전략 사용
    type: 'mysql',
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    entities: [User], // 사용할 엔티티 목록
    synchronize: configService.get('DB_SYNC'), // 데이터베이스 스키마 자동 동기화 여부
    logging: true, // 쿼리 로깅 여부
  }),
  inject: [ConfigService], // ConfigService 주입
};

@Module({
  imports: [
    // Nest.js ConfigModule 설정
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 설정
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
      }),
    }),

    // TypeORM 설정을 비동기적으로 가져와서 사용
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),

    // AuthModule과 UserModule 추가
    AuthModule,
    UserModule,
    ShowModule,
    SeatModule,
    ReservationModule,
  ],
  controllers: [], // 컨트롤러
  providers: [], // 프로바이더
})
export class AppModule {}
