import {
  CaseResponse,
  CASES_SERVICE_NAME,
  CasesListResponse,
  CasesServiceClient,
  CreateCaseRequest,
  DeleteCaseRequest,
  DeleteResponse,
  GetCaseRequest,
  GetCasesByUserIdRequest,
  UpdateCaseRequest,
} from '@app/common/types/cases';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CASES_SERVICE } from './constants';
import { Observable } from 'rxjs';

@Injectable()
export class CaseService implements OnModuleInit {
  private casesService: CasesServiceClient;

  constructor(@Inject(CASES_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.casesService = this.client.getService<CasesServiceClient>(CASES_SERVICE_NAME)
  }

  createCase(request: CreateCaseRequest): Observable<CaseResponse> {
    return this.casesService.createCase(request);
  }

  getCase(request: GetCaseRequest): Observable<CaseResponse> {
    return this.casesService.getCase(request);
  }

  updateCase(request: UpdateCaseRequest): Observable<CaseResponse> {
    return this.casesService.updateCase(request);
  }

  deleteCase(request: DeleteCaseRequest): Observable<DeleteResponse> {
    return this.casesService.deleteCase(request);
  }

  getCasesByUserId(
    request: GetCasesByUserIdRequest,
  ): Observable<CasesListResponse> {
    return this.casesService.getCasesByUserId(request);
  }
}
