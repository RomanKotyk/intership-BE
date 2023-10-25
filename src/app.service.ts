import { Injectable } from '@nestjs/common';
import { ResponseDto } from './interfaces/response_interface';

@Injectable()
export class AppService {
  getResponse(): ResponseDto {
    return { status_code: 200, detail: 'ok', result: 'working' };
  }
}
