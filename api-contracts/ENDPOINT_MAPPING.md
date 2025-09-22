# API Endpoint Mapping - Old vs New Design

## Overview
This document shows the transformation from role/organization-specific URLs to generic endpoints with context in request payload.

## Authentication Endpoints

### Login/Authentication
| **Old Design** | **New Design** |
|---|---|
| `POST /api/auth/login` (Super Admin) | `POST /api/auth/login` |
| `POST /api/organizations/stanford/auth/login` | `POST /api/auth/login` |
| `POST /api/organizations/techcorp/auth/login` | `POST /api/auth/login` |
| `POST /api/organizations/citycollege/auth/login` | `POST /api/auth/login` |
| `POST /api/organizations/algoristics/auth/login` | `POST /api/auth/login` |

**New Request Pattern:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "organization_id": "org_stanford",
  "login_type": "standard|demo|sso",
  "remember_me": false
}
```

### Organization Configuration
| **Old Design** | **New Design** |
|---|---|
| `POST /api/organizations/config` | `POST /api/organizations/config` |

**New Request Pattern:**
```json
{
  "user_context": {
    "user_id": null,
    "role": "anonymous"
  },
  "organization_id": "org_stanford"
}
```

## Dashboard Endpoints

### Dashboard Overview
| **Old Design** | **New Design** |
|---|---|
| `POST /api/super-admin/dashboard/overview` | `POST /api/dashboard/overview` |
| `POST /api/organizations/stanford/dashboard/overview` | `POST /api/dashboard/overview` |
| `POST /api/organizations/techcorp/dashboard/overview` | `POST /api/dashboard/overview` |
| `POST /api/organizations/citycollege/dashboard/overview` | `POST /api/dashboard/overview` |
| `POST /api/organizations/algoristics/dashboard/overview` | `POST /api/dashboard/overview` |

**New Request Pattern:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor|learner",
    "organization_id": "org_stanford|null"
  },
  "date_range": {
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  }
}
```

## Organization Management

### Organization Operations
| **Old Design** | **New Design** |
|---|---|
| `POST /api/super-admin/organizations/list` | `POST /api/organizations/list` |
| `POST /api/super-admin/organizations/create` | `POST /api/organizations/create` |
| `POST /api/super-admin/organizations/update` | `POST /api/organizations/update` |
| `POST /api/super-admin/organizations/delete` | `POST /api/organizations/delete` |
| `POST /api/super-admin/organizations/statistics` | `POST /api/organizations/statistics` |
| `POST /api/super-admin/organizations/analytics` | `POST /api/organizations/analytics` |

**New Request Pattern:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin",
    "organization_id": null
  },
  "organization_id": "org_stanford", // for specific operations
  "filters": { /* operation-specific filters */ }
}
```

## User Management

### User Operations
| **Old Design** | **New Design** |
|---|---|
| `POST /api/super-admin/users/organization-admins` | `POST /api/users/list` |
| `POST /api/super-admin/users/create-admin` | `POST /api/users/create` |
| `POST /api/super-admin/users/update-admin` | `POST /api/users/update` |
| `POST /api/super-admin/users/delete-admin` | `POST /api/users/delete` |
| `POST /api/super-admin/users/admin-activity` | `POST /api/users/activity-log` |
| `POST /api/super-admin/users/bulk-operations` | `POST /api/users/bulk-operations` |

**New Request Pattern:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin",
    "organization_id": "org_stanford|null"
  },
  "filters": {
    "role": "org_admin|instructor|learner",
    "status": "active",
    "organization_id": "org_stanford" // for super admin cross-org operations
  }
}
```

## Course Management

### Course Operations
| **Old Design** | **New Design** |
|---|---|
| `POST /api/super-admin/courses/list` | `POST /api/courses/list` |
| `POST /api/super-admin/courses/analytics` | `POST /api/courses/analytics` |
| `POST /api/super-admin/courses/quality-review` | `POST /api/courses/quality-review` |
| `POST /api/organizations/stanford/courses/list` | `POST /api/courses/list` |
| `POST /api/organizations/stanford/courses/create` | `POST /api/courses/create` |
| `POST /api/organizations/stanford/courses/enroll` | `POST /api/courses/enroll` |
| `POST /api/organizations/stanford/courses/search` | `POST /api/courses/search` |

**New Request Pattern:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor|learner",
    "organization_id": "org_stanford|null"
  },
  "filters": {
    "status": "active",
    "my_courses_only": true, // for instructors
    "enrolled_only": true    // for learners
  }
}
```

## Analytics

### Analytics Operations
| **Old Design** | **New Design** |
|---|---|
| `POST /api/super-admin/analytics/overview` | `POST /api/analytics/overview` |
| `POST /api/super-admin/analytics/course-performance` | `POST /api/analytics/course-performance` |
| `POST /api/super-admin/analytics/learning-trends` | `POST /api/analytics/learning-trends` |
| `POST /api/super-admin/analytics/assessments` | `POST /api/analytics/assessments` |
| `POST /api/super-admin/analytics/engagement` | `POST /api/analytics/engagement` |
| `POST /api/super-admin/analytics/generate-report` | `POST /api/analytics/generate-report` |
| `POST /api/super-admin/analytics/ai-insights` | `POST /api/analytics/ai-insights` |

**New Request Pattern:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor",
    "organization_id": "org_stanford|null"
  },
  "scope": "platform|organization|course",
  "target_id": "course_123", // for course-specific analytics
  "date_range": {
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  }
}
```

## Learner-Specific Operations

### Learner Operations
| **Old Design** | **New Design** |
|---|---|
| `POST /api/organizations/stanford/learner/dashboard/overview` | `POST /api/dashboard/overview` |
| `POST /api/organizations/stanford/learner/courses/enrolled` | `POST /api/courses/list` |
| `POST /api/organizations/stanford/learner/assignments/upcoming` | `POST /api/assignments/list` |
| `POST /api/organizations/stanford/learner/progress/analytics` | `POST /api/analytics/progress` |
| `POST /api/organizations/stanford/learner/achievements` | `POST /api/achievements/list` |
| `POST /api/organizations/stanford/learner/recommendations` | `POST /api/recommendations/list` |

**New Request Pattern:**
```json
{
  "user_context": {
    "user_id": "user_456",
    "role": "learner",
    "organization_id": "org_stanford"
  },
  "scope": "personal",
  "filters": {
    "enrolled_only": true,
    "upcoming_only": true
  }
}
```

## Activity and Notifications

### Activity Operations
| **Old Design** | **New Design** |
|---|---|
| `POST /api/super-admin/activities/recent` | `POST /api/activities/list` |
| `POST /api/organizations/stanford/activities/recent` | `POST /api/activities/list` |
| `POST /api/organizations/stanford/notifications` | `POST /api/notifications/list` |

**New Request Pattern:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor|learner",
    "organization_id": "org_stanford|null"
  },
  "filters": {
    "activity_types": ["user_registration", "course_creation"],
    "unread_only": false
  },
  "limit": 20
}
```

## Quick Actions

### Quick Actions
| **Old Design** | **New Design** |
|---|---|
| `POST /api/super-admin/dashboard/quick-actions` | `POST /api/dashboard/quick-actions` |
| `POST /api/organizations/stanford/dashboard/quick-actions` | `POST /api/dashboard/quick-actions` |

**New Request Pattern:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor|learner",
    "organization_id": "org_stanford|null"
  }
}
```

## Benefits of New Design

### 1. Reduced Endpoint Count
- **Before**: 50+ organization/role-specific endpoints
- **After**: 15-20 generic endpoints
- **Reduction**: ~60% fewer endpoints to maintain

### 2. Consistent URL Structure
- **Before**: `/api/{role}/{organization}/{function}`
- **After**: `/api/{function}`
- **Benefit**: Simpler routing and caching

### 3. Role-Based Response Filtering
```json
// Same endpoint, different responses based on user context
{
  "user_context": { "role": "super_admin" },
  // Returns platform-wide data
}

{
  "user_context": { "role": "org_admin", "organization_id": "org_stanford" },
  // Returns Stanford-specific data only
}
```

### 4. Simplified Frontend Integration
```javascript
// Single function handles all user types
async function getDashboard(userContext) {
  return await api.post('/api/dashboard/overview', {
    user_context: userContext,
    date_range: { /* dates */ }
  });
}

// Usage for different roles
const superAdminDash = await getDashboard({
  user_id: 'sa_1',
  role: 'super_admin',
  organization_id: null
});

const orgAdminDash = await getDashboard({
  user_id: 'oa_1', 
  role: 'org_admin',
  organization_id: 'org_stanford'
});
```

### 5. Easier Testing
```javascript
// Test same endpoint with different user contexts
describe('/api/dashboard/overview', () => {
  it('returns platform data for super admin', async () => {
    const response = await request(app)
      .post('/api/dashboard/overview')
      .send({ user_context: { role: 'super_admin' } });
    
    expect(response.body.data.scope).toBe('platform');
  });

  it('returns org data for org admin', async () => {
    const response = await request(app)
      .post('/api/dashboard/overview') 
      .send({ 
        user_context: { 
          role: 'org_admin', 
          organization_id: 'org_stanford' 
        } 
      });
    
    expect(response.body.data.scope).toBe('organization');
  });
});
```

This refactored design provides a cleaner, more maintainable API architecture while preserving all the functionality of the original role/organization-specific endpoints.