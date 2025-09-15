# Overview

This is a full-stack web application for "Trends Parlour & Spa", a beauty and wellness business. The application serves as a modern business website with booking functionality, showcasing services, gallery, and contact information. Built with a React frontend and Express backend, it provides an elegant user interface for customers to learn about services and submit booking requests.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom color scheme and typography
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints for booking management
- **Validation**: Zod schemas for request validation with error handling
- **Storage**: In-memory storage implementation with interface for future database integration
- **Development**: Hot reload with Vite middleware integration

## Data Storage Solutions
- **Current**: In-memory storage using Map data structures
- **Prepared for**: PostgreSQL with Drizzle ORM configuration
- **Schema**: Defined booking and user entities with proper TypeScript types
- **Migration Ready**: Drizzle configuration set up for PostgreSQL deployment

## Authentication and Authorization
- **Current State**: Basic user schema defined but not implemented
- **Prepared Infrastructure**: User management interface ready for future authentication implementation
- **Session Handling**: Connect-pg-simple configured for PostgreSQL session storage

## Design System
- **Component Library**: Comprehensive shadcn/ui component set
- **Theme**: Custom beauty/spa focused color palette with warm neutrals and accent colors
- **Typography**: Multiple font families including Playfair Display for headings and Inter for body text
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity for production deployment
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-kit**: Database migration and schema management tools

## UI and Styling
- **@radix-ui/react-***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Utility for creating variant-based component APIs
- **cmdk**: Command palette component for enhanced user interactions

## Development and Build Tools
- **vite**: Fast build tool and development server
- **@vitejs/plugin-react**: React integration for Vite
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Data Management
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Validation resolver for React Hook Form
- **zod**: TypeScript-first schema validation
- **date-fns**: Date utility library for formatting and manipulation

## Additional Features
- **wouter**: Minimalist routing library for React
- **embla-carousel-react**: Touch-friendly carousel component
- **lucide-react**: Icon library with React components