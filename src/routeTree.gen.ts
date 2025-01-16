/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const TreeLazyImport = createFileRoute('/tree')()
const MarkLazyImport = createFileRoute('/mark')()
const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const TreeLazyRoute = TreeLazyImport.update({
  id: '/tree',
  path: '/tree',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/tree.lazy').then((d) => d.Route))

const MarkLazyRoute = MarkLazyImport.update({
  id: '/mark',
  path: '/mark',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/mark.lazy').then((d) => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/mark': {
      id: '/mark'
      path: '/mark'
      fullPath: '/mark'
      preLoaderRoute: typeof MarkLazyImport
      parentRoute: typeof rootRoute
    }
    '/tree': {
      id: '/tree'
      path: '/tree'
      fullPath: '/tree'
      preLoaderRoute: typeof TreeLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/mark': typeof MarkLazyRoute
  '/tree': typeof TreeLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/mark': typeof MarkLazyRoute
  '/tree': typeof TreeLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/mark': typeof MarkLazyRoute
  '/tree': typeof TreeLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/mark' | '/tree'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/mark' | '/tree'
  id: '__root__' | '/' | '/about' | '/mark' | '/tree'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AboutLazyRoute: typeof AboutLazyRoute
  MarkLazyRoute: typeof MarkLazyRoute
  TreeLazyRoute: typeof TreeLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AboutLazyRoute: AboutLazyRoute,
  MarkLazyRoute: MarkLazyRoute,
  TreeLazyRoute: TreeLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/mark",
        "/tree"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/mark": {
      "filePath": "mark.lazy.tsx"
    },
    "/tree": {
      "filePath": "tree.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
