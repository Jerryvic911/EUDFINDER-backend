import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SchoolService } from '../src/modules/school/school.service';
import * as fs from 'fs';
import { CreateSchoolDto } from '../src/modules/school/school.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const schoolService = app.get(SchoolService);

  const data = fs.readFileSync('all_nigerian_universities.json', 'utf-8');
  const schools = JSON.parse(data) as CreateSchoolDto[];

  await schoolService.deleteAll();

  for (const school of schools) {
    try {
      await schoolService.create(school);
      console.log(`✅ Added: ${school.name}`);
    } catch (err: any) {
      console.error(`❌ Failed: ${school.name}`, err?.message || err);
    }
  }

  console.log(`✅ Seeded ${schools.length} schools.`);
  await app.close();
}

bootstrap();
