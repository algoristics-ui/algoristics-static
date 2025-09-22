# User Management API Contracts

## Overview
User management endpoints with role-based access control for managing users across the platform.

---

## List Users
**Endpoint:** `POST /api/users/list`

**Description:** Get users list (scope based on requesting user's role)

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor",
    "organization_id": "org_stanford|null"
  },
  "filters": {
    "role": "org_admin|instructor|learner|all",
    "status": "active|inactive|pending|all",
    "organization_id": "org_stanford",
    "search": "",
    "sort_by": "name|email|role|created_date",
    "sort_order": "asc|desc"
  },
  "pagination": {
    "page": 1,
    "limit": 20
  }
}
```

**Response (Super Admin - All Users):**
```json
{
  "success": true,
  "data": {
    "scope": "platform",
    "users": [
      {
        "id": "user_456",
        "name": "Dr. Sarah Wilson",
        "email": "admin@stanford.edu",
        "role": "org_admin",
        "organization": "Stanford University",
        "organization_id": "org_stanford",
        "status": "active",
        "last_login": "2024-01-15T14:30:00Z",
        "created_date": "2023-01-15T10:00:00Z"
      },
      {
        "id": "user_789",
        "name": "Prof. Johnson",
        "email": "prof.johnson@stanford.edu",
        "role": "instructor",
        "organization": "Stanford University",
        "organization_id": "org_stanford",
        "status": "active",
        "courses_count": 3
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 25,
      "total_count": 500
    }
  }
}
```

**Response (Org Admin - Organization Users Only):**
```json
{
  "success": true,
  "data": {
    "scope": "organization",
    "organization_id": "org_stanford",
    "users": [
      {
        "id": "user_789",
        "name": "Prof. Johnson",
        "email": "prof.johnson@stanford.edu",
        "role": "instructor",
        "department": "Computer Science",
        "status": "active",
        "courses_count": 3,
        "students_count": 245
      }
    ]
  }
}
```

---

## Create User
**Endpoint:** `POST /api/users/create`

**Description:** Create new user account

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin",
    "organization_id": "org_stanford|null"
  },
  "user_data": {
    "name": "Dr. Michael Chen",
    "email": "mchen@stanford.edu",
    "role": "instructor",
    "organization_id": "org_stanford",
    "department": "Computer Science",
    "phone": "+1-555-0123",
    "send_welcome_email": true,
    "permissions": ["course_creation", "student_management"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_new_123",
      "name": "Dr. Michael Chen",
      "email": "mchen@stanford.edu",
      "role": "instructor",
      "organization": "Stanford University",
      "status": "pending",
      "temporary_password": "TempPass456!",
      "welcome_email_sent": true,
      "created_date": "2024-01-15T20:00:00Z"
    }
  }
}
```

---

## Update User
**Endpoint:** `POST /api/users/update`

**Description:** Update user account details

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin",
    "organization_id": "org_stanford|null"
  },
  "target_user_id": "user_456",
  "updates": {
    "name": "Dr. Sarah Johnson-Wilson",
    "department": "Computer Science",
    "role": "org_admin",
    "status": "active",
    "permissions": ["organization_management", "user_management"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_456",
      "name": "Dr. Sarah Johnson-Wilson",
      "email": "admin@stanford.edu",
      "role": "org_admin",
      "status": "active",
      "updated_date": "2024-01-15T20:00:00Z"
    }
  }
}
```

---

## Delete User
**Endpoint:** `POST /api/users/delete`

**Description:** Delete or deactivate user account

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin",
    "organization_id": "org_stanford|null"
  },
  "target_user_id": "user_456",
  "deletion_type": "soft|hard",
  "transfer_ownership": {
    "courses": "user_789",
    "assignments": "user_789"
  },
  "notify_user": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "User successfully deactivated",
    "user_id": "user_456",
    "deletion_type": "soft",
    "courses_transferred": 3,
    "assignments_transferred": 12,
    "notification_sent": true
  }
}
```

---

## User Activity Log
**Endpoint:** `POST /api/users/activity-log`

**Description:** Get user activity history

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin",
    "organization_id": "org_stanford|null"
  },
  "target_user_id": "user_456",
  "filters": {
    "activity_types": ["login", "course_access", "assignment_submission"],
    "date_range": {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31"
    }
  },
  "pagination": {
    "page": 1,
    "limit": 50
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_456",
      "name": "Dr. Sarah Wilson",
      "role": "org_admin"
    },
    "activities": [
      {
        "id": "activity_1",
        "type": "login",
        "description": "User logged in",
        "ip_address": "192.168.1.100",
        "user_agent": "Mozilla/5.0...",
        "timestamp": "2024-01-15T14:30:00Z"
      },
      {
        "id": "activity_2",
        "type": "user_management",
        "description": "Created new instructor account",
        "details": "Created account for Prof. Johnson",
        "timestamp": "2024-01-15T15:45:00Z"
      }
    ],
    "summary": {
      "total_activities": 156,
      "login_count": 24,
      "course_interactions": 89,
      "admin_actions": 12
    }
  }
}
```

---

## Bulk User Operations
**Endpoint:** `POST /api/users/bulk-operations`

**Description:** Perform bulk operations on multiple users

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin",
    "organization_id": "org_stanford|null"
  },
  "operation": "create|update|delete|export",
  "users": [
    {
      "name": "John Smith",
      "email": "jsmith@stanford.edu",
      "role": "learner",
      "department": "Engineering"
    },
    {
      "name": "Jane Doe",
      "email": "jdoe@stanford.edu",
      "role": "learner",
      "department": "Mathematics"
    }
  ],
  "options": {
    "send_welcome_emails": true,
    "generate_passwords": true,
    "notify_admins": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "operation": "create",
    "summary": {
      "total_processed": 2,
      "successful": 2,
      "failed": 0,
      "skipped": 0
    },
    "results": [
      {
        "email": "jsmith@stanford.edu",
        "status": "success",
        "user_id": "user_new_456",
        "temporary_password": "TempPass789!"
      },
      {
        "email": "jdoe@stanford.edu",
        "status": "success",
        "user_id": "user_new_457",
        "temporary_password": "TempPass790!"
      }
    ],
    "export_url": "/exports/bulk_users_20240115.csv"
  }
}
```

---

## User Profile
**Endpoint:** `POST /api/users/profile`

**Description:** Get detailed user profile information

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor|learner",
    "organization_id": "org_stanford|null"
  },
  "target_user_id": "user_456",
  "include_statistics": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_456",
      "name": "Dr. Sarah Wilson",
      "email": "admin@stanford.edu",
      "role": "org_admin",
      "organization": "Stanford University",
      "department": "Administration",
      "phone": "+1-555-0123",
      "avatar_url": "/avatars/user_456.jpg",
      "bio": "Experienced educator and administrator",
      "created_date": "2023-01-15T10:00:00Z",
      "last_login": "2024-01-15T14:30:00Z"
    },
    "statistics": {
      "courses_managed": 45,
      "users_supervised": 267,
      "total_logins": 342,
      "avg_session_duration": "45 minutes"
    },
    "permissions": [
      "organization_management",
      "user_management",
      "course_management",
      "analytics_access"
    ]
  }
}
```