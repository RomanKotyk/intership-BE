import { Injectable } from '@nestjs/common';
import { ResponseDto } from './dtos/ResponseDto';

@Injectable()
export class AppService {
  getResponse(): ResponseDto {
    return { status_code: 200, detail: 'ok', result: 'working' };
  }
}
