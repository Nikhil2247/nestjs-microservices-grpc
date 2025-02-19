import {
  CaseResponse,
  CasesListResponse,
  CreateCaseRequest,
  DeleteCaseRequest,
  DeleteResponse,
  GetCaseRequest,
  GetCasesByUserIdRequest,
  UpdateCaseRequest,
} from '@app/common/types/cases';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/auth/src/prisma.service';

@Injectable()
export class CaseService {
  constructor(private readonly prisma: PrismaService) {}

  async createCase(request: CreateCaseRequest): Promise<CaseResponse> {
    const createdCase = await this.prisma.case.create({
      data: {
        userId: request.userId,
        title: request.title,
        description: request.description,
        status: request.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return { cases: createdCase };
  }

  async getCase(request: GetCaseRequest): Promise<CaseResponse> {
    const caseRecord = await this.prisma.case.findUnique({
      where: { id: request.id },
    });
    return { cases: caseRecord };
  }

  async updateCase(request: UpdateCaseRequest): Promise<CaseResponse> {
    const updatedCase = await this.prisma.case.update({
      where: { id: request.id },
      data: {
        title: request.title,
        description: request.description,
        status: request.status,
        updatedAt: new Date(),
      },
    });
    return { cases: updatedCase };
  }

  async deleteCase(request: DeleteCaseRequest): Promise<DeleteResponse> {
    await this.prisma.case.delete({
      where: { id: request.id },
    });
    return { success: true };
  }

  async getCasesByUserId(
    request: GetCasesByUserIdRequest,
  ): Promise<CasesListResponse> {
    const cases = await this.prisma.case.findMany({
      where: { userId: request.userId },
      orderBy: { createdAt: 'desc' },
    });
    return { cases };
  }
}
