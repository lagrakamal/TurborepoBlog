import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('User E2E', () => {
    let app: INestApplication;
    let accessToken: string;
    let userId: number;
    const testEmail = `user${Date.now()}@example.com`;
    const testPassword = 'test123';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should register a new user', async () => {
        const res = await request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `
          mutation {
            createUser(createUserInput: { name: "TestUser", email: "${testEmail}", password: "${testPassword}" }) {
              id
              email
            }
          }
        `,
            });
        expect(res.body.data.createUser.id).toBeDefined();
        expect(res.body.data.createUser.email).toBe(testEmail);
        userId = res.body.data.createUser.id;
    });

    it('should not allow duplicate email registration', async () => {
        const res = await request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `
          mutation {
            createUser(createUserInput: { name: "TestUser", email: "${testEmail}", password: "${testPassword}" }) {
              id
            }
          }
        `,
            });
        expect(res.body.errors).toBeDefined();
        expect(res.body.errors[0].message).toMatch(/already exists|duplicate/i);
    });

    it('should login and get user profile', async () => {
        // Login
        const loginRes = await request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `
          mutation {
            signIn(signInInput: { email: "${testEmail}", password: "${testPassword}" }) {
              accessToken
              id
            }
          }
        `,
            });
        accessToken = loginRes.body.data.signIn.accessToken;
        userId = loginRes.body.data.signIn.id;

        // Get user profile
        const res = await request(app.getHttpServer())
            .post('/graphql')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                query: `
          query {
            user(id: ${userId}) {
              id
              email
            }
          }
        `,
            });
        expect(res.body.data.user.id).toBe(userId);
        expect(res.body.data.user.email).toBe(testEmail);
    });
}); 