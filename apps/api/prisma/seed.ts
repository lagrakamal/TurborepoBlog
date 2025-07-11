import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';
const Chance = require('chance');

const prisma = new PrismaClient();
const chance = new Chance();

function generateSlug(title: string, index?: number): string {
  let slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Add index to ensure uniqueness
  if (index !== undefined) {
    slug = `${slug}-${index}`;
  }

  return slug;
}

async function main() {
  console.log('🌱 Starting comprehensive seeding...');

  // Create users with realistic tech data
  const users = await Promise.all(
    Array.from({ length: 25 }).map(async () => {
      const hashedPassword = await hash('Password@123');
      const firstName = chance.first();
      const lastName = chance.last();

      return {
        name: `${firstName} ${lastName}`,
        email: chance.email({ domain: 'techcompany.com' }),
        bio: chance.paragraph({ sentences: 2 }),
        avatar: `https://picsum.photos/150/150?random=${chance.integer({ min: 1, max: 1000 })}`,
        password: hashedPassword,
      };
    }),
  );

  await prisma.user.createMany({
    data: users,
  });

  console.log(`✅ Created ${users.length} users`);

  // Comprehensive blog post titles with categories
  const postTitles = [
    // React & Frontend (50 posts)
    'Getting Started with React 18 and Concurrent Features',
    'Building Scalable React Applications with TypeScript',
    'Advanced React Patterns: Compound Components',
    'React Performance Optimization Techniques',
    'State Management in React: Redux vs Context API',
    'Building Custom React Hooks for Reusability',
    'React Server Components: The Future of React',
    'Testing React Applications with Jest and RTL',
    'React Native: Building Cross-Platform Mobile Apps',
    'Advanced CSS-in-JS with Styled Components',
    'React Suspense and Error Boundaries',
    'Building Progressive Web Apps with React',
    'React Router v6: Advanced Routing Patterns',
    'Optimizing React Bundle Size and Performance',
    'React Accessibility: Building Inclusive Apps',
    'React Animation Libraries: Framer Motion Deep Dive',
    'React Form Libraries: React Hook Form vs Formik',
    'Building Micro-Frontends with React',
    'React Internationalization (i18n) Strategies',
    'React Security Best Practices',
    'React Code Splitting and Lazy Loading',
    'React Error Monitoring and Debugging',
    'Building React Design Systems',
    'React Data Fetching: SWR vs React Query',
    'React Testing: Unit, Integration, and E2E',
    'React Performance Profiling Tools',
    'Building React Admin Dashboards',
    'React SEO Optimization Techniques',
    'React State Machines with XState',
    'React GraphQL Integration with Apollo',
    'React Microservices Architecture',
    'React Docker Containerization',
    'React CI/CD Pipeline Setup',
    'React Monitoring and Analytics',
    'React Accessibility Testing Tools',
    'React Performance Monitoring',
    'React Security Scanning Tools',
    'React Code Quality Tools',
    'React Documentation Best Practices',
    'React Team Collaboration Tools',
    'React Code Review Guidelines',
    'React Deployment Strategies',
    'React Backup and Recovery',
    'React Disaster Recovery Planning',
    'React Compliance and Governance',
    'React Risk Management',
    'React Change Management',
    'React Incident Response',
    'React Business Continuity',
    'React Vendor Management',
    'React Contract Negotiation',
    'React Service Level Agreements',

    // Backend & API (50 posts)
    'Building RESTful APIs with Node.js and Express',
    'GraphQL API Design Best Practices',
    'Microservices Architecture with NestJS',
    'Database Design Principles and Patterns',
    'API Security: Authentication and Authorization',
    'Rate Limiting and API Throttling Strategies',
    'API Documentation with OpenAPI/Swagger',
    'API Versioning Strategies',
    'API Testing: Unit, Integration, and Load Testing',
    'API Monitoring and Observability',
    'Building Event-Driven Architectures',
    'Message Queues: Redis, RabbitMQ, and Kafka',
    'Caching Strategies: Redis and Memcached',
    'Database Optimization and Indexing',
    'SQL vs NoSQL: Choosing the Right Database',
    'Database Migration and Schema Evolution',
    'Database Backup and Recovery Strategies',
    'Database Security and Encryption',
    'Database Replication and Sharding',
    'Database Performance Monitoring',
    'Building Real-time APIs with WebSockets',
    'API Gateway Patterns and Implementation',
    'Service Mesh with Istio and Linkerd',
    'Container Orchestration with Kubernetes',
    'Serverless Architecture with AWS Lambda',
    'API Design for Mobile Applications',
    'Building Scalable APIs with Go',
    'API Design for IoT Applications',
    'Building APIs with Python FastAPI',
    'API Design for E-commerce Platforms',
    'Building APIs with Java Spring Boot',
    'API Design for Social Media Platforms',
    'Building APIs with C# and .NET',
    'API Design for Gaming Platforms',
    'Building APIs with PHP Laravel',
    'API Design for Financial Services',
    'Building APIs with Ruby on Rails',
    'API Design for Healthcare Platforms',
    'Building APIs with Rust',
    'API Design for Educational Platforms',
    'Building APIs with Scala and Play',
    'API Design for Travel Platforms',
    'Building APIs with Elixir and Phoenix',
    'API Design for Real Estate Platforms',
    'Building APIs with Kotlin and Spring',
    'API Design for Food Delivery Platforms',
    'Building APIs with Swift and Vapor',
    'API Design for Ride-Sharing Platforms',
    'Building APIs with Clojure',
    'API Design for Dating Platforms',
    'Building APIs with Haskell',
    'API Design for Job Platforms',
    'Building APIs with F# and .NET',

    // DevOps & Infrastructure (50 posts)
    'Docker Containerization Best Practices',
    'Kubernetes Cluster Management',
    'CI/CD Pipeline Implementation with Jenkins',
    'Infrastructure as Code with Terraform',
    'Cloud-Native Application Development',
    'AWS Services for Modern Applications',
    'Google Cloud Platform Deep Dive',
    'Azure Cloud Services Overview',
    'Monitoring and Logging with ELK Stack',
    'Application Performance Monitoring',
    'Security in DevOps: DevSecOps',
    'Container Security Best Practices',
    'Kubernetes Security and RBAC',
    'Cloud Security and Compliance',
    'Disaster Recovery and Business Continuity',
    'Load Balancing and Auto Scaling',
    'Database High Availability Setup',
    'Network Security and Firewalls',
    'SSL/TLS Certificate Management',
    'Identity and Access Management (IAM)',
    'Secrets Management with HashiCorp Vault',
    'Configuration Management with Ansible',
    'Service Mesh Implementation',
    'Blue-Green Deployment Strategies',
    'Canary Deployment Implementation',
    'Rolling Update Strategies',
    'Infrastructure Monitoring with Prometheus',
    'Log Aggregation and Analysis',
    'Distributed Tracing with Jaeger',
    'Chaos Engineering Principles',
    'GitOps: Git as Single Source of Truth',
    'Infrastructure Testing Strategies',
    'Cloud Cost Optimization',
    'Multi-Cloud Strategy Implementation',
    'Edge Computing and CDN',
    'Serverless Computing Patterns',
    'Container Registry Management',
    'Kubernetes Operators Development',
    'Helm Charts and Package Management',
    'Kubernetes Networking Deep Dive',
    'Storage Solutions for Containers',
    'Backup and Restore Strategies',
    'Disaster Recovery Testing',
    'Performance Testing and Optimization',
    'Security Scanning and Vulnerability Management',
    'Compliance and Audit Automation',
    'Infrastructure Documentation',
    'Team Collaboration in DevOps',
    'DevOps Metrics and KPIs',
    'Change Management in DevOps',
    'Incident Response Automation',

    // Data Science & AI (50 posts)
    'Introduction to Machine Learning Algorithms',
    'Deep Learning with TensorFlow and PyTorch',
    'Natural Language Processing Fundamentals',
    'Computer Vision and Image Recognition',
    'Data Preprocessing and Feature Engineering',
    'Model Evaluation and Validation',
    'Hyperparameter Tuning Techniques',
    'Ensemble Learning Methods',
    'Neural Network Architecture Design',
    'Transfer Learning Applications',
    'Reinforcement Learning Basics',
    'Time Series Analysis and Forecasting',
    'Big Data Processing with Apache Spark',
    'Data Visualization with D3.js',
    'Statistical Analysis with Python',
    'A/B Testing and Experimentation',
    'Recommendation Systems Implementation',
    'Sentiment Analysis with NLP',
    'Object Detection and Recognition',
    'Speech Recognition and Synthesis',
    'Text Mining and Information Extraction',
    'Clustering and Dimensionality Reduction',
    'Regression Analysis Techniques',
    'Classification Algorithms Comparison',
    'Anomaly Detection Methods',
    'Data Quality Assessment and Cleaning',
    'Feature Selection and Dimensionality Reduction',
    'Model Deployment and Serving',
    'MLOps: Machine Learning Operations',
    'Model Monitoring and Drift Detection',
    'Explainable AI and Model Interpretability',
    'Federated Learning Applications',
    'AutoML and Automated Machine Learning',
    'Edge AI and IoT Applications',
    'AI Ethics and Responsible AI',
    'Data Privacy and GDPR Compliance',
    'Bias Detection and Fairness in AI',
    'Adversarial Attacks and Defense',
    'Generative Adversarial Networks (GANs)',
    'Transformer Models and Attention Mechanisms',
    'BERT and Pre-trained Language Models',
    'Computer Vision with OpenCV',
    'Data Pipeline Design and Implementation',
    'Real-time Data Processing',
    'Data Lake and Data Warehouse Design',
    'ETL Process Optimization',
    'Data Governance and Management',
    'Data Lineage and Provenance',
    'Data Catalog and Discovery',
    'Data Security and Encryption',
    'Data Backup and Recovery',
    'Data Archiving and Retention',

    // Mobile Development (50 posts)
    'React Native App Development Best Practices',
    'Flutter Cross-Platform Development',
    'iOS App Development with Swift',
    'Android App Development with Kotlin',
    'Mobile App Performance Optimization',
    'Mobile App Security Best Practices',
    'Mobile App Testing Strategies',
    'Mobile App UI/UX Design Principles',
    'Mobile App State Management',
    'Mobile App Navigation Patterns',
    'Mobile App Offline Functionality',
    'Mobile App Push Notifications',
    'Mobile App Analytics and Tracking',
    'Mobile App Monetization Strategies',
    'Mobile App Store Optimization',
    'Mobile App Deep Linking',
    'Mobile App Authentication',
    'Mobile App Data Storage',
    'Mobile App Network Layer',
    'Mobile App Background Processing',
    'Mobile App Location Services',
    'Mobile App Camera Integration',
    'Mobile App Payment Integration',
    'Mobile App Social Media Integration',
    'Mobile App Accessibility',
    'Mobile App Internationalization',
    'Mobile App Performance Monitoring',
    'Mobile App Crash Reporting',
    'Mobile App A/B Testing',
    'Mobile App User Onboarding',
    'Mobile App Gamification',
    'Mobile App Personalization',
    'Mobile App Search Functionality',
    'Mobile App Content Management',
    'Mobile App Video Streaming',
    'Mobile App Audio Processing',
    'Mobile App AR/VR Integration',
    'Mobile App IoT Integration',
    'Mobile App Blockchain Integration',
    'Mobile App Machine Learning',
    'Mobile App Cloud Integration',
    'Mobile App API Design',
    'Mobile App Database Design',
    'Mobile App Caching Strategies',
    'Mobile App Synchronization',
    'Mobile App Error Handling',
    'Mobile App Logging and Debugging',
    'Mobile App Code Review',
    'Mobile App Deployment',
    'Mobile App Maintenance',
    'Mobile App Updates and Versioning',

    // Web Development (50 posts)
    'Modern JavaScript ES6+ Features',
    'TypeScript Advanced Patterns',
    'CSS Grid and Flexbox Mastery',
    'Web Accessibility (WCAG) Guidelines',
    'Progressive Web Apps (PWA)',
    'Web Performance Optimization',
    'Web Security Best Practices',
    'Web Testing with Cypress',
    'Web Animation and Transitions',
    'Web Typography and Design',
    'Web Forms and Validation',
    'Web APIs and Fetch API',
    'Web Storage and Caching',
    'Web Workers and Service Workers',
    'Web Sockets and Real-time Communication',
    'Web Audio and Video APIs',
    'Web Geolocation and Maps',
    'Web Notifications API',
    'Web Payment APIs',
    'Web Bluetooth and WebUSB',
    'Web Assembly (WASM)',
    'Web Components and Custom Elements',
    'Web Bundlers: Webpack, Vite, Rollup',
    'Web Build Tools and Optimization',
    'Web Development Tools and Extensions',
    'Web Debugging and DevTools',
    'Web SEO and Meta Tags',
    'Web Analytics and Tracking',
    'Web A/B Testing Implementation',
    'Web Content Management Systems',
    'Web E-commerce Platforms',
    'Web Blog and CMS Development',
    'Web Portfolio and Personal Sites',
    'Web Business and Corporate Sites',
    'Web Educational Platforms',
    'Web Social Media Platforms',
    'Web Gaming Platforms',
    'Web Streaming Platforms',
    'Web News and Media Sites',
    'Web Government and Public Sites',
    'Web Healthcare Platforms',
    'Web Financial Services Sites',
    'Web Real Estate Platforms',
    'Web Travel and Tourism Sites',
    'Web Food and Restaurant Sites',
    'Web Fashion and Retail Sites',
    'Web Automotive and Transportation',
    'Web Entertainment and Events',
    'Web Sports and Fitness Sites',
    'Web Technology and IT Sites',
    'Web Non-profit and Charity Sites',

    // Database & Data Management (50 posts)
    'SQL Database Design Principles',
    'NoSQL Database Selection Guide',
    'Database Normalization Techniques',
    'Database Indexing Strategies',
    'Database Query Optimization',
    'Database Backup and Recovery',
    'Database Security and Encryption',
    'Database Replication and Clustering',
    'Database Sharding Strategies',
    'Database Migration Tools',
    'Database Monitoring and Performance',
    'Database Schema Design',
    'Database Stored Procedures',
    'Database Triggers and Events',
    'Database Views and Materialized Views',
    'Database Transactions and ACID',
    'Database Concurrency Control',
    'Database Deadlock Prevention',
    'Database Connection Pooling',
    'Database Caching Strategies',
    'Database Partitioning',
    'Database Archiving Strategies',
    'Database Data Warehousing',
    'Database Business Intelligence',
    'Database ETL Processes',
    'Database Data Quality Management',
    'Database Master Data Management',
    'Database Reference Data Management',
    'Database Metadata Management',
    'Database Data Lineage',
    'Database Data Governance',
    'Database Compliance and Audit',
    'Database Risk Management',
    'Database Change Management',
    'Database Version Control',
    'Database Testing Strategies',
    'Database Development Workflow',
    'Database Code Review',
    'Database Documentation',
    'Database Training and Education',
    'Database Support and Maintenance',
    'Database Troubleshooting',
    'Database Performance Tuning',
    'Database Capacity Planning',
    'Database Disaster Recovery',
    'Database High Availability',
    'Database Load Balancing',
    'Database Failover Strategies',
    'Database Monitoring Tools',
    'Database Alerting Systems',
    'Database Reporting Tools',
    'Database Analytics Platforms',

    // Security & Cybersecurity (50 posts)
    'Web Application Security Fundamentals',
    'OWASP Top 10 Security Risks',
    'Authentication and Authorization',
    'Password Security and Hashing',
    'Multi-Factor Authentication (MFA)',
    'Single Sign-On (SSO) Implementation',
    'API Security Best Practices',
    'Data Encryption and Key Management',
    'SSL/TLS Certificate Management',
    'Network Security and Firewalls',
    'Intrusion Detection and Prevention',
    'Security Information and Event Management',
    'Vulnerability Assessment and Penetration Testing',
    'Security Code Review',
    'Secure Software Development Lifecycle',
    'Security Testing and Quality Assurance',
    'Incident Response and Forensics',
    'Security Monitoring and Alerting',
    'Threat Intelligence and Analysis',
    'Security Compliance and Governance',
    'Risk Assessment and Management',
    'Security Awareness and Training',
    'Physical Security and Access Control',
    'Cloud Security Best Practices',
    'Container Security and Hardening',
    'Kubernetes Security and RBAC',
    'DevSecOps Integration',
    'Security Automation and Orchestration',
    'Zero Trust Security Model',
    'Identity and Access Management',
    'Privileged Access Management',
    'Data Loss Prevention',
    'Email Security and Anti-Spam',
    'Endpoint Security and Protection',
    'Mobile Device Security',
    'IoT Security Challenges',
    'Blockchain Security Considerations',
    'AI and Machine Learning Security',
    'Social Engineering Prevention',
    'Phishing Detection and Prevention',
    'Ransomware Protection and Recovery',
    'Business Continuity and Disaster Recovery',
    'Security Metrics and KPIs',
    'Security Audit and Compliance',
    'Security Policy Development',
    'Security Architecture Design',
    'Security Tool Selection',
    'Security Budget and ROI',
    'Security Team Building',
    'Security Vendor Management',
    'Security Incident Communication',
    'Security Legal and Regulatory',
  ];

  console.log(`📝 Creating ${postTitles.length} posts...`);

  // Create posts with realistic content and images
  for (let i = 0; i < postTitles.length; i++) {
    const title = postTitles[i];
    const slug = generateSlug(title, i);

    // Generate appropriate image based on title content
    let imageKeyword = 'technology';
    if (title.toLowerCase().includes('react') || title.toLowerCase().includes('frontend')) {
      imageKeyword = 'react,programming';
    } else if (title.toLowerCase().includes('docker') || title.toLowerCase().includes('container')) {
      imageKeyword = 'docker,container';
    } else if (title.toLowerCase().includes('database') || title.toLowerCase().includes('sql')) {
      imageKeyword = 'database,server';
    } else if (title.toLowerCase().includes('security')) {
      imageKeyword = 'security,cybersecurity';
    } else if (title.toLowerCase().includes('css') || title.toLowerCase().includes('design')) {
      imageKeyword = 'design,ui';
    } else if (title.toLowerCase().includes('api') || title.toLowerCase().includes('graphql')) {
      imageKeyword = 'api,programming';
    } else if (title.toLowerCase().includes('testing')) {
      imageKeyword = 'testing,quality';
    } else if (title.toLowerCase().includes('performance')) {
      imageKeyword = 'performance,optimization';
    } else if (title.toLowerCase().includes('cloud') || title.toLowerCase().includes('aws')) {
      imageKeyword = 'cloud,aws';
    } else if (title.toLowerCase().includes('machine learning') || title.toLowerCase().includes('ai')) {
      imageKeyword = 'artificial-intelligence,machine-learning';
    } else if (title.toLowerCase().includes('blockchain')) {
      imageKeyword = 'blockchain,cryptocurrency';
    } else if (title.toLowerCase().includes('devops')) {
      imageKeyword = 'devops,automation';
    } else if (title.toLowerCase().includes('mobile')) {
      imageKeyword = 'mobile,app';
    } else if (title.toLowerCase().includes('data science')) {
      imageKeyword = 'data-science,analytics';
    }

    // Generate realistic content based on category
    let content = '';
    const paragraphs = chance.integer({ min: 8, max: 15 });

    if (title.toLowerCase().includes('react') || title.toLowerCase().includes('frontend')) {
      content = chance.paragraph({ sentences: paragraphs * 3 });
      content += `\n\nReact is a powerful JavaScript library for building user interfaces. Components are the building blocks of React applications. State management is crucial for dynamic applications. Hooks provide a way to use state and other React features. JSX allows you to write HTML-like code in JavaScript. Virtual DOM optimizes rendering performance. Props enable component communication. Lifecycle methods control component behavior.`;
    } else if (title.toLowerCase().includes('docker') || title.toLowerCase().includes('container')) {
      content = chance.paragraph({ sentences: paragraphs * 3 });
      content += `\n\nDocker containers provide consistent environments across different platforms. Dockerfiles define the container image configuration. Docker Compose manages multi-container applications. Container orchestration with Kubernetes scales applications. Docker Hub hosts public and private container images. Volume mounting persists data between containers. Network configuration enables container communication. Security best practices protect containerized applications.`;
    } else if (title.toLowerCase().includes('database')) {
      content = chance.paragraph({ sentences: paragraphs * 3 });
      content += `\n\nDatabase design principles ensure data integrity and performance. Normalization reduces data redundancy and anomalies. Indexing improves query performance significantly. ACID properties guarantee transaction reliability. SQL queries retrieve and manipulate data efficiently. Database relationships maintain referential integrity. Backup strategies protect against data loss. Query optimization enhances application performance.`;
    } else if (title.toLowerCase().includes('security')) {
      content = chance.paragraph({ sentences: paragraphs * 3 });
      content += `\n\nWeb application security prevents common vulnerabilities. Authentication verifies user identity securely. Authorization controls access to resources. HTTPS encryption protects data in transit. Input validation prevents injection attacks. Cross-site scripting (XSS) protection is essential. SQL injection prevention secures database queries. Regular security audits identify potential threats.`;
    } else {
      content = chance.paragraph({ sentences: paragraphs * 3 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        thumbnail: `https://picsum.photos/600/400?random=${i}`,
        authorId: chance.integer({ min: 1, max: 25 }),
        published: chance.bool({ likelihood: 85 }), // 85% published
      },
    });

    // Add comments to posts
    const commentCount = chance.integer({ min: 0, max: 25 });
    const comments = Array.from({ length: commentCount }).map(() => ({
      content: chance.paragraph({ sentences: chance.integer({ min: 1, max: 4 }) }),
      authorId: chance.integer({ min: 1, max: 25 }),
      postId: post.id,
    }));

    if (comments.length > 0) {
      await prisma.comment.createMany({
        data: comments,
      });
    }

    // Add likes to posts
    const likeCount = chance.integer({ min: 0, max: 50 });
    if (likeCount > 0) {
      const randomUsers = chance.pickset(
        Array.from({ length: 25 }, (_, i) => i + 1),
        likeCount
      );

      const likes = randomUsers.map(userId => ({
        postId: post.id,
        userId,
      }));

      await prisma.like.createMany({
        data: likes,
      });
    }

    if ((i + 1) % 50 === 0) {
      console.log(`✅ Created ${i + 1} posts...`);
    }
  }

  // Create comprehensive tags
  const tagNames = [
    'React', 'TypeScript', 'JavaScript', 'Node.js', 'NestJS', 'GraphQL',
    'CSS', 'HTML', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
    'Database', 'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
    'API', 'REST', 'Testing', 'Jest', 'Cypress', 'Playwright',
    'Performance', 'Security', 'DevOps', 'CI/CD', 'Jenkins', 'GitHub Actions',
    'Frontend', 'Backend', 'Mobile', 'React Native', 'Flutter', 'iOS', 'Android',
    'Machine Learning', 'AI', 'Data Science', 'Python', 'TensorFlow', 'PyTorch',
    'Blockchain', 'Cryptocurrency', 'Web3', 'Ethereum', 'Solidity',
    'Microservices', 'Serverless', 'Lambda', 'Functions', 'Event-Driven',
    'Monitoring', 'Logging', 'Observability', 'Prometheus', 'Grafana',
    'Authentication', 'Authorization', 'OAuth', 'JWT', 'SAML',
    'Caching', 'CDN', 'Load Balancing', 'Auto Scaling', 'High Availability',
    'Data Engineering', 'ETL', 'Data Pipeline', 'Apache Spark', 'Kafka',
    'UI/UX', 'Design System', 'Accessibility', 'Responsive Design',
    'SEO', 'Analytics', 'Google Analytics', 'A/B Testing', 'Conversion',
    'E-commerce', 'Payment Processing', 'Stripe', 'PayPal', 'Shopping Cart',
    'Social Media', 'Content Management', 'CMS', 'WordPress', 'Headless CMS',
    'Real-time', 'WebSockets', 'Socket.io', 'Server-Sent Events',
    'Progressive Web App', 'PWA', 'Service Workers', 'Offline First',
    'Internationalization', 'i18n', 'Localization', 'Multi-language',
    'Code Quality', 'ESLint', 'Prettier', 'SonarQube', 'Code Review',
    'Architecture', 'Design Patterns', 'SOLID Principles', 'Clean Code',
    'Agile', 'Scrum', 'Kanban', 'Project Management', 'Team Collaboration',
    'Documentation', 'Technical Writing', 'API Documentation', 'Swagger',
    'Deployment', 'Blue-Green', 'Canary', 'Rolling Updates', 'Zero Downtime',
    'Compliance', 'GDPR', 'HIPAA', 'SOX', 'PCI DSS', 'Data Privacy',
    'Disaster Recovery', 'Backup', 'Business Continuity', 'Risk Management',
    'Cost Optimization', 'Resource Management', 'Budget Planning', 'ROI',
    'Vendor Management', 'Third-party Integration', 'API Gateway', 'Service Mesh',
    'Legacy Systems', 'Migration', 'Modernization', 'Refactoring', 'Technical Debt',
    'Innovation', 'Emerging Technologies', 'Future Trends', 'Digital Transformation'
  ];

  console.log(`🏷️ Creating ${tagNames.length} tags...`);

  for (const tagName of tagNames) {
    await prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName },
    });
  }

  // Add tags to posts
  const allPosts = await prisma.post.findMany();
  const allTags = await prisma.tag.findMany();

  console.log('🔗 Adding tags to posts...');

  for (const post of allPosts) {
    const tagCount = chance.integer({ min: 2, max: 6 });
    const randomTags = chance.pickset(allTags, tagCount);

    for (const tag of randomTags) {
      await prisma.post.update({
        where: { id: post.id },
          data: {
          tags: {
            connect: { id: tag.id },
          },
        },
      });
    }
  }

  // Generate some additional realistic data
  console.log('📊 Generating additional data...');

  // Add some draft posts
  const draftPosts = Array.from({ length: 15 }).map((_, index) => ({
    title: chance.sentence({ words: chance.integer({ min: 5, max: 10 }) }),
    slug: generateSlug(chance.sentence({ words: chance.integer({ min: 5, max: 10 }) }), postTitles.length + index),
    content: chance.paragraph({ sentences: chance.integer({ min: 10, max: 20 }) }),
    thumbnail: `https://picsum.photos/600/400?random=${postTitles.length + index + chance.integer({ min: 1, max: 1000 })}`,
    authorId: chance.integer({ min: 1, max: 25 }),
    published: false, // Draft posts
  }));

  for (const draftPost of draftPosts) {
    await prisma.post.create({
      data: draftPost,
    });
  }

  console.log('✅ Seeding completed successfully!');
  console.log(`📈 Summary:`);
  console.log(`   - ${users.length} users created`);
  console.log(`   - ${postTitles.length + draftPosts.length} posts created`);
  console.log(`   - ${tagNames.length} tags created`);
  console.log(`   - Comments and likes added randomly`);
  console.log(`   - Realistic images from Unsplash`);
  console.log(`   - Themed content based on post titles`);
}

main()
  .then(() => {
    prisma.$disconnect();
    process.exit(0);
  })
  .catch((e) => {
    prisma.$disconnect();
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  });
