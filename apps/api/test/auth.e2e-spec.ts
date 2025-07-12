import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth E2E', () => {
  let app: INestApplication;
  const testEmail = `authuser${Date.now()}@example.com`;
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
            createUser(createUserInput: { name: "AuthTestUser", email: "${testEmail}", password: "${testPassword}" }) {
              id
            }
          }
        `,
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should fail login with wrong credentials', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            signIn(signInInput: { email: "wrong@example.com", password: "wrong" }) {
              accessToken
            }
          }
        `,
      });
    expect(res.body.errors).toBeDefined();
  });

  it('should login successfully with correct credentials', async () => {
    const res = await request(app.getHttpServer())
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
    expect(res.body.data.signIn.accessToken).toBeDefined();
  });

  it('should deny access to protected endpoint without token', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createPost(createPostInput: { title: "Test", content: "Test", tags: [], published: true }) {
              id
            }
          }
        `,
      });
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].message).toMatch(/Unauthorized|forbidden/i);
  });
}); 