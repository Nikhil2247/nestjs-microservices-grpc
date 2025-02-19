import { NestFactory } from '@nestjs/core';
import { CaseModule } from './case.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CASES_PACKAGE_NAME } from '@app/common/types/cases';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CaseModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../cases.proto'),
        package: CASES_PACKAGE_NAME,
        url: "localhost:5001",
      },
    },
  );
  await app.listen();
}
bootstrap();
