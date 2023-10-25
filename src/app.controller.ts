import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDto } from './interfaces/response_interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getHello(): Promise<ResponseDto> {
    return this.appService.getResponse();
  }
}
