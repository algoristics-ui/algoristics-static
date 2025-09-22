# Dashboard API Contracts

## Overview
Dashboard endpoints that provide role-specific overview data using generic endpoints with context-based filtering.

---

## Dashboard Overview
**Endpoint:** `POST /api/dashboard/overview`

**Description:** Get role-specific dashboard data for all user types

**Request:**
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
  },
  "include_trends": true
}
```

**Response (Super Admin):**
```json
{
  "success": true,
  "data": {
    "scope": "platform",
    "summary_stats": {
      "total_organizations": 12,
      "total_users": 21642,
      "active_courses": 315,
      "platform_revenue": 245000.50
    },
    "growth_metrics": {
      "users_growth": "+18%",
      "courses_growth": "+12%",
      "revenue_growth": "+23%"
    },
    "system_health": {
      "status": "healthy",
      "uptime": "99.8%",
      "response_time": "145ms"
    }
  }
}
```

**Response (Organization Admin):**
```json
{
  "success": true,
  "data": {
    "scope": "organization",
    "organization_id": "org_stanford",
    "summary_stats": {
      "total_users": 12950,
      "active_courses": 120,
      "monthly_registrations": 245,
      "completion_rate": 87.3
    },
    "recent_activities": [
      {
        "type": "course_creation",
        "description": "New course 'Advanced ML' created",
        "timestamp": "2024-01-15T16:45:00Z"
      }
    ]
  }
}
```

**Response (Instructor):**
```json
{
  "success": true,
  "data": {
    "scope": "instructor",
    "organization_id": "org_stanford",
    "my_courses": {
      "total_courses": 3,
      "total_students": 245,
      "pending_assessments": 12,
      "avg_completion_rate": 78.5
    },
    "upcoming_deadlines": [
      {
        "course": "CS229 - Machine Learning",
        "assignment": "Problem Set 3",
        "due_date": "2024-01-20T23:59:00Z"
      }
    ]
  }
}
```

**Response (Learner):**
```json
{
  "success": true,
  "data": {
    "scope": "learner",
    "organization_id": "org_stanford",
    "learning_progress": {
      "enrolled_courses": 4,
      "completed_courses": 2,
      "overall_progress": 67.5,
      "certificates_earned": 2
    },
    "upcoming_deadlines": [
      {
        "course": "CS106A - Programming",
        "assignment": "Assignment 4",
        "due_date": "2024-01-18T23:59:00Z"
      }
    ],
    "recommendations": [
      {
        "course": "CS107 - Computer Organization",
        "reason": "Builds on your programming foundation"
      }
    ]
  }
}
```

---

## Quick Actions
**Endpoint:** `POST /api/dashboard/quick-actions`

**Description:** Get role-specific quick actions for dashboard

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor|learner",
    "organization_id": "org_stanford|null"
  }
}
```

**Response (Super Admin):**
```json
{
  "success": true,
  "data": {
    "actions": [
      {
        "id": "create_organization",
        "title": "Add New Organization",
        "description": "Create a new organization account",
        "icon": "building",
        "url": "/organizations/new"
      },
      {
        "id": "manage_users",
        "title": "Manage Global Users",
        "description": "View and manage all platform users",
        "icon": "users",
        "url": "/users"
      }
    ]
  }
}
```

**Response (Organization Admin):**
```json
{
  "success": true,
  "data": {
    "actions": [
      {
        "id": "create_course",
        "title": "Create Course",
        "description": "Create a new course for your organization",
        "icon": "plus",
        "url": "/courses/new"
      },
      {
        "id": "manage_instructors",
        "title": "Manage Instructors",
        "description": "Add or manage instructor accounts",
        "icon": "user-plus",
        "url": "/instructors"
      }
    ]
  }
}
```

---

## Activity Feed
**Endpoint:** `POST /api/activities/list`

**Description:** Get role-scoped activity feed

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor|learner",
    "organization_id": "org_stanford|null"
  },
  "filters": {
    "activity_types": ["user_registration", "course_creation"],
    "limit": 20
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "scope": "platform|organization|instructor|learner",
    "activities": [
      {
        "id": "act_1",
        "type": "user_registration",
        "description": "New instructor registered",
        "user_name": "Dr. Michael Chen",
        "organization": "Stanford University",
        "timestamp": "2024-01-15T16:45:00Z"
      }
    ]
  }
}
```

---

## Organization Statistics (Super Admin Only)
**Endpoint:** `POST /api/organizations/statistics`

**Description:** Get detailed organization statistics for Super Admin dashboard

**Request:**
```json
{
  "user_context": {
    "user_id": "user_sa_1",
    "role": "super_admin",
    "organization_id": null
  },
  "filters": {
    "include_inactive": false,
    "sort_by": "user_count",
    "limit": 10
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "organizations": [
      {
        "id": "org_stanford",
        "name": "Stanford University",
        "user_count": 12950,
        "course_count": 120,
        "completion_rate": 87.3,
        "engagement_score": 94.1,
        "status": "active",
        "last_activity": "2024-01-15T14:30:00Z"
      },
      {
        "id": "org_algoristics", 
        "name": "Algoristics",
        "user_count": 5275,
        "course_count": 85,
        "completion_rate": 91.2,
        "engagement_score": 96.4,
        "status": "active", 
        "last_activity": "2024-01-15T15:45:00Z"
      }
    ]
  }
}
```

---

## System Health (Super Admin Only)
**Endpoint:** `POST /api/system/health`

**Description:** Get real-time system health metrics for Super Admin monitoring

**Request:**
```json
{
  "user_context": {
    "user_id": "user_sa_1",
    "role": "super_admin",
    "organization_id": null
  },
  "include_detailed_metrics": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overall_status": "healthy",
    "uptime": "99.8%",
    "services": {
      "api_server": {
        "status": "healthy",
        "response_time": "145ms",
        "error_rate": "0.02%"
      },
      "database": {
        "status": "healthy",
        "connections": 45,
        "query_time": "23ms"
      },
      "file_storage": {
        "status": "healthy",
        "usage": "67%",
        "availability": "100%"
      }
    },
    "resource_usage": {
      "cpu": "34%",
      "memory": "67%", 
      "disk": "45%",
      "bandwidth": "23%"
    }
  }
}
```