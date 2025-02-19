import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { CaseService } from './case.service';
import { CreateCaseRequest, DeleteCaseRequest, GetCaseRequest, GetCasesByUserIdRequest, UpdateCaseRequest } from '@app/common/types/cases';


@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Post()
  createCase(@Body() request: CreateCaseRequest) {
    return this.caseService.createCase(request);
  }

  @Get(':id')
  getCase(@Param('id') id: string) {
    const request: GetCaseRequest = { id };
    return this.caseService.getCase(request);
  }

  @Put(':id')
  updateCase(@Param('id') id: string, @Body() body: { title: string; description: string; status: string }) {
    const request: UpdateCaseRequest = { id, ...body };
    return this.caseService.updateCase(request);
  }

  @Delete(':id')
  deleteCase(@Param('id') id: string) {
    const request: DeleteCaseRequest = { id };
    return this.caseService.deleteCase(request);
  }

  @Get()
  getCasesByUserId(@Query('userId') userId: string) {
    const request: GetCasesByUserIdRequest = { userId };
    return this.caseService.getCasesByUserId(request);
  }
}
