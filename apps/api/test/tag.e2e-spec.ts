import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Tag E2E', () => {
  let app: INestApplication;
  let accessToken: string;
  const testEmail = `taguser${Date.now()}@example.com`;
  const testPassword = 'Test@123';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // User anlegen
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createUser(createUserInput: { name: "TagTestUser", email: "${testEmail}", password: "${testPassword}" }) {
              id
            }
          }
        `,
      });

    // Login und Token holen
    const loginRes = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            signIn(signInInput: { email: "${testEmail}", password: "${testPassword}" }) {
              accessToken
            }
          }
        `,
      });
    accessToken = loginRes.body.data.signIn.accessToken;

    // Einen Post mit Tags anlegen, damit Tags entstehen
    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation {
            createPost(createPostInput: { title: "Post mit Tags", content: "Inhalt", tags: ["TagA", "TagB"], published: true }) {
              id
            }
          }
        `,
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get all tags (public)', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            tags {
              id
              name
            }
          }
        `,
      });
    expect(res.body.data.tags).toBeInstanceOf(Array);
    expect(res.body.data.tags.length).toBeGreaterThanOrEqual(2);
    const tagNames = res.body.data.tags.map((t: any) => t.name);
    expect(tagNames).toContain('TagA');
    expect(tagNames).toContain('TagB');
  });
}); 