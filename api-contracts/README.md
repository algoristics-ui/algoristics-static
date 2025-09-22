# API Contracts Documentation

## Overview
This directory contains comprehensive API contract documentation for the Algoristics Learning Management System. The APIs use a **generic endpoint design** where organization and role information is passed in the request payload rather than being part of the URL structure.

## API Design Principles
- **Generic Endpoints**: URLs are role and organization agnostic - context passed in request payload
- **User Context Pattern**: All authenticated requests include user_context with role and organization
- **Role-Based Response Filtering**: API responses automatically scoped based on user role and permissions
- **Primary HTTP Method**: POST is used for most operations including data retrieval
- **Authentication**: Bearer token authentication required for protected endpoints
- **Consistent Structure**: All APIs follow standardized request/response patterns
- **Error Handling**: Standard HTTP status codes with detailed error messages
- **Rate Limiting**: Standard rate limits apply to all endpoints

## Standard Request Format
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "instructor|learner|org_admin|super_admin",
    "organization_id": "org_stanford|null",
    "permissions": ["permission1", "permission2"]
  },
  "filters": { /* filtering options */ },
  "pagination": { "page": 1, "limit": 20 },
  "include_metadata": true
}
```

## Standard Response Format
```json
{
  "success": true|false,
  "data": {
    "scope": "platform|organization|instructor|learner",
    "organization_id": "org_stanford",
    /* actual response data */
  },
  "pagination": { /* pagination info */ },
  "metadata": { /* additional context */ },
  "error": { /* error details if success is false */ },
  "timestamp": "ISO 8601 timestamp",
  "request_id": "unique_request_identifier"
}
```

## API Contract Files

### Core API Documentation

#### 1. Authentication APIs
**File**: `authentication-apis.md`  
**Description**: Universal authentication endpoints for all user types and organizations  
**Key APIs**:
- `POST /api/auth/login` - Universal login endpoint
- `POST /api/auth/demo-accounts` - Demo account selection
- `POST /api/organizations/config` - Organization configuration
- `POST /api/auth/refresh` - Token refresh
- `POST /api/auth/logout` - User logout

#### 2. Dashboard APIs
**File**: `dashboard-apis.md`  
**Description**: Comprehensive dashboard APIs for all user roles including Super Admin-specific endpoints  
**Key APIs**:
- `POST /api/dashboard/overview` - Role-specific dashboard data (all roles)
- `POST /api/dashboard/quick-actions` - Available quick actions (all roles)
- `POST /api/activities/list` - Role-scoped activity feed
- `POST /api/organizations/statistics` - Organization statistics (Super Admin only)
- `POST /api/system/health` - System health monitoring (Super Admin only)

#### 3. Organization Management APIs
**File**: `organization-management-apis.md`  
**Description**: Organization CRUD operations and statistics  
**Key APIs**:
- `POST /api/organizations/list` - List organizations (role-scoped)
- `POST /api/organizations/create` - Create organization (Super Admin)
- `POST /api/organizations/update` - Update organization
- `POST /api/organizations/delete` - Delete organization (Super Admin)
- `POST /api/organizations/statistics` - Organization statistics
- `POST /api/organizations/analytics` - Organization analytics

#### 4. User Management APIs
**File**: `user-management-apis.md`  
**Description**: User CRUD operations with role-based access control  
**Key APIs**:
- `POST /api/users/list` - List users (role-scoped)
- `POST /api/users/create` - Create user account
- `POST /api/users/update` - Update user account
- `POST /api/users/delete` - Delete user account
- `POST /api/users/activity-log` - User activity history
- `POST /api/users/bulk-operations` - Bulk user operations
- `POST /api/users/profile` - User profile information

#### 5. Course Management APIs
**File**: `course-management-apis.md`  
**Description**: Course operations with role-based permissions  
**Key APIs**:
- `POST /api/courses/list` - List courses (role-scoped)
- `POST /api/courses/create` - Create course
- `POST /api/courses/update` - Update course
- `POST /api/courses/delete` - Delete course
- `POST /api/courses/enroll` - Course enrollment
- `POST /api/courses/search` - Course search
- `POST /api/courses/analytics` - Course analytics
- `POST /api/courses/calendar` - Course calendar

#### 6. Analytics APIs
**File**: `analytics-apis.md`  
**Description**: Comprehensive analytics with role-based data scoping  
**Key APIs**:
- `POST /api/analytics/overview` - Analytics overview
- `POST /api/analytics/course-performance` - Course performance analytics
- `POST /api/analytics/learning-trends` - Learning trends analysis
- `POST /api/analytics/assessments` - Assessment analytics
- `POST /api/analytics/engagement` - User engagement analytics
- `POST /api/analytics/generate-report` - Report generation
- `POST /api/analytics/ai-insights` - AI-generated insights

#### 7. Public APIs
**File**: `public-apis.md`  
**Description**: Public endpoints for landing pages and organization discovery  
**Key APIs**:
- `POST /api/public/statistics` - Platform statistics
- `POST /api/public/featured-organizations` - Featured organizations
- `POST /api/public/testimonials` - User testimonials
- `POST /api/public/organizations` - Organization directory
- `POST /api/public/courses` - Public course catalog
- `POST /api/public/contact` - Contact information
- `POST /api/public/status` - System status

### Legacy Page Documentation

#### 8. Login Page
**File**: `login-page.md`  
**Description**: Main login page documentation (legacy format)  
**Status**: Updated to use generic endpoints

### Architecture Documentation

#### 9. Refactored API Design
**File**: `REFACTORED_API_DESIGN.md`  
**Description**: Comprehensive guide to the generic endpoint design pattern  
**Contents**: Design principles, request/response patterns, role-based scoping

#### 10. Endpoint Mapping
**File**: `ENDPOINT_MAPPING.md`  
**Description**: Mapping from old role-specific URLs to new generic endpoints  
**Contents**: Before/after comparisons, migration benefits

## Authentication Flow

### Token-Based Authentication
1. User authenticates via login endpoint
2. Server returns JWT access token and refresh token
3. Client includes access token in Authorization header for subsequent requests
4. Refresh token used to obtain new access tokens when needed

### Role-Based Access Control (RBAC)
- **super_admin**: Full platform access
- **org_admin**: Organization-wide access
- **instructor**: Course and student management within organization
- **learner**: Access to enrolled courses and learning materials
- **guest**: Limited access to public course materials

## Rate Limiting
- Authentication endpoints: 5 requests per minute per IP
- Data retrieval endpoints: 100 requests per minute per user
- Data modification endpoints: 50 requests per minute per user
- File upload endpoints: 10 requests per minute per user

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details",
    "field_errors": {
      "field_name": ["Validation error message"]
    }
  },
  "timestamp": "2024-01-15T20:00:00Z",
  "request_id": "req_123456789"
}
```

### Common Error Codes
- `AUTHENTICATION_REQUIRED`: 401 - Authentication required
- `AUTHORIZATION_DENIED`: 403 - Insufficient permissions
- `RESOURCE_NOT_FOUND`: 404 - Requested resource not found
- `VALIDATION_ERROR`: 422 - Request validation failed
- `RATE_LIMIT_EXCEEDED`: 429 - Rate limit exceeded
- `INTERNAL_SERVER_ERROR`: 500 - Internal server error

## Testing

Each API endpoint should include:
- Unit tests for business logic
- Integration tests for database operations
- End-to-end tests for complete user flows
- Performance tests for high-traffic endpoints
- Security tests for authentication and authorization

## Versioning

API versioning follows semantic versioning:
- Major version changes for breaking changes
- Minor version changes for new features
- Patch version changes for bug fixes

Current API version: `v1.0.0`

## Benefits of Generic API Design

### 1. Reduced Endpoint Count
- **Before**: 50+ organization/role-specific endpoints
- **After**: 15-20 generic endpoints
- **Reduction**: ~60% fewer endpoints to maintain

### 2. Consistent URL Structure
- **Before**: `/api/{role}/{organization}/{function}`
- **After**: `/api/{function}`
- **Benefit**: Simpler routing and caching

### 3. Role-Based Response Filtering
Same endpoint returns different data based on user context:
```json
// Super Admin sees platform-wide data
{"user_context": {"role": "super_admin"}}

// Org Admin sees organization-specific data  
{"user_context": {"role": "org_admin", "organization_id": "org_stanford"}}
```

### 4. Simplified Frontend Integration
Single function handles all user types with context-based responses.

### 5. Easier Testing
Test same endpoint with different user contexts for comprehensive coverage.

## Migration Notes

This API design represents a significant improvement over the previous role/organization-specific URL structure. All new implementations should follow these generic endpoint patterns for consistency and maintainability.

## Support

For API documentation questions or issues:
- Email: api-support@algoristics.com
- Documentation: https://docs.algoristics.com/api
- Issue Tracker: https://github.com/algoristics/platform/issues