<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project References

- **@CODEBASE.md** — Comprehensive codebase reference: architecture, file structure, data flow, design philosophy, key implementation details, and common patterns. Read this when you need to understand how the project is organized or how a feature works.
- **@TEMPLATES.md** — Guidelines for creating new wish templates: audio composition, module types, visual design rules, and the step-by-step process. Read this only when creating or modifying wish templates.

# TypeScript Guidelines

## No `any` Types - EVER

**CRITICAL:** Never use the `any` type. Always use proper, explicit types.

- ❌ **Forbidden:** `const data: any = ...`
- ❌ **Forbidden:** `function process(input: any): any`
- ❌ **Forbidden:** `Record<string, any>`
- ❌ **Forbidden:** `React.FC<any>`
- ❌ **Forbidden:** `useState<any | null>(null)` - always use proper types
- ❌ **Forbidden:** Casting with `as any`
- ✅ **Required:** Define proper interfaces and types
- ✅ **Required:** Use `unknown` when type is truly unknown, then narrow with type guards
- ✅ **Required:** Use generics with proper constraints: `<T extends SomeType>`

**Why:**
- `any` defeats TypeScript's purpose and removes all type safety
- Makes refactoring dangerous and error-prone
- Prevents IDE autocomplete and inline documentation
- Technical debt that compounds over time

**If you encounter a situation where you think you need `any`:**
1. Stop and think harder about the actual type
2. Create a proper interface/type alias
3. Use `unknown` with type guards as a last resort
4. Never commit code with `any` types

**Linting:** The project uses strict TypeScript checks. Any `any` usage will fail CI/CD.

## No `React.FC` - Use Regular Functions

**CRITICAL:** Never use `React.FC` or `React.FunctionComponent`. It is deprecated and unnecessary in modern React.

- ❌ **Forbidden:** `const Component: React.FC<Props> = () => {}`
- ❌ **Forbidden:** `React.FC<Record<string, unknown>>`
- ❌ **Forbidden:** `Record<string, React.FC<any>>`
- ✅ **Required:** Use regular functions with explicit props interfaces:
  ```typescript
  interface Props { ... }
  export function Component({ prop1, prop2 }: Props) { ... }
  ```
- ✅ **Allowed:** Arrow function style with explicit type annotation:
  ```typescript
  interface Props { ... }
  const Component = (props: Props) => { ... }
  ```
- ✅ **Required:** For dynamic component maps, use:
  ```typescript
  type ComponentType = (props: Props) => React.ReactNode;
  ```

**Why:**
- `React.FC` is deprecated and has no benefits in modern React
- It implicitly adds `children` prop which may not be desired
- Regular functions and properly typed arrow functions are cleaner and more explicit
- Better inference and less confusion

## Running Commands

This project uses **bun** as the package manager and runtime. Do not use npm or yarn.

### Available Scripts

```bash
# Development server (runs on http://localhost:3000)
bun run dev

# Production build (verify TypeScript and build)
bun run build

# Start production server (after building)
bun run start

# Linting and formatting (uses Biome, not ESLint/Prettier)
bun run lint       # Check for issues
bun run format     # Auto-fix formatting
```

### Installing Dependencies

```bash
# Add a new dependency
bun add <package-name>

# Add a dev dependency
bun add -D <package-name>
```

### Type Checking

The project uses strict TypeScript. Always run `bun run build` before committing to ensure there are no type errors.