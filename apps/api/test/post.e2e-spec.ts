import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Post E2E', () => {
  let app: INestApplication;
  let accessToken: string;
  const testEmail = `postuser${Date.now()}@example.com`;
  const testPassword = 'Test@123';
  let createdPostId: number;

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
            createUser(createUserInput: { name: "PostTestUser", email: "${testEmail}", password: "${testPassword}" }) {
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
          mutation SignIn($input: SignInInput!) {
            signIn(signInInput: $input) {
              accessToken
            }
          }
        `,
        variables: {
          input: {
            email: testEmail,
            password: testPassword
          }
        }
      });
    accessToken = loginRes.body.data.signIn.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a post (with auth)', async () => {
    // Nutzt exakt die Mutation/Struktur aus dem Frontend
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation CreatePost($input: CreatePostInput!) {
            createPost(createPostInput: $input) {
              id
              title
              content
              thumbnail
              author {
                id
                name
              }
            }
          }
        `,
        variables: {
          input: {
            title: "Test Post",
            content: "Test Content",
            tags: [],
            published: true,
          }
        }
      });
    expect(res.body.data.createPost.id).toBeDefined();
    expect(res.body.data.createPost.title).toBe("Test Post");
    createdPostId = res.body.data.createPost.id;
  });

  it('should get all posts (public)', async () => {
    // Nutzt die Query-Struktur aus dem Frontend
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query posts($skip: Int, $take: Int) {
            posts(skip: $skip, take: $take) {
              id
              title
              thumbnail
              content
              createdAt
              slug
            }
            postCount
          }
        `,
        variables: { skip: 0, take: 10 }
      });
    expect(res.body.data.posts).toBeInstanceOf(Array);
    expect(res.body.data.posts.length).toBeGreaterThan(0);
  });

  it('should fail to create post without auth', async () => {
    // Fehlerfall: kein Auth-Token
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation CreatePost($input: CreatePostInput!) {
            createPost(createPostInput: $input) {
              id
            }
          }
        `,
        variables: {
          input: {
            title: "NoAuth",
            content: "NoAuth",
            tags: [],
            published: true,
          }
        }
      });
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].message).toMatch(/Unauthorized|forbidden/i);
  });

  it('should create a post with tags and tags should be globally available and linked to post', async () => {
    const tagNames = ["AutoTag1", "AutoTag2"];
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation CreatePost($input: CreatePostInput!) {
            createPost(createPostInput: $input) {
              id
              title
              tags { id name }
            }
          }
        `,
        variables: {
          input: {
            title: "Post mit Tags",
            content: "Inhalt mit Tags",
            tags: tagNames,
            published: true,
          }
        }
      });
    expect(res.body.data.createPost.id).toBeDefined();
    expect(res.body.data.createPost.tags).toBeInstanceOf(Array);
    expect(res.body.data.createPost.tags.length).toBe(2);
    const returnedTagNames = res.body.data.createPost.tags.map((t: any) => t.name);
    expect(returnedTagNames).toEqual(expect.arrayContaining(tagNames));

    // Prüfe, ob die Tags global verfügbar sind
    const tagsRes = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            tags { id name }
          }
        `
      });
    const globalTagNames = tagsRes.body.data.tags.map((t: any) => t.name);
    expect(globalTagNames).toEqual(expect.arrayContaining(tagNames));
  });
}); 