import { Role } from 'src/user/types/userRole.type';

import { SetMetadata } from '@nestjs/common';

// Roles 데코레이터를 정의합니다.
// 이 데코레이터는 메타데이터를 설정하여 역할(role) 정보를 전달합니다.
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
