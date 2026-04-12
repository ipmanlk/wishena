<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

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