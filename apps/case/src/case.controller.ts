import { Controller, Get } from '@nestjs/common';
import { CaseService } from './case.service';
import {
  CaseResponse,
  CasesListResponse,
  CasesServiceController,
  CasesServiceControllerMethods,
  CreateCaseRequest,
  DeleteCaseRequest,
  DeleteResponse,
  GetCaseRequest,
  GetCasesByUserIdRequest,
  UpdateCaseRequest,
} from '@app/common/types/cases';

@Controller()
@CasesServiceControllerMethods()
export class CaseController implements CasesServiceController {
  constructor(private readonly casesService: CaseService) {}

  createCase(request: CreateCaseRequest): Promise<CaseResponse> {
    return this.casesService.createCase(request);
  }

  getCase(request: GetCaseRequest): Promise<CaseResponse> {
    return this.casesService.getCase(request);
  }

  updateCase(request: UpdateCaseRequest): Promise<CaseResponse> {
    return this.casesService.updateCase(request);
  }

  deleteCase(request: DeleteCaseRequest): Promise<DeleteResponse> {
    return this.casesService.deleteCase(request);
  }

  getCasesByUserId(
    request: GetCasesByUserIdRequest,
  ): Promise<CasesListResponse> {
    return this.casesService.getCasesByUserId(request);
  }
}
