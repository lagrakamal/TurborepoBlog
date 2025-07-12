import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Comment E2E', () => {
  let app: INestApplication;
  let accessToken: string;
  let postId: number;
  const testEmail = `commentuser${Date.now()}@example.com`;
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
            createUser(createUserInput: { name: "CommentTestUser", email: "${testEmail}", password: "${testPassword}" }) {
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

    // Einen Post anlegen, um darauf zu kommentieren
    const postRes = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation {
            createPost(createPostInput: { title: "Post für Kommentar", content: "Inhalt", tags: [], published: true }) {
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

  it('should create a comment (with auth)', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation {
            createComment(createCommentInput: { postId: ${postId}, content: "Test-Kommentar" }) {
              id
              content
            }
          }
        `,
      });
    expect(res.body.data.createComment.id).toBeDefined();
    expect(res.body.data.createComment.content).toBe("Test-Kommentar");
  });

  it('should fail to create comment without auth', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createComment(createCommentInput: { postId: ${postId}, content: "NoAuth" }) {
              id
            }
          }
        `,
      });
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].message).toMatch(/Unauthorized|forbidden/i);
  });

  it('should fail to create comment with empty content', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation {
            createComment(createCommentInput: { postId: ${postId}, content: "" }) {
              id
            }
          }
        `,
      });
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].message).toMatch(/bad request/i);
  });
}); 