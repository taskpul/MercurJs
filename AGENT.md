# AGENT.md

## Project Structure (Please Note)

- **`backend/`**  
  Contains all **backend code** (Medusa core, modules, plugins, workflows, etc.).

- **`storefront/`**  
  Contains all **frontend code** (Next.js storefront).

  - **`vendor-panel/`**  
  Contains all **vendor code**

---

## 1. Storefront Development Guidelines

When working in the **`storefront/`** folder:

- **Framework**: Next.js (if applicable in this repo).
- **APIs**: Consume Medusa’s Store API via the SDK or REST endpoints.
- **Authentication**: Use provided utilities for customer sessions; **do not roll your own**.
- **Cart/Checkout**: Use Medusa’s workflows and providers; avoid custom logic unless extending officially.
- **Styling**: Reuse design system tokens; **no ad-hoc styles**.
- **Components**: Reuse existing components, styles, and design tokens for consistency.
- **Testing**:  
  - Component/unit tests for UI.  
  - Integration tests for checkout & cart flows.  
- **Performance**: Enable caching, optimize images/assets, ensure production readiness.
- **SEO/Accessibility**: Semantic HTML, meta tags, alt attributes, WCAG compliance.

Reference: [Medusa Storefront Development Guide](https://docs.medusajs.com).

---

## 2. Decision Flow: Module vs Plugin

- **Module**  
  If functionality is **project-internal** and encapsulates a domain →  
  Create a **module** inside `app/` or inside a private plugin.

- **Plugin**  
  If functionality must be **reused across projects**, or you’re packaging:  
  - Routes  
  - Hooks  
  - Subscribers  
  - Jobs  
  - Admin UI  
  → Build a **plugin** (which may export your module).

---

## 3. Implementing a Module (Checklist)

### Scaffold
- Package/folder name: `@org/<name>-module`  
  or `/src/modules/<name>` if not publishing.
- Entry points:  
  - `src/index.ts` (exports)  
  - `src/registration.ts` (module registration)  
  - `src/services/*`  
  - `src/models/*`  
  - `src/workflows/*`  
  - `src/loaders/*`

### Container & Isolation
- Register services/models with the module container.
- Use **Module Links** for inter-module relations.  
  → Never import another module’s internals.
- For reads across modules: use **Queries** or **Workflows** orchestrating public APIs.

### Options & Config
- Define an `Options` type with sane defaults.
- Read options from `medusa-config.ts` plugin entry.

### Workflows & Hooks
- Compose business logic with **workflows**.  
- Add hook handlers **only via public events**.

### Errors & Logging
- Throw descriptive, typed errors.  
- Use structured logs with context (module name, operation, IDs).

### DB & Migrations
- Write **idempotent migrations**.  
- Always guard for **re-runs**.

### Tests
- **Unit tests** for services.  
- **Integration tests** for workflows and links.

### Docs
Include a README covering:
- Purpose
- Install/Register
- Options schema
- Examples

**Example: Registering a plugin with options**

```ts
// medusa-config.ts
import { defineConfig } from "@medusajs/framework/utils"

export default defineConfig({
  plugins: [
    {
      resolve: "@org/example-plugin",
      options: {
        featureFlag: true,
        apiKey: process.env.EXAMPLE_API_KEY!,
      },
    },
  ],
})
4. Creating a Plugin (Checklist)
Structure
package.json with:

name

version

"type": "module"

exports

src/ may include:
modules/, routes/, workflows/, hooks/, subscribers/, jobs/, links/, admin/

README.md with install, config options, and usage.

Install in App
Add to plugins[] in medusa-config.ts with resolve & options.

Versioning/Release
Semantic versioning

CHANGELOG

Publish to private/public registry

Testing
Create a local test app ensuring end-to-end flows work.

Minimal Export
ts
Copy code
// src/index.ts
export * from "./modules";
export * from "./workflows";
5. Storefront Quick Reference
✔ Follow Medusa Storefront Development Guide
✔ Reuse components, design tokens, and styles
✔ Use Next.js, SDK, or REST APIs
✔ Use provided session/auth utilities
✔ Follow workflows for cart/checkout
✔ Optimize for performance, SEO, and accessibility
