<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

@CODEBASE.md

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