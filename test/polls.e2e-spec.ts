import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Polls API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /polls - should create a poll', async () => {
    const pollData = {
      title: 'Sondage Test',
      description: 'Description test',
      singleChoice: true,
      choices: [
        { text: 'Option A' },
        { text: 'Option B' },
      ],
    };

    const res = await request(app.getHttpServer())
      .post('/polls')
      .send(pollData)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Sondage Test');
    expect(res.body.choices.length).toBe(2);
    expect(res.body.choices[0]).toHaveProperty('text', 'Option A');
  });
});
