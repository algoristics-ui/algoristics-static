# Authentication API Contracts

## Overview
Authentication endpoints for all user types and organizations using generic endpoints with context-based responses.

---

## User Login
**Endpoint:** `POST /api/auth/login`

**Description:** Universal login endpoint for all user types (Super Admin, Org Admin, Instructor, Learner)

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "organization_id": "org_stanford|null",
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
      "role": "super_admin|org_admin|instructor|learner",
      "organization_id": "org_stanford|null",
      "organization_name": "Stanford University",
      "permissions": ["permission1", "permission2"]
    },
    "token": "jwt_token_here",
    "refresh_token": "refresh_token_here",
    "expires_in": 3600
  }
}
```

---

## Demo Account Selection
**Endpoint:** `POST /api/auth/demo-accounts`

**Description:** Get available demo accounts for testing across all organizations

**Request:**
```json
{
  "user_context": {
    "user_id": null,
    "role": "anonymous"
  },
  "organization_id": "org_stanford|null",
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
        "description": "Course Instructor with teaching capabilities"
      }
    ]
  }
}
```

---

## Organization Configuration
**Endpoint:** `POST /api/organizations/config`

**Description:** Get organization-specific configuration and branding

**Request:**
```json
{
  "user_context": {
    "user_id": null,
    "role": "anonymous"
  },
  "organization_id": "org_stanford"
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
      "logo_url": "/images/stanford-logo.png",
      "primary_color": "#8C1515",
      "login_methods": ["standard", "sso", "demo"],
      "sso_provider": "azure|google|custom",
      "custom_styling": {
        "background_image": "/images/stanford-bg.jpg",
        "welcome_message": "Welcome to Stanford Learning Portal"
      }
    }
  }
}
```

---

## Token Refresh
**Endpoint:** `POST /api/auth/refresh`

**Description:** Refresh authentication token

**Request:**
```json
{
  "refresh_token": "refresh_token_here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token_here",
    "expires_in": 3600
  }
}
```

---

## Logout
**Endpoint:** `POST /api/auth/logout`

**Description:** Logout user and invalidate tokens

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "instructor",
    "organization_id": "org_stanford"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Successfully logged out"
  }
}
```