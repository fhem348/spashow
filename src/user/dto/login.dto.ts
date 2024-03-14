import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// 로그인 요청에 사용되는 DTO 클래스 정의
export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
}
