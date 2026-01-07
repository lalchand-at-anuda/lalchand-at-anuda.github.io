// =============================================
// Blogs Data
// =============================================
// Safety: Prevent accidental template interpolation from code examples inside content strings
// by defining placeholders used in sample snippets. These keep blog content literal.
const userId = '${userId}';
const version = '${version}';
const BLOGS = [
  {
    id: 'ai-agents-production',
    title: 'Deploying AI Agents in Production: Patterns & Pitfalls',
    category: 'AI',
    date: '2025-12-03',
    readingTime: '7 min',
    tags: ['AI', 'Agents', 'Node.js'],
    excerpt: 'A practical guide to designing, monitoring, and scaling AI agents in production environments with Node.js.',
    thumbLabel: 'Case Study',
    content: `\n# Deploying AI Agents in Production\n\nLearn patterns, observability, and failure handling to run AI agents reliably...`,
  },
  {
    id: 'mern-performance',
    title: 'MERN Performance: Cutting TTFB & LCP the Right Way',
    category: 'Full Stack',
    date: '2025-11-18',
    readingTime: '6 min',
    tags: ['MERN', 'Performance', 'React'],
    excerpt: 'Techniques to reduce TTFB and LCP for large React apps with SSR/SPA hybrid strategies.',
    thumbLabel: 'Guide',
    content: `Optimization strategies and production checklists...`,
  },
  {
    id: 'websockets-scaling',
    title: 'Scaling Real-time Systems with Socket.io & Redis',
    category: 'Real-time',
    date: '2025-10-02',
    readingTime: '8 min',
    tags: ['Socket.io', 'Redis', 'Real-time'],
    excerpt: 'Architectural patterns and trade-offs when building large-scale realtime systems.',
    thumbLabel: 'Architecture',
    content: `Queues, sharding, and backpressure handling...`,
  },
  {
    id: 'docker-devops-pipeline',
    title: 'Docker‑first DevOps Pipelines on a Budget',
    category: 'DevOps',
    date: '2025-09-14',
    readingTime: '5 min',
    tags: ['DevOps', 'Docker', 'CI/CD'],
    excerpt: 'Setting up pragmatic pipelines with Docker, GitHub Actions, and sensible caching.',
    thumbLabel: 'Playbook',
    content: `From buildx to multi-stage images...`,
  },
  {
    id: 'jwt-best-practices',
    title: 'JWT Best Practices: Short TTLs, Rotations, and Beyond',
    category: 'Full Stack',
    date: '2025-08-01',
    readingTime: '6 min',
    tags: ['JWT', 'Auth', 'Security'],
    excerpt: 'Protect your apps with JWT strategies that actually work in production.',
    thumbLabel: 'Security',
    content: `Key rotation and refresh tokens...`,
  },
  {
    id: 'figma-dev-handoff',
    title: 'Figma → Dev Handoff: Make It Seamless',
    category: 'Full Stack',
    date: '2025-07-15',
    readingTime: '4 min',
    tags: ['Figma', 'UX', 'Frontend'],
    excerpt: 'Improve your design-dev handoff with components, tokens, and clear specs.',
    thumbLabel: 'UX',
    content: `Tokens and component libraries...`,
  },
  {
    id: 'react-hooks-optimization',
    title: 'Mastering React Hooks: Custom Hooks for Complex State Management',
    category: 'Full Stack',
    date: '2025-12-15',
    readingTime: '8 min',
    tags: ['React', 'Hooks', 'JavaScript'],
    excerpt: 'Deep dive into creating custom React hooks to simplify complex state logic and boost code reusability.',
    thumbLabel: 'Tutorial',
    content: `# Mastering React Hooks\n\n## Introduction\nReact Hooks revolutionized how we write components. In this guide, we'll explore advanced patterns for creating custom hooks that make your code more maintainable and reusable.\n\n## Understanding the Basics\nBefore diving into custom hooks, let's review the fundamental rules:\n- Only call hooks at the top level\n- Only call hooks from React function components\n- Use the ESLint plugin to enforce these rules\n\n## Creating Your First Custom Hook\n\nA custom hook is simply a JavaScript function that uses other hooks. Let's build a useLocalStorage hook:\n\n\`\`\`javascript\nfunction useLocalStorage(key, initialValue) {\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      console.error(error);\n      return initialValue;\n    }\n  });\n\n  const setValue = (value) => {\n    try {\n      const valueToStore = value instanceof Function ? value(storedValue) : value;\n      setStoredValue(valueToStore);\n      window.localStorage.setItem(key, JSON.stringify(valueToStore));\n    } catch (error) {\n      console.error(error);\n    }\n  };\n\n  return [storedValue, setValue];\n}\n\`\`\`\n\n## Advanced Patterns\nLearn about debouncing, async operations, and dependency injection in custom hooks...`,
  },
  {
    id: 'mongodb-indexing-strategy',
    title: 'MongoDB Indexing Strategy: From Basics to Advanced',
    category: 'Full Stack',
    date: '2025-12-01',
    readingTime: '9 min',
    tags: ['MongoDB', 'Database', 'Performance'],
    excerpt: 'Master MongoDB indexing to optimize query performance and reduce latency in your applications.',
    thumbLabel: 'Database',
    content: `# MongoDB Indexing Strategy\n\n## Why Indexing Matters\nIndexes are crucial for database performance. They allow MongoDB to efficiently find documents without scanning every document in a collection.\n\n## Index Types\n\n### Single Field Index\nThe simplest form of indexing:\n\n\`\`\`javascript\ndb.users.createIndex({ email: 1 })\n\`\`\`\n\n### Compound Index\nFor queries that filter on multiple fields:\n\n\`\`\`javascript\ndb.orders.createIndex({ customerId: 1, createdAt: -1 })\n\`\`\`\n\n## Monitoring Index Performance\n\nUse the explain() method to understand query execution:\n\n\`\`\`javascript\ndb.users.find({ email: 'user@example.com' }).explain('executionStats')\n\`\`\`\n\n## Common Pitfalls\n- Creating too many indexes increases write overhead\n- Not analyzing query patterns before indexing\n- Using indexes for fields with low cardinality\n\n## Best Practices\n1. Index fields used in query filters first\n2. Index sort fields in the order of the sort\n3. Regularly review unused indexes\n4. Monitor index size and performance impact...`,
  },
  {
    id: 'nodejs-streams-tutorial',
    title: 'Node.js Streams: Building Scalable Data Processing',
    category: 'Full Stack',
    date: '2025-11-25',
    readingTime: '7 min',
    tags: ['Node.js', 'Streams', 'Performance'],
    excerpt: 'Learn how to use Node.js streams to process large datasets efficiently without consuming excessive memory.',
    thumbLabel: 'Advanced',
    content: `# Node.js Streams: Building Scalable Data Processing\n\n## What are Streams?\nStreams are objects that let you read data from a source or write data to a destination in chunks.\n\n## Types of Streams\n\n### Readable Streams\nEmit 'data' events with chunks:\n\n\`\`\`javascript\nconst fs = require('fs');\nconst readStream = fs.createReadStream('large-file.txt');\n\nreadStream.on('data', (chunk) => {\n  console.log('Received chunk:', chunk.length, 'bytes');\n});\n\nreadStream.on('end', () => {\n  console.log('No more data');\n});\n\`\`\`\n\n### Transform Streams\nModify data as it passes through:\n\n\`\`\`javascript\nconst { Transform } = require('stream');\n\nconst uppercase = new Transform({\n  transform(chunk, encoding, callback) {\n    this.push(chunk.toString().toUpperCase());\n    callback();\n  }\n});\n\nprocess.stdin.pipe(uppercase).pipe(process.stdout);\n\`\`\`\n\n## Backpressure Handling\nCritical for preventing memory leaks:\n\n\`\`\`javascript\nif (!destination.write(chunk)) {\n  source.pause();\n}\n\`\`\`\n\n## Real-World Use Cases\n- Processing large CSV files\n- Streaming video/audio\n- Real-time log processing...`,
  },
  {
    id: 'docker-multi-stage-build',
    title: 'Docker Multi-Stage Builds: Optimizing Container Images',
    category: 'DevOps',
    date: '2025-11-10',
    readingTime: '6 min',
    tags: ['Docker', 'DevOps', 'Optimization'],
    excerpt: 'Reduce Docker image sizes significantly using multi-stage builds and best practices.',
    thumbLabel: 'DevOps Guide',
    content: `# Docker Multi-Stage Builds\n\n## The Problem\nTraditional Dockerfiles can create large images because build dependencies are included in the final image.\n\n## Solution: Multi-Stage Builds\n\nUse multiple FROM statements to separate build and runtime stages:\n\n\`\`\`dockerfile\n# Stage 1: Build\nFROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\n\n# Stage 2: Runtime\nFROM node:18-alpine\nWORKDIR /app\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY . .\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]\n\`\`\`\n\n## Benefits\n- Smaller final images (often 50-90% reduction)\n- Faster deployments\n- Improved security (build tools not in production)\n- Better layer caching\n\n## Advanced Patterns\n- Named stages for complex builds\n- Conditional stages based on build arguments\n- Sharing artifacts between stages\n\n## Size Comparison\nBefore multi-stage: ~850MB\nAfter multi-stage: ~120MB\n\nThat's a 7x reduction!`,
  },
  {
    id: 'redis-caching-strategy',
    title: 'Redis Caching Strategy: Cache Invalidation & TTL Patterns',
    category: 'Full Stack',
    date: '2025-10-28',
    readingTime: '8 min',
    tags: ['Redis', 'Caching', 'Performance'],
    excerpt: 'Master Redis caching patterns including invalidation strategies, TTL management, and cache warming.',
    thumbLabel: 'Performance',
    content: `# Redis Caching Strategy\n\n## Cache Invalidation: The Hard Problem\nPhil Karlton famously said: "There are only two hard things in Computer Science: cache invalidation and naming things."\n\n## Common Strategies\n\n### 1. TTL-Based (Expiration)\n\n\`\`\`javascript\nredis.setex('user:123', 3600, JSON.stringify(userData)); // 1 hour TTL\n\`\`\`\n\n### 2. Event-Based Invalidation\n\n\`\`\`javascript\n// On user update\nawait redis.del('user:123');\nawait redis.del('user:123:posts');\n\`\`\`\n\n### 3. Versioning Strategy\n\n\`\`\`javascript\nconst cacheKey = \`user:${userId}:v${version}\`;\nredis.setex(cacheKey, 86400, JSON.stringify(userData));\n\`\`\`\n\n## Cache Warming\nPre-populate cache for frequently accessed data:\n\n\`\`\`javascript\nasync function warmCache() {\n  const topUsers = await db.users.find().limit(1000);\n  for (const user of topUsers) {\n    await redis.setex(\n      \`user:\${user.id}\`,\n      3600,\n      JSON.stringify(user)\n    );\n  }\n}\n\`\`\`\n\n## Monitoring & Debugging\n- Track hit/miss ratios\n- Monitor memory usage\n- Identify cache staleness issues\n\n## Best Practices\n1. Always set TTL for cached data\n2. Use cache versioning for critical data\n3. Implement graceful degradation\n4. Monitor cache performance metrics`,
  },
  {
    id: 'graphql-api-design',
    title: 'GraphQL API Design: From Schema to Production',
    category: 'Full Stack',
    date: '2025-10-15',
    readingTime: '9 min',
    tags: ['GraphQL', 'API Design', 'Backend'],
    excerpt: 'Learn best practices for designing GraphQL APIs that scale, including schema design, error handling, and security.',
    thumbLabel: 'API Design',
    content: `# GraphQL API Design\n\n## Schema Design Principles\n\n### 1. Think in Graphs, Not Endpoints\n\n\`\`\`graphql\ntype User {\n  id: ID!\n  name: String!\n  email: String!\n  posts: [Post!]!\n  followers: [User!]!\n}\n\ntype Post {\n  id: ID!\n  title: String!\n  content: String!\n  author: User!\n  comments: [Comment!]!\n}\n\n\`\`\`\n\n### 2. Error Handling\n\n\`\`\`graphql\ntype Query {\n  user(id: ID!): UserResult!\n}\n\nunion UserResult = User | NotFoundError | UnauthorizedError\n\n\`\`\`\n\n## Query Optimization\n\n### DataLoader for N+1 Prevention\n\n\`\`\`javascript\nconst userLoader = new DataLoader(async (userIds) => {\n  return await db.users.find({ id: { $in: userIds } });\n});\n\n\`\`\`\n\n## Pagination Best Practices\n\n\`\`\`graphql\ntype Query {\n  users(first: Int!, after: String): UserConnection!\n}\n\ntype UserConnection {\n  edges: [UserEdge!]!\n  pageInfo: PageInfo!\n}\n\n\`\`\`\n\n## Security Considerations\n- Query complexity analysis\n- Rate limiting\n- Authentication & Authorization\n- Input validation\n\n## Production Checklist\n- Implement query complexity limits\n- Add request timeout policies\n- Monitor query performance\n- Version your API gradually`,
  },
  {
    id: 'testing-strategies-jest',
    title: 'Testing Strategies with Jest: Unit, Integration & E2E',
    category: 'Full Stack',
    date: '2025-09-30',
    readingTime: '8 min',
    tags: ['Testing', 'Jest', 'JavaScript'],
    excerpt: 'Comprehensive guide to testing strategies including unit tests, integration tests, and end-to-end testing with Jest.',
    thumbLabel: 'Testing',
    content: `# Testing Strategies with Jest\n\n## Unit Testing\n\nTest individual functions in isolation:\n\n\`\`\`javascript\ndescribe('calculateTotal', () => {\n  it('should sum all items correctly', () => {\n    const items = [{ price: 10 }, { price: 20 }];\n    expect(calculateTotal(items)).toBe(30);\n  });\n\n  it('should handle empty arrays', () => {\n    expect(calculateTotal([])).toBe(0);\n  });\n});\n\`\`\`\n\n## Mocking Dependencies\n\n\`\`\`javascript\njest.mock('./database');\n\ndescribe('UserService', () => {\n  it('should fetch user from database', async () => {\n    const mockUser = { id: 1, name: 'John' };\n    db.findUser.mockResolvedValue(mockUser);\n    \n    const result = await UserService.getUser(1);\n    expect(result).toEqual(mockUser);\n  });\n});\n\`\`\`\n\n## Integration Testing\n\n\`\`\`javascript\ndescribe('User API', () => {\n  it('should create and retrieve a user', async () => {\n    const response = await request(app)\n      .post('/api/users')\n      .send({ name: 'Jane', email: 'jane@example.com' });\n    \n    expect(response.status).toBe(201);\n    expect(response.body).toHaveProperty('id');\n  });\n});\n\`\`\`\n\n## Snapshot Testing\n\n\`\`\`javascript\nit('should render component correctly', () => {\n  const tree = renderer.create(<Component />).toJSON();\n  expect(tree).toMatchSnapshot();\n});\n\`\`\`\n\n## Coverage Goals\n- Aim for 80%+ code coverage\n- Focus on critical paths first\n- Test edge cases and error scenarios\n\n## Best Practices\n1. Write tests alongside your code\n2. Keep tests independent and isolated\n3. Use descriptive test names\n4. Mock external dependencies\n5. Test behavior, not implementation`,
  },
  {
    id: 'websocket-realtime-chat',
    title: 'Building a Real-time Chat App with WebSockets',
    category: 'Real-time',
    date: '2025-09-12',
    readingTime: '7 min',
    tags: ['WebSockets', 'Socket.io', 'Real-time'],
    excerpt: 'Step-by-step guide to building a scalable real-time chat application using WebSockets and Socket.io.',
    thumbLabel: 'Tutorial',
    content: `# Building a Real-time Chat App with WebSockets\n\n## Setting Up Socket.io\n\n\`\`\`javascript\nconst express = require('express');\nconst http = require('http');\nconst socketIo = require('socket.io');\n\nconst app = express();\nconst server = http.createServer(app);\nconst io = socketIo(server, {\n  cors: { origin: '*' }\n});\n\n\`\`\`\n\n## Handling Connections\n\n\`\`\`javascript\nio.on('connection', (socket) => {\n  console.log('User connected:', socket.id);\n  \n  socket.on('join-room', (roomId) => {\n    socket.join(roomId);\n    io.to(roomId).emit('user-joined', socket.id);\n  });\n  \n  socket.on('send-message', (data) => {\n    io.to(data.roomId).emit('receive-message', {\n      message: data.message,\n      sender: socket.id,\n      timestamp: new Date()\n    });\n  });\n  \n  socket.on('disconnect', () => {\n    console.log('User disconnected:', socket.id);\n  });\n});\n\`\`\`\n\n## Client-Side Implementation\n\n\`\`\`javascript\nconst socket = io();\n\nsocket.on('connect', () => {\n  console.log('Connected to server');\n  socket.emit('join-room', 'room-123');\n});\n\nsocket.on('receive-message', (data) => {\n  displayMessage(data);\n});\n\nfunction sendMessage(text) {\n  socket.emit('send-message', {\n    roomId: 'room-123',\n    message: text\n  });\n}\n\`\`\`\n\n## Scaling Considerations\n- Use Redis adapter for multi-instance deployments\n- Implement message history storage\n- Handle connection failures gracefully\n- Monitor connection pool size\n\n## Security\n- Authenticate socket connections\n- Validate all incoming messages\n- Implement rate limiting per user`,
  },
  {
    id: 'typescript-strict-mode',
    title: 'TypeScript Strict Mode: Configuration & Best Practices',
    category: 'Full Stack',
    date: '2025-08-20',
    readingTime: '6 min',
    tags: ['TypeScript', 'Configuration', 'Best Practices'],
    excerpt: 'Master TypeScript strict mode configurations to catch errors at compile-time and improve code quality.',
    thumbLabel: 'Configuration',
    content: `# TypeScript Strict Mode\n\n## Why Enable Strict Mode?\n\nStrict mode enables additional type checking rules that help prevent bugs and improve code quality.\n\n## Essential Compiler Options\n\n\`\`\`json\n{\n  "compilerOptions": {\n    "strict": true,\n    "strictNullChecks": true,\n    "strictFunctionTypes": true,\n    "strictBindCallApply": true,\n    "strictPropertyInitialization": true,\n    "noImplicitAny": true,\n    "noImplicitThis": true,\n    "alwaysStrict": true\n  }\n}\n\`\`\`\n\n## Common Issues & Solutions\n\n### Null/Undefined Issues\n\n\`\`\`typescript\n// Before: Error with strict mode\nfunction getName(user) {\n  return user.name.toUpperCase(); // Type Error!\n}\n\n// After: Proper handling\nfunction getName(user: User | null): string {\n  return user?.name?.toUpperCase() ?? 'Unknown';\n}\n\n\`\`\`\n\n### Type Assertions\n\n\`\`\`typescript\n// Safe assertion\nconst value = someValue as string;\nif (typeof value === 'string') {\n  console.log(value.length);\n}\n\n\`\`\`\n\n## Benefits\n1. Catch errors before runtime\n2. Better IDE autocomplete\n3. Self-documenting code\n4. Easier refactoring\n5. Team collaboration\n\n## Migration Strategy\n- Start with new projects\n- Gradually enable for existing files\n- Use 'ignoreDeprecations' temporarily\n- Review and fix type errors systematically`,
  },
];


// =============================================
// Utilities
// =============================================
const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// =============================================
// Rendering & State
// =============================================
let state = {
  query: '',
  category: 'all',
  tags: new Set(),
  sort: 'newest',
  page: 1,
  pageSize: 6,
};

function uniqueTags() {
  const all = new Set();
  BLOGS.forEach(b => b.tags.forEach(t => all.add(t)));
  return Array.from(all);
}

function applyFilters() {
  let data = [...BLOGS];
  if (state.query) {
    const q = state.query.toLowerCase();
    data = data.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.excerpt.toLowerCase().includes(q) ||
      b.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  if (state.category !== 'all') {
    data = data.filter(b => b.category === state.category);
  }
  if (state.tags.size) {
    data = data.filter(b => [...state.tags].every(t => b.tags.includes(t)));
  }
  // sort
  if (state.sort === 'newest') {
    data.sort((a,b) => new Date(b.date) - new Date(a.date));
  } else if (state.sort === 'oldest') {
    data.sort((a,b) => new Date(a.date) - new Date(b.date));
  } else if (state.sort === 'title') {
    data.sort((a,b) => a.title.localeCompare(b.title));
  }
  return data;
}

function renderTagsFilter() {
  const el = document.getElementById('tags-filter');
  if (!el) return;
  el.innerHTML = '';
  uniqueTags().forEach(tag => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'tag-chip';
    chip.textContent = tag;
    chip.addEventListener('click', () => {
      if (state.tags.has(tag)) state.tags.delete(tag); else state.tags.add(tag);
      chip.classList.toggle('active');
      state.page = 1;
      render();
    });
    el.appendChild(chip);
  });
}

function renderCategoryChips() {
  const el = document.getElementById('category-chips');
  if (!el) return;
  const categories = ['all','Full Stack','AI','Real-time','DevOps'];
  el.innerHTML = '';
  categories.forEach(cat => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'category-chip' + (state.category === cat ? ' active' : '');
    chip.textContent = cat === 'all' ? 'All' : cat;
    chip.addEventListener('click', () => {
      state.category = cat;
      // reflect to hidden select for accessibility
      const sel = document.getElementById('category-filter');
      if (sel) sel.value = cat === 'all' ? 'all' : cat;
      state.page = 1;
      render();
      // refresh active states
      Array.from(el.querySelectorAll('.category-chip')).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
    el.appendChild(chip);
  });
}

function renderGrid() {
  const grid = document.getElementById('blogs-grid');
  const data = applyFilters();
  const start = (state.page - 1) * state.pageSize;
  const pageItems = data.slice(start, start + state.pageSize);

  grid.innerHTML = '';
  pageItems.forEach(b => {
    const card = document.createElement('article');
    card.className = 'blog-card fade-in';
    card.innerHTML = `
      <div class="blog-thumb">
        <span class="label">${b.thumbLabel}</span>
      </div>
      <div class="blog-content">
        <h3 class="blog-title">${b.title}</h3>
        <p class="blog-excerpt">${b.excerpt}</p>
        <div class="blog-meta">
          <span>${formatDate(b.date)}</span>
          <span>•</span>
          <span>${b.readingTime}</span>
          <span>•</span>
          <span>${b.category}</span>
        </div>
        <div class="blog-tags">
          ${b.tags.map(t => `<span class='blog-tag'>${t}</span>`).join('')}
        </div>
        <div class="blog-actions">
          <a class="blog-readmore" href="blog-details.html?id=${encodeURIComponent(b.id)}">Read More →</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
    requestAnimationFrame(() => card.classList.add('visible'));
  });
}

function renderPagination() {
  const pag = document.getElementById('pagination');
  const total = applyFilters().length;
  const pages = Math.max(1, Math.ceil(total / state.pageSize));
  const clamped = Math.min(state.page, pages);
  state.page = clamped;

  pag.innerHTML = '';
  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (i === state.page ? ' active' : '');
    btn.textContent = i;
    btn.addEventListener('click', () => { state.page = i; render(); });
    pag.appendChild(btn);
  }
  // Update results count
  const countEl = document.getElementById('results-count');
  if (countEl) countEl.textContent = total;
}

function render() {
  renderGrid();
  renderPagination();
}

// =============================================
// Events & Init
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  // Filters
  // Simplified UI now uses dropdown + search + button
  renderTagsFilter();
  // Apply button
  const applyBtn = document.getElementById('apply-filters');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      state.page = 1;
      render();
    });
  }

  document.getElementById('blog-search').addEventListener('input', (e) => {
    state.query = e.target.value.trim();
    state.page = 1;
    render();
  });
  document.getElementById('category-filter').addEventListener('change', (e) => {
    state.category = e.target.value;
    state.page = 1;
    render();
  });
  // =============================================
  // Autocomplete Suggestions
  // =============================================
  const searchInput = document.getElementById('blog-search');
  const suggestionsEl = document.getElementById('search-suggestions');
  let activeIndex = -1;

  function buildSuggestions(query) {
    if (!suggestionsEl) return;
    const q = (query || '').toLowerCase();
    if (!q) { suggestionsEl.style.display = 'none'; return; }

    const pool = [];
    BLOGS.forEach(b => {
      pool.push({ type: 'Title', text: b.title });
      b.tags.forEach(t => pool.push({ type: 'Tag', text: t }));
    });
    // unique by text
    const unique = Array.from(new Map(pool.map(p => [p.text.toLowerCase(), p])).values());
    const matches = unique.filter(p => p.text.toLowerCase().includes(q)).slice(0, 8);

    suggestionsEl.innerHTML = '';
    matches.forEach((m, idx) => {
      const li = document.createElement('li');
      li.className = 'autocomplete-item';
      li.setAttribute('role', 'option');
      li.innerHTML = `<span>${m.text}</span><span class="badge">${m.type}</span>`;
      li.addEventListener('mousedown', (e) => {
        e.preventDefault();
        selectSuggestion(m.text);
      });
      suggestionsEl.appendChild(li);
    });
    activeIndex = -1;
    suggestionsEl.style.display = matches.length ? 'block' : 'none';
    searchInput.setAttribute('aria-expanded', matches.length ? 'true' : 'false');
  }

  function selectSuggestion(text) {
    searchInput.value = text;
    state.query = text;
    suggestionsEl.style.display = 'none';
    state.page = 1;
    render();
  }

  if (searchInput && suggestionsEl) {
    searchInput.addEventListener('input', (e) => {
      state.query = e.target.value.trim();
      buildSuggestions(state.query);
    });
    searchInput.addEventListener('keydown', (e) => {
      const items = Array.from(suggestionsEl.querySelectorAll('.autocomplete-item'));
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(items.length - 1, activeIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(0, activeIndex - 1);
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && items[activeIndex]) {
          e.preventDefault();
          selectSuggestion(items[activeIndex].querySelector('span').textContent);
        }
      } else if (e.key === 'Escape') {
        suggestionsEl.style.display = 'none';
      }
      items.forEach((it, i) => it.classList.toggle('active', i === activeIndex));
    });
    searchInput.addEventListener('blur', () => {
      setTimeout(() => { suggestionsEl.style.display = 'none'; }, 150);
    });
  }
  const sortSel = document.getElementById('sort-select');
  if (sortSel) {
    sortSel.addEventListener('change', (e) => {
      state.sort = e.target.value;
      state.page = 1;
      render();
    });
  }
  const clearBtn = document.getElementById('clear-filters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state = { ...state, query: '', category: 'all', tags: new Set(), page: 1 };
      const searchEl = document.getElementById('blog-search');
      const categoryEl = document.getElementById('category-filter');
      if (searchEl) searchEl.value = '';
      if (categoryEl) categoryEl.value = 'all';
      Array.from(document.querySelectorAll('.tag-chip')).forEach(c => c.classList.remove('active'));
      render();
    });
  }

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const spans = navToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      }
    });
  }

  // Initial render
  render();
});
