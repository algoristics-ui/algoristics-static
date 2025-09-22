# UI Documentation - Algoristics LMS Platform

## Project Overview

The Algoristics LMS (Learning Management System) is a modern, responsive educational platform built with React, TypeScript, and Tailwind CSS. It supports multiple organizations with role-based access control for administrators, instructors, and learners.

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.x with utility-first approach
- **UI Components**: shadcn/ui (built on Radix UI primitives)
- **State Management**: React Context API (AuthContext)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Package Manager**: npm

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui component library
│   ├── responsive/      # Mobile-specific components
│   ├── learner/         # Student-specific components
│   ├── Navigation.tsx   # Main navigation component
│   ├── OrganizationHeader.tsx
│   └── ...
├── pages/               # Page components (60+ files)
│   ├── Organization*.tsx    # Admin pages
│   ├── Instructor*.tsx     # Instructor pages
│   ├── *Page.tsx          # General pages
│   └── ...
├── contexts/            # React Context providers
│   └── AuthContext.tsx  # Authentication & user state
├── utils/               # Utility functions
│   └── organizationData.ts
├── hooks/               # Custom React hooks
├── lib/                 # Third-party library configurations
├── assets/              # Static assets
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles & CSS variables
```

## Styling Architecture

### 1. Tailwind CSS Utility-First Approach

The project uses **Tailwind CSS** as the primary styling solution with utility classes applied directly in JSX:

```jsx
<div className="w-full overflow-x-hidden">
  <Card className="mb-3 sm:mb-4 hover:shadow-lg transition-shadow">
    <Button className="h-12 sm:h-14 md:h-16 flex flex-col items-center justify-center">
      <span className="text-xs leading-tight break-words text-center">
        Action Text
      </span>
    </Button>
  </Card>
</div>
```

### 2. Responsive Design System

**Breakpoints** (following Tailwind defaults):
- `sm:` - 640px and up (tablet)
- `md:` - 768px and up (desktop)
- `lg:` - 1024px and up (large desktop)
- `xl:` - 1280px and up (extra large)
- `2xl:` - 1536px and up (ultra wide)

**Common Responsive Patterns**:
```jsx
// Typography scaling
className="text-xs sm:text-sm md:text-base lg:text-lg"

// Spacing scaling
className="px-2 sm:px-3 md:px-4 lg:px-6"

// Layout changes
className="flex flex-col sm:flex-row"

// Grid responsive
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
```

### 3. Design System Configuration

**Tailwind Configuration** (`tailwind.config.ts`):
- Custom color system with CSS variables
- Extended theme with organization branding support
- Container configuration with responsive padding
- Custom animations (accordion, transitions)

**Global Styles** (`src/index.css`):
- CSS custom properties for theme colors
- Algoristics brand color palette
- Dark mode support preparation
- Professional EdTech color scheme

### 4. Component Library (shadcn/ui)

**Core UI Components** (`src/components/ui/`):
- `Card`, `Button`, `Input`, `Badge`
- `Tabs`, `Select`, `Progress`, `Avatar`
- `Dialog`, `Popover`, `Tooltip`, `Sheet`
- `Navigation Menu`, `Accordion`, `Calendar`
- All components built on Radix UI primitives

**Benefits**:
- Consistent design language
- Accessibility built-in
- Customizable with Tailwind classes
- TypeScript support

### 5. Dynamic Styling Patterns

**Organization Theming**:
```jsx
// Dynamic colors from organization data
<div style={{ backgroundColor: orgData.primaryColor }}>
<nav style={{
  backgroundImage: `linear-gradient(135deg, ${orgData.primaryColor}, ${orgData.secondaryColor})`,
  height: '80px'
}}>
```

**Conditional Styling**:
```jsx
// Role-based visibility
className={`mb-3 sm:mb-4 ${user?.role === 'instructor' ? 'hidden sm:block' : ''}`}

// Dynamic padding for mobile navigation
className={`container mx-auto px-4 sm:px-6 ${user?.role === 'instructor' ? 'pb-20 md:pb-6' : 'pb-6'}`}
```

## Role-Based Architecture

### 1. User Roles
- **Organization Admin**: Full organization management
- **Instructor**: Course and student management
- **Learner/Student**: Course consumption and progress tracking

### 2. Page Routing Structure

**Organization Pages** (`/orgName/`):
- `/dashboard` - Role-based dashboard (unified page with conditional rendering)
- `/courses` - Course management (role-based content)
- `/students` - Student management
- `/analytics` - Analytics and reporting
- `/instructors` - Instructor management (admin only)

**Instructor-Specific Pages** (`/orgName/instructor/`):
- `/profile` - Instructor profile settings

**Course-Specific Pages** (`/orgName/courses/:courseId/`):
- `/` - Course overview
- `/edit` - Course editing (instructors only)
- `/settings` - Course settings (instructors only)
- `/analytics` - Course analytics (instructors only)

### 3. Role-Based Component Rendering

**Single Page, Multiple Views**:
```jsx
// OrganizationDashboardPage.tsx
const getStatsForRole = () => {
  if (user?.role === 'instructor') {
    return instructorStats;
  }
  return adminStats;
};

// Conditional section visibility
<Card className={`mb-3 sm:mb-4 ${user?.role === 'instructor' ? 'hidden sm:block' : ''}`}>
```

## Mobile Responsiveness Strategy

### 1. Mobile-First Design
- Components designed for mobile screens first
- Progressive enhancement for larger screens
- Touch-optimized interface elements

### 2. Mobile Navigation
**Instructor Mobile Navigation** (`InstructorMobileBottomNav.tsx`):
- Fixed bottom navigation for mobile devices
- 5-tab navigation: Dashboard, Courses, Students, Analytics, Profile
- Only visible on mobile (`md:hidden`)
- Role-specific navigation items

**Student Mobile Navigation** (`MobileBottomNav.tsx`):
- Similar pattern for student/learner interface
- Appropriate navigation for student workflows

### 3. Responsive Layout Patterns

**Container Responsive Sizing**:
```jsx
// Page container
<div className="container mx-auto px-4 sm:px-6 pb-20 md:pb-6 pt-20 max-w-7xl">

// Mobile-optimized container
<div className="w-full px-2 sm:px-3 md:px-4" style={{ paddingTop: '80px' }}>
```

**Mobile-Specific Spacing**:
```jsx
// Mobile bottom navigation clearance
${user?.role === 'instructor' ? 'pb-16 sm:pb-20 md:pb-6' : 'pb-6'}
```

### 4. Text and Content Optimization

**Word Wrapping**:
```jsx
// Prevent text overflow on mobile
className="break-words leading-relaxed"
className="break-all" // For numeric values
className="min-w-0 flex-1" // For flex containers
```

**Icon and Button Scaling**:
```jsx
// Progressive icon sizing
className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"

// Flexible button heights
className="h-12 sm:h-14 md:h-16"
```

## Organization Theming System

### 1. Dynamic Theme Loading
```typescript
// utils/organizationData.ts
interface OrganizationData {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  acronym: string;
  headerImage?: string;
}
```

### 2. Organization-Specific Styling
- Primary and secondary color customization
- Header background images
- Brand-consistent component theming
- URL-based organization detection

### 3. Supported Organizations
- Stanford University (`/stanford/`)
- TechCorp (`/techcorp/`)
- City College (`/citycollege/`)
- Algoristics (default/main site)

## Development Guidelines

### 1. Styling Best Practices

**Use Tailwind Utilities**:
```jsx
// ✅ Good - Tailwind utilities
<div className="flex items-center space-x-2 p-4 rounded-lg bg-white shadow-sm">

// ❌ Avoid - Custom CSS classes
<div className="custom-card-style">
```

**Responsive-First Approach**:
```jsx
// ✅ Good - Mobile first, then larger screens
className="text-xs sm:text-sm md:text-base"

// ❌ Avoid - Desktop first
className="text-base md:text-xs"
```

**Semantic Component Structure**:
```jsx
// ✅ Good - Semantic HTML with Tailwind
<Card className="hover:shadow-lg transition-shadow">
  <CardHeader className="px-4 sm:px-6">
    <CardTitle className="text-lg font-semibold">
```

### 2. Component Development Patterns

**Role-Based Conditional Rendering**:
```jsx
// Check user role for feature access
{user?.role === 'instructor' && <InstructorFeature />}

// Conditional styling based on role
className={`base-styles ${user?.role === 'instructor' ? 'instructor-specific' : ''}`}
```

**Organization Context Usage**:
```jsx
// Get organization data from URL
const orgData = getOrganizationDataFromPath(location.pathname);

// Apply organization theming
style={{ backgroundColor: orgData.primaryColor }}
```

### 3. Performance Considerations

**Mobile Optimization**:
- Lazy loading for non-critical components
- Optimized image loading
- Minimal bundle size for mobile users
- Touch-optimized interaction targets

**Responsive Images and Assets**:
- Appropriate image sizing for different screen sizes
- SVG icons for crisp display at all resolutions
- Optimized loading strategies

## File Naming Conventions

### Page Components
- `OrganizationDashboardPage.tsx` - Organization admin pages
- `InstructorCoursesPage.tsx` - Instructor-specific pages
- `LearnerDashboard.tsx` - Student/learner pages

### Component Categories
- `components/ui/` - Base UI library components
- `components/responsive/` - Mobile-specific components
- `components/learner/` - Student-specific components

### Utility Functions
- `organizationData.ts` - Organization configuration
- `AuthContext.tsx` - Authentication and user management

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Responsive Design**: 320px - 2560px+ viewport widths
- **Touch Support**: Optimized for touch interfaces

---

## Getting Started for Developers

1. **Install Dependencies**: `npm install`
2. **Start Development**: `npm run dev`
3. **Build Production**: `npm run build`
4. **Lint Code**: `npm run lint`

The application will be available at `http://localhost:8080` with organization-specific routing.