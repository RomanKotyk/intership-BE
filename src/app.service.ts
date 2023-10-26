import { HttpStatus, Injectable } from '@nestjs/common';
import { IResponse } from './interfaces/response.interface';

@Injectable()
export class AppService {
  async getResponse(): Promise<IResponse> {
    return { status_code: HttpStatus.OK, detail: 'ok', result: 'working' };
  }
}
