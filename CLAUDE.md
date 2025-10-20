# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Nx monorepo implementing a Micro Frontend (MFE) architecture using Angular 20.3.0 and Module Federation. The application consists of a shell host application and multiple remote micro-frontends that are dynamically loaded at runtime.

## Architecture

### Module Federation Setup

The project uses **@nx/module-federation** with **@module-federation/enhanced** for runtime module federation:

- **Shell (Host)**: Main application container running on port 4200
  - Serves as the host application that loads remote micro-frontends
  - Configured to consume two remotes: `products` and `cart`
  - Uses `@nx/angular:module-federation-dev-server` for development
  - Routes are configured to lazy-load remote modules via `import('cart/Routes')` and `import('products/Routes')`

- **Products (Remote)**: Product catalog micro-frontend running on port 4203
  - Exposes `./Routes` entry point from `apps/products/src/app/remote-entry/entry.routes.ts`
  - Depends on shell:serve for development

- **Cart (Remote)**: Shopping cart micro-frontend running on port 4204
  - Exposes `./Routes` entry point from `apps/cart/src/app/remote-entry/entry.routes.ts`
  - Implements NgRx state management with cart reducer and actions
  - Depends on shell:serve for development

### Module Federation Configuration

Each application has:

- `module-federation.config.ts`: Defines federation configuration (name, remotes for host, exposes for remotes)
- `webpack.config.ts`: Development webpack configuration using `withModuleFederation`
- `webpack.prod.config.ts`: Production webpack configuration

### State Management

The cart remote uses NgRx for state management:

- Store setup: [apps/cart/src/app/app.config.ts](apps/cart/src/app/app.config.ts)
- Actions: [apps/cart/src/app/remote-entry/store/actions/cart.actions.ts](apps/cart/src/app/remote-entry/store/actions/cart.actions.ts)
- Reducers: [apps/cart/src/app/remote-entry/store/reducers/cart.reducers.ts](apps/cart/src/app/remote-entry/store/reducers/cart.reducers.ts)
- The cart state tracks items with `productId` and `quantity`

### Remote Entry Points

Remote applications expose routes through:

- `RemoteEntry` component: Serves as the entry component for the remote module
- `entry.routes.ts`: Exports `remoteRoutes` that are loaded by the shell

## Development Commands

### Serve Applications

```bash
# Serve the shell host (automatically starts on port 4200)
npx nx serve shell

# Serve all applications together (shell + remotes)
npx nx serve shell --devRemotes=products,cart

# Serve individual remotes (requires shell to be running)
npx nx serve products  # Port 4203
npx nx serve cart      # Port 4204
```

### Build Applications

```bash
# Build all applications
npx nx run-many --target=build --all

# Build specific application
npx nx build shell
npx nx build products
npx nx build cart

# Production builds
npx nx build shell --configuration=production
npx nx build products --configuration=production
npx nx build cart --configuration=production
```

### Linting

```bash
# Lint all projects
npx nx run-many --target=lint --all

# Lint specific project
npx nx lint shell
npx nx lint products
npx nx lint cart
```

### Serve Static Builds

```bash
# Serve static production builds
npx nx serve-static shell    # Port 4200
npx nx serve-static products # Port 4203
npx nx serve-static cart     # Port 4204
```

### Nx Commands

```bash
# View dependency graph
npx nx graph

# Show project details
npx nx show project shell
npx nx show project products
npx nx show project cart

# List available plugins
npx nx list

# Generate new Angular application
npx nx g @nx/angular:app <app-name>

# Generate new Angular library
npx nx g @nx/angular:lib <lib-name>
```

## Key Technical Details

### TypeScript Configuration

- Base configuration: [tsconfig.base.json](tsconfig.base.json)
- Each app has its own `tsconfig.json` and `tsconfig.app.json`
- Compiler target: ES2022
- Angular version: 20.3.0 with strict mode enabled

### Port Allocation

- Shell (host): 4200
- Products (remote): 4203
- Cart (remote): 4204

### Webpack Custom Configuration

All applications use custom webpack configurations to enable Module Federation:

- Development configs use `withModuleFederation` helper from `@nx/module-federation/angular`
- DTS Plugin is disabled as Nx provides type support
- Each remote application can be run independently or as part of the shell

### Adding New Remotes

When adding a new remote micro-frontend:

1. Generate new application: `npx nx g @nx/angular:app <name>`
2. Configure as Module Federation remote in `module-federation.config.ts`
3. Add the remote to shell's `module-federation.config.ts` remotes array
4. Expose routes via `entry.routes.ts` file
5. Add route configuration in shell's [apps/shell/src/app/app.routes.ts](apps/shell/src/app/app.routes.ts)
6. Update project.json to add `dependsOn: ["shell:serve"]` for the serve target

### Remote Communication

- Remotes are loaded dynamically at runtime via webpack Module Federation
- Shell imports remote routes using dynamic imports: `import('cart/Routes')`
- Type declarations for remotes may need to be added to `remotes.d.ts` for TypeScript support

## General Guidelines for working with Nx

- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- You have access to the Nx MCP server and its tools, use them to help the user
- When answering questions about the repository, use the `nx_workspace` tool first to gain an understanding of the workspace architecture where applicable.
- When working in individual projects, use the `nx_project_details` mcp tool to analyze and understand the specific project structure and dependencies
- For questions around nx configuration, best practices or if you're unsure, use the `nx_docs` tool to get relevant, up-to-date docs. Always use this instead of assuming things about nx configuration
- If the user needs help with an Nx configuration or project graph error, use the `nx_workspace` tool to get any errors
