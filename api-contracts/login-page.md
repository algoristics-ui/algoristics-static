# Login Page API Contract

## Page: `/login` (Main Login Page)

### Description
Main login page for Super Admin authentication and organization selection.

### APIs Required

#### 1. User Authentication
- **Endpoint:** `POST /api/auth/login`
- **Method:** POST
- **Description:** Authenticate users (Super Admin, Organization users, etc.)

**Request:**
```json
{
  "email": "admin@algoristicedu.com",
  "password": "algoristic123",
  "organization_id": null,
  "login_type": "super_admin",
  "remember_me": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_sa_1",
      "name": "John Admin",
      "email": "admin@algoristicedu.com",
      "role": "super_admin",
      "organization": "Algoristics",
      "avatar_url": null,
      "permissions": [
        "platform_management",
        "user_management",
        "organization_management",
        "analytics_access",
        "system_settings"
      ]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "rt_abc123def456...",
    "expires_in": 3600
  }
}
```

#### 2. Get Available Organizations
- **Endpoint:** `POST /api/organizations/list`
- **Method:** POST
- **Description:** Get list of organizations for selection

**Request:**
```json
{
  "user_context": {
    "user_id": null,
    "role": "anonymous"
  },
  "filters": {
    "active_only": true,
    "public_only": true
  },
  "include_metadata": true
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
        "acronym": "stanford",
        "logo_url": "/images/stanford-logo.png",
        "primary_color": "#8C1515",
        "is_active": true,
        "login_enabled": true,
        "student_count": 12500
      },
      {
        "id": "org_techcorp",
        "name": "TechCorp Training", 
        "acronym": "techcorp",
        "logo_url": "/images/techcorp-logo.png",
        "primary_color": "#0066CC",
        "is_active": true,
        "login_enabled": true,
        "student_count": 875
      },
      {
        "id": "org_citycollege",
        "name": "City Community College",
        "acronym": "citycollege", 
        "logo_url": "/images/citycollege-logo.png",
        "primary_color": "#1B4332",
        "is_active": true,
        "login_enabled": true,
        "student_count": 2520
      },
      {
        "id": "org_algoristics",
        "name": "Algoristics",
        "acronym": "algoristics",
        "logo_url": "/images/algoristics-logo.png", 
        "primary_color": "#7C3AED",
        "is_active": true,
        "login_enabled": true,
        "student_count": 5275
      }
    ]
  }
}
```

#### 3. Demo Account Selection
- **Endpoint:** `POST /api/auth/demo-accounts`
- **Method:** POST
- **Description:** Get available demo accounts for testing

**Request:**
```json
{
  "user_context": {
    "user_id": null,
    "role": "anonymous"
  },
  "organization_id": "org_stanford",
  "include_all_roles": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "demo_accounts": [
      {
        "id": "demo_org_admin_1",
        "name": "Dr. Sarah Wilson",
        "email": "admin@stanford.edu",
        "role": "org_admin",
        "organization": "Stanford University",
        "description": "Organization Administrator with full management access"
      },
      {
        "id": "demo_instructor_1", 
        "name": "Prof. Johnson",
        "email": "prof.johnson@stanford.edu",
        "role": "instructor",
        "organization": "Stanford University",
        "description": "Course Instructor with teaching and assessment capabilities"
      },
      {
        "id": "demo_learner_1",
        "name": "Emma Davis", 
        "email": "emma@student.edu",
        "role": "learner",
        "organization": "Stanford University",
        "description": "Student with access to courses and learning materials"
      }
    ]
  }
}
```

#### 4. Demo Account Login
- **Endpoint:** `POST /api/auth/login`
- **Method:** POST
- **Description:** Authenticate using demo account

**Request:**
```json
{
  "demo_account_id": "demo_org_admin_1",
  "organization_id": "org_stanford",
  "login_type": "demo",
  "remember_me": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "demo_org_admin_1",
      "name": "Dr. Sarah Wilson",
      "email": "admin@stanford.edu", 
      "role": "org_admin",
      "organization": "Stanford University",
      "organization_id": "org_stanford",
      "avatar_url": null,
      "permissions": [
        "organization_management",
        "user_management",
        "course_management", 
        "analytics_access"
      ]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "rt_def456ghi789...",
    "expires_in": 3600
  }
}
```