import { IsNotEmpty, IsString, IsInt, IsDate, IsUrl } from 'class-validator';

export class ShowDto {
  @IsString()
  @IsNotEmpty({ message: '포스터 이미지 URL을 입력해주세요.' })
  @IsUrl({}, { message: '올바른 URL 형식이 아닙니다.' })
  showPoster: string;

  @IsString()
  @IsNotEmpty({ message: '공연 제목을 입력해주세요' })
  Title: string;

  @IsString()
  @IsNotEmpty({ message: '출연진 정보를 입력해주세요.' })
  Cast: string;

  @IsString()
  @IsNotEmpty({ message: '장르를 입력해주세요.' })
  Genre: string;

  @IsString()
  @IsNotEmpty({ message: '내용을 입력해주세요.' })
  content: string;

  @IsString()
  @IsNotEmpty({ message: '몇시에 공연을 시작하는지 입력해주세요.' })
  DateTime: string;

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  showVenue: string;

  @IsDate()
  @IsNotEmpty({ message: '공연 시간 입력해주세요.' })
  RunTime: Date;

  @IsInt()
  @IsNotEmpty({ message: '가격을 입력해주세요.' })
  Price: number;

  @IsInt()
  @IsNotEmpty({ message: '좌석 수를 입력해주세요.' })
  seat: number;
}
