# Refactored API Design - Generic Endpoints

## Overview

This document outlines the refactored API design using generic endpoints where organization and role information is passed in the request payload rather than being part of the URL structure.

## Core Design Principles

### 1. Generic Endpoints
- URLs are role and organization agnostic
- All context passed in request payload
- Single endpoint serves multiple roles with different data scopes

### 2. User Context Pattern
Every authenticated request includes a `user_context` object:

```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "org_admin",
    "organization_id": "org_stanford",
    "permissions": ["user_management", "course_management"]
  }
}
```

### 3. Role-Based Response Filtering
The API server filters and scopes responses based on:
- User role (super_admin, org_admin, instructor, learner)
- Organization membership
- Specific permissions

## Refactored API Endpoints

### Authentication APIs

#### User Login
**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "organization_id": "org_stanford",
  "login_type": "standard|demo|sso",
  "remember_me": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "instructor",
      "organization_id": "org_stanford",
      "organization_name": "Stanford University",
      "permissions": ["course_creation", "student_management"]
    },
    "token": "jwt_token_here",
    "refresh_token": "refresh_token_here",
    "expires_in": 3600
  }
}
```

### Dashboard APIs

#### Get Dashboard Overview
**Endpoint:** `POST /api/dashboard/overview`

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "org_admin",
    "organization_id": "org_stanford"
  },
  "date_range": {
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  },
  "include_trends": true
}
```

**Response (Org Admin):**
```json
{
  "success": true,
  "data": {
    "user_context": {
      "name": "Dr. Sarah Wilson",
      "role": "org_admin",
      "organization": "Stanford University"
    },
    "metrics": {
      "total_users": 12950,
      "active_courses": 120,
      "monthly_registrations": 245,
      "platform_usage": 94.7
    },
    "scope": "organization"
  }
}
```

**Response (Super Admin - Same Endpoint):**
```json
{
  "success": true,
  "data": {
    "user_context": {
      "name": "John Admin",
      "role": "super_admin",
      "organization": "Algoristics"
    },
    "metrics": {
      "total_organizations": 12,
      "total_users": 21642,
      "active_courses": 315,
      "platform_revenue": 245000.50
    },
    "scope": "platform"
  }
}
```

### Organization APIs

#### List Organizations
**Endpoint:** `POST /api/organizations/list`

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin",
    "organization_id": null
  },
  "filters": {
    "status": "active",
    "search": "",
    "sort_by": "name"
  },
  "pagination": {
    "page": 1,
    "limit": 20
  }
}
```

**Response (Super Admin - All Organizations):**
```json
{
  "success": true,
  "data": {
    "organizations": [
      {
        "id": "org_stanford",
        "name": "Stanford University",
        "user_count": 12950,
        "status": "active"
      },
      {
        "id": "org_techcorp",
        "name": "TechCorp Training",
        "user_count": 875,
        "status": "active"
      }
    ],
    "scope": "platform"
  }
}
```

**Response (Org Admin - Same Endpoint, Different Scope):**
```json
{
  "success": true,
  "data": {
    "organizations": [
      {
        "id": "org_stanford",
        "name": "Stanford University",
        "user_count": 12950,
        "status": "active"
      }
    ],
    "scope": "organization"
  }
}
```

#### Create Organization
**Endpoint:** `POST /api/organizations/create`

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin",
    "organization_id": null
  },
  "organization_data": {
    "name": "New University",
    "acronym": "newuni",
    "website": "https://newuni.edu",
    "admin_contact": {
      "name": "Dr. Jane Smith",
      "email": "admin@newuni.edu"
    }
  }
}
```

### User Management APIs

#### List Users
**Endpoint:** `POST /api/users/list`

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "org_admin",
    "organization_id": "org_stanford"
  },
  "filters": {
    "role": "instructor",
    "status": "active",
    "search": ""
  },
  "pagination": {
    "page": 1,
    "limit": 20
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_456",
        "name": "Prof. Johnson",
        "email": "prof.johnson@stanford.edu",
        "role": "instructor",
        "department": "Computer Science",
        "status": "active"
      }
    ],
    "scope": "organization",
    "organization_id": "org_stanford"
  }
}
```

### Course Management APIs

#### List Courses
**Endpoint:** `POST /api/courses/list`

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "instructor",
    "organization_id": "org_stanford"
  },
  "filters": {
    "status": "active",
    "my_courses_only": true
  },
  "include_statistics": true
}
```

**Response (Instructor - Own Courses):**
```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": "course_cs229",
        "name": "Machine Learning",
        "code": "CS229",
        "instructor_id": "user_123",
        "enrolled_students": 145,
        "permissions": ["edit", "grade", "manage_students"]
      }
    ],
    "scope": "instructor_courses"
  }
}
```

**Response (Org Admin - All Organization Courses):**
```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": "course_cs229",
        "name": "Machine Learning",
        "instructor": "Prof. Johnson",
        "enrolled_students": 145,
        "permissions": ["view", "analytics", "manage"]
      },
      {
        "id": "course_cs106a",
        "name": "Programming Methodology",
        "instructor": "Dr. Smith",
        "enrolled_students": 89,
        "permissions": ["view", "analytics", "manage"]
      }
    ],
    "scope": "organization_courses"
  }
}
```

### Analytics APIs

#### Get Analytics
**Endpoint:** `POST /api/analytics/overview`

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin",
    "organization_id": null
  },
  "scope": "platform",
  "date_range": {
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  },
  "metrics": ["user_growth", "course_completion", "engagement"]
}
```

**Response (Super Admin - Platform Analytics):**
```json
{
  "success": true,
  "data": {
    "analytics_scope": "platform",
    "key_metrics": {
      "total_learners": "21,642",
      "platform_completion_rate": "84.7%",
      "overall_engagement": "92.3%"
    },
    "organization_breakdown": [
      {
        "organization": "Stanford University",
        "users": 12950,
        "completion_rate": 87.3
      }
    ]
  }
}
```

**Response (Org Admin - Organization Analytics):**
```json
{
  "success": true,
  "data": {
    "analytics_scope": "organization",
    "organization_id": "org_stanford",
    "key_metrics": {
      "total_learners": "12,950",
      "completion_rate": "87.3%",
      "engagement": "94.1%"
    },
    "course_breakdown": [
      {
        "course": "CS229 - Machine Learning",
        "students": 145,
        "completion_rate": 78.3
      }
    ]
  }
}
```

## Standard Request/Response Patterns

### Request Pattern
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "instructor|learner|org_admin|super_admin",
    "organization_id": "org_stanford|null",
    "permissions": ["permission1", "permission2"]
  },
  "filters": {
    "status": "active",
    "search": "",
    "sort_by": "name",
    "sort_order": "asc"
  },
  "pagination": {
    "page": 1,
    "limit": 20
  },
  "include_metadata": true
}
```

### Response Pattern
```json
{
  "success": true,
  "data": {
    "scope": "platform|organization|instructor|learner",
    "organization_id": "org_stanford",
    /* actual data payload */
  },
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_count": 100
  },
  "metadata": {
    "generated_at": "2024-01-15T20:00:00Z",
    "user_permissions": ["view", "edit"],
    "request_id": "req_123456"
  }
}
```

## Role-Based Data Scoping

### Super Admin
- **Scope**: Platform-wide access
- **Organizations**: All organizations
- **Users**: All users across all organizations
- **Courses**: All courses across all organizations
- **Analytics**: Platform-wide metrics and comparisons

### Organization Admin
- **Scope**: Single organization
- **Organizations**: Own organization only
- **Users**: Users within their organization
- **Courses**: Courses within their organization
- **Analytics**: Organization-specific metrics

### Instructor
- **Scope**: Course-level within organization
- **Organizations**: Own organization (read-only)
- **Users**: Students in their courses
- **Courses**: Courses they teach + browsable courses
- **Analytics**: Their course analytics only

### Learner
- **Scope**: Personal data within organization
- **Organizations**: Own organization (read-only)
- **Users**: Personal profile only
- **Courses**: Enrolled courses + browsable courses
- **Analytics**: Personal progress and achievements

## Implementation Benefits

### 1. Simplified API Surface
- Fewer total endpoints to maintain
- Consistent URL patterns
- Reduced API versioning complexity

### 2. Security Advantages
- Role-based access control in business logic
- Consistent permission checking
- Audit trail with user context

### 3. Frontend Flexibility
- Same endpoint for different user types
- Consistent error handling
- Simplified state management

### 4. Scalability
- Easier to add new roles
- Organization-agnostic architecture
- Better caching strategies

## Migration Strategy

### Phase 1: Core Endpoints
1. Authentication (`/api/auth/login`)
2. Dashboard (`/api/dashboard/overview`)
3. Organizations (`/api/organizations/*`)

### Phase 2: Management Endpoints
1. Users (`/api/users/*`)
2. Courses (`/api/courses/*`)
3. Analytics (`/api/analytics/*`)

### Phase 3: Specialized Features
1. Assessments (`/api/assessments/*`)
2. Certificates (`/api/certificates/*`)
3. Reports (`/api/reports/*`)

This refactored design provides a more maintainable, secure, and scalable API architecture while maintaining the rich functionality required for the multi-tenant learning management system.