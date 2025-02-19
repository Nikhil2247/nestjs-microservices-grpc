import { Module } from '@nestjs/common';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';
import { PrismaService } from 'apps/auth/src/prisma.service';

@Module({
  imports: [],
  controllers: [CaseController],
  providers: [CaseService, PrismaService],
})
export class CaseModule {}
