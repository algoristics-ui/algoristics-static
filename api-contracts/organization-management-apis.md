# Organization Management API Contracts

## Overview
Organization management endpoints for Super Admin operations using generic endpoints with role-based access control.

---

## List Organizations
**Endpoint:** `POST /api/organizations/list`

**Description:** Get organizations list (scope based on user role)

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin",
    "organization_id": "org_stanford|null"
  },
  "filters": {
    "status": "active|inactive|all",
    "search": "",
    "sort_by": "name|user_count|created_date",
    "sort_order": "asc|desc"
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
    "scope": "platform",
    "organizations": [
      {
        "id": "org_stanford",
        "name": "Stanford University",
        "acronym": "stanford",
        "user_count": 12950,
        "course_count": 120,
        "status": "active",
        "created_date": "2023-01-15T10:00:00Z",
        "admin_contact": {
          "name": "Dr. Sarah Wilson",
          "email": "admin@stanford.edu"
        }
      },
      {
        "id": "org_techcorp",
        "name": "TechCorp Training",
        "acronym": "techcorp",
        "user_count": 875,
        "course_count": 45,
        "status": "active",
        "created_date": "2023-03-20T14:30:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 1,
      "total_count": 4
    }
  }
}
```

**Response (Org Admin - Own Organization Only):**
```json
{
  "success": true,
  "data": {
    "scope": "organization",
    "organizations": [
      {
        "id": "org_stanford",
        "name": "Stanford University",
        "user_count": 12950,
        "course_count": 120,
        "status": "active"
      }
    ]
  }
}
```

---

## Create Organization
**Endpoint:** `POST /api/organizations/create`

**Description:** Create new organization (Super Admin only)

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
    "primary_color": "#003366",
    "logo_url": "/images/newuni-logo.png",
    "admin_contact": {
      "name": "Dr. Jane Smith",
      "email": "admin@newuni.edu",
      "phone": "+1-555-0123"
    },
    "settings": {
      "allow_self_registration": true,
      "sso_enabled": false,
      "demo_accounts_enabled": true
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "organization": {
      "id": "org_newuni",
      "name": "New University",
      "acronym": "newuni",
      "status": "active",
      "created_date": "2024-01-15T20:00:00Z",
      "admin_credentials": {
        "username": "admin@newuni.edu",
        "temporary_password": "TempPass123!",
        "must_change_password": true
      }
    }
  }
}
```

---

## Update Organization
**Endpoint:** `POST /api/organizations/update`

**Description:** Update organization details

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin",
    "organization_id": "org_stanford|null"
  },
  "organization_id": "org_stanford",
  "updates": {
    "name": "Stanford University",
    "website": "https://stanford.edu",
    "primary_color": "#8C1515",
    "settings": {
      "allow_self_registration": false,
      "sso_enabled": true
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "organization": {
      "id": "org_stanford",
      "name": "Stanford University",
      "status": "active",
      "updated_date": "2024-01-15T20:00:00Z"
    }
  }
}
```

---

## Delete Organization
**Endpoint:** `POST /api/organizations/delete`

**Description:** Delete organization (Super Admin only)

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin",
    "organization_id": null
  },
  "organization_id": "org_inactive",
  "confirmation": {
    "confirm_deletion": true,
    "backup_data": true,
    "notify_users": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Organization successfully deleted",
    "backup_location": "backups/org_inactive_20240115.zip",
    "affected_users": 45,
    "affected_courses": 12
  }
}
```

---

## Organization Statistics
**Endpoint:** `POST /api/organizations/statistics`

**Description:** Get detailed organization statistics

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin",
    "organization_id": "org_stanford|null"
  },
  "filters": {
    "include_inactive": false,
    "sort_by": "user_count|course_count|engagement",
    "date_range": {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31"
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "scope": "platform|organization",
    "statistics": [
      {
        "organization_id": "org_stanford",
        "name": "Stanford University",
        "metrics": {
          "total_users": 12950,
          "active_users": 11240,
          "total_courses": 120,
          "active_courses": 115,
          "completion_rate": 87.3,
          "engagement_score": 94.1,
          "monthly_growth": {
            "users": "+2.5%",
            "courses": "+1.2%",
            "activity": "+5.7%"
          }
        },
        "activity_breakdown": {
          "instructors": 245,
          "learners": 11705,
          "org_admins": 12
        }
      }
    ]
  }
}
```

---

## Organization Analytics
**Endpoint:** `POST /api/organizations/analytics`

**Description:** Get detailed analytics for organizations

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin",
    "organization_id": null
  },
  "scope": "platform|organization",
  "target_organization": "org_stanford",
  "metrics": ["user_growth", "course_performance", "engagement"],
  "date_range": {
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "analytics_scope": "platform",
    "organization_comparison": [
      {
        "organization": "Stanford University",
        "user_growth": 12.5,
        "course_completion": 87.3,
        "engagement_score": 94.1,
        "revenue_contribution": 35.2
      },
      {
        "organization": "TechCorp Training",
        "user_growth": 8.3,
        "course_completion": 88.9,
        "engagement_score": 92.1,
        "revenue_contribution": 15.7
      }
    ],
    "platform_trends": {
      "total_organizations": 12,
      "avg_completion_rate": 86.8,
      "platform_growth": "+15.3%"
    }
  }
}
```