import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Like E2E', () => {
  let app: INestApplication;
  let accessToken: string;
  let postId: number;
  const testEmail = `likeuser${Date.now()}@example.com`;
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
            createUser(createUserInput: { name: "LikeTestUser", email: "${testEmail}", password: "${testPassword}" }) {
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

    // Einen Post anlegen, um ihn zu liken
    const postRes = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation {
            createPost(createPostInput: { title: "Post für Like", content: "Inhalt", tags: [], published: true }) {
              id
            }
          }
        `,
      });
    postId = postRes.body.data.createPost.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should like a post (with auth)', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation {
            likePost(postId: ${postId})
          }
        `,
      });
    expect(res.body.data.likePost).toBe(true);
  });

  it('should not allow double-like', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation {
            likePost(postId: ${postId})
          }
        `,
      });
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].message).toMatch(/already liked/i);
  });

  it('should unlike a post (with auth)', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation {
            unlikePost(postId: ${postId})
          }
        `,
      });
    expect(res.body.data.unlikePost).toBe(true);
  });

  it('should fail to like post without auth', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            likePost(postId: ${postId})
          }
        `,
      });
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].message).toMatch(/Unauthorized|forbidden/i);
  });
}); 