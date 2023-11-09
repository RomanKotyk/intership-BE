import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IResponse } from './interface/response.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getHello(): Promise<IResponse<string>> {
    return this.appService.getResponse();
  }
}
