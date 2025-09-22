# Course Management API Contracts

## Overview
Course management endpoints with role-based access control for managing courses across organizations.

---

## List Courses
**Endpoint:** `POST /api/courses/list`

**Description:** Get courses list (scope based on user role and filters)

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor|learner",
    "organization_id": "org_stanford|null"
  },
  "filters": {
    "status": "active|inactive|draft|all",
    "my_courses_only": true,
    "enrolled_only": true,
    "category": "programming|mathematics|science",
    "instructor_id": "user_456",
    "search": "",
    "sort_by": "name|created_date|enrollment_count",
    "sort_order": "asc|desc"
  },
  "include_statistics": true,
  "pagination": {
    "page": 1,
    "limit": 20
  }
}
```

**Response (Super Admin - All Courses):**
```json
{
  "success": true,
  "data": {
    "scope": "platform",
    "courses": [
      {
        "id": "course_cs229",
        "name": "Machine Learning",
        "code": "CS229",
        "organization": "Stanford University",
        "organization_id": "org_stanford",
        "instructor": "Prof. Johnson",
        "instructor_id": "user_456",
        "status": "active",
        "enrolled_students": 145,
        "completion_rate": 78.3,
        "created_date": "2023-09-01T10:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 15,
      "total_count": 315
    }
  }
}
```

**Response (Instructor - Own Courses):**
```json
{
  "success": true,
  "data": {
    "scope": "instructor_courses",
    "organization_id": "org_stanford",
    "courses": [
      {
        "id": "course_cs229",
        "name": "Machine Learning",
        "code": "CS229",
        "enrolled_students": 145,
        "pending_assignments": 12,
        "avg_grade": 82.4,
        "permissions": ["edit", "grade", "manage_students"]
      }
    ]
  }
}
```

**Response (Learner - Enrolled Courses):**
```json
{
  "success": true,
  "data": {
    "scope": "learner_courses",
    "organization_id": "org_stanford",
    "courses": [
      {
        "id": "course_cs229",
        "name": "Machine Learning",
        "code": "CS229",
        "instructor": "Prof. Johnson",
        "progress": 67.5,
        "grade": "B+",
        "next_assignment": {
          "name": "Problem Set 3",
          "due_date": "2024-01-20T23:59:00Z"
        }
      }
    ]
  }
}
```

---

## Create Course
**Endpoint:** `POST /api/courses/create`

**Description:** Create new course

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "org_admin|instructor",
    "organization_id": "org_stanford"
  },
  "course_data": {
    "name": "Advanced Machine Learning",
    "code": "CS329",
    "description": "Advanced topics in machine learning and AI",
    "category": "programming",
    "instructor_id": "user_456",
    "credits": 3,
    "duration_weeks": 16,
    "max_enrollment": 150,
    "prerequisites": ["CS229"],
    "schedule": {
      "days": ["Monday", "Wednesday", "Friday"],
      "time": "10:00-11:30",
      "location": "Gates 104"
    },
    "settings": {
      "allow_self_enrollment": false,
      "visible_to_public": true,
      "grading_scale": "letter"
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "course": {
      "id": "course_cs329",
      "name": "Advanced Machine Learning",
      "code": "CS329",
      "organization": "Stanford University",
      "instructor": "Prof. Johnson",
      "status": "draft",
      "created_date": "2024-01-15T20:00:00Z",
      "course_url": "/stanford/courses/cs329"
    }
  }
}
```

---

## Update Course
**Endpoint:** `POST /api/courses/update`

**Description:** Update course details

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "org_admin|instructor",
    "organization_id": "org_stanford"
  },
  "course_id": "course_cs229",
  "updates": {
    "name": "Machine Learning Fundamentals",
    "description": "Updated course description",
    "max_enrollment": 200,
    "status": "active"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "course": {
      "id": "course_cs229",
      "name": "Machine Learning Fundamentals",
      "status": "active",
      "updated_date": "2024-01-15T20:00:00Z"
    }
  }
}
```

---

## Delete Course
**Endpoint:** `POST /api/courses/delete`

**Description:** Delete or archive course

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "org_admin|instructor",
    "organization_id": "org_stanford"
  },
  "course_id": "course_cs229",
  "deletion_type": "soft|archive|hard",
  "options": {
    "preserve_student_records": true,
    "notify_students": true,
    "backup_course_data": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Course successfully archived",
    "course_id": "course_cs229",
    "deletion_type": "archive",
    "students_notified": 145,
    "backup_location": "backups/course_cs229_20240115.zip"
  }
}
```

---

## Course Enrollment
**Endpoint:** `POST /api/courses/enroll`

**Description:** Enroll students in courses

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "org_admin|instructor|learner",
    "organization_id": "org_stanford"
  },
  "course_id": "course_cs229",
  "students": ["user_789", "user_790"],
  "enrollment_type": "standard|audit|waitlist",
  "notify_students": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "course": {
      "id": "course_cs229",
      "name": "Machine Learning"
    },
    "enrollment_summary": {
      "total_processed": 2,
      "successful": 2,
      "failed": 0,
      "waitlisted": 0
    },
    "enrollments": [
      {
        "student_id": "user_789",
        "status": "enrolled",
        "enrollment_date": "2024-01-15T20:00:00Z"
      }
    ]
  }
}
```

---

## Course Search
**Endpoint:** `POST /api/courses/search`

**Description:** Search available courses

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "learner|instructor|org_admin",
    "organization_id": "org_stanford"
  },
  "search_query": "machine learning",
  "filters": {
    "category": "programming",
    "difficulty": "intermediate|advanced",
    "availability": "open|waitlist_available",
    "instructor": "Prof. Johnson",
    "credits": [3, 4]
  },
  "sort_by": "relevance|rating|enrollment_count"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "search_results": [
      {
        "id": "course_cs229",
        "name": "Machine Learning",
        "code": "CS229",
        "instructor": "Prof. Johnson",
        "rating": 4.8,
        "difficulty": "intermediate",
        "credits": 3,
        "enrollment_status": "open",
        "available_spots": 25,
        "description": "Introduction to machine learning algorithms...",
        "prerequisites": ["CS106B", "MATH51"]
      }
    ],
    "search_metadata": {
      "query": "machine learning",
      "total_results": 5,
      "search_time": "0.12s"
    }
  }
}
```

---

## Course Analytics
**Endpoint:** `POST /api/courses/analytics`

**Description:** Get course performance analytics

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor",
    "organization_id": "org_stanford|null"
  },
  "scope": "platform|organization|course",
  "target_id": "course_cs229",
  "metrics": ["enrollment", "completion", "engagement", "grades"],
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
    "analytics_scope": "course",
    "course": {
      "id": "course_cs229",
      "name": "Machine Learning"
    },
    "metrics": {
      "enrollment": {
        "total_enrolled": 145,
        "active_students": 138,
        "completion_rate": 78.3,
        "dropout_rate": 4.8
      },
      "engagement": {
        "avg_session_duration": "45 minutes",
        "forum_participation": 67.2,
        "assignment_submission_rate": 92.4
      },
      "performance": {
        "average_grade": 82.4,
        "grade_distribution": {
          "A": 25.5,
          "B": 42.1,
          "C": 24.8,
          "D": 5.5,
          "F": 2.1
        }
      }
    },
    "trends": {
      "enrollment_trend": "+12.5%",
      "engagement_trend": "+8.3%",
      "performance_trend": "+3.7%"
    }
  }
}
```

---

## Course Calendar
**Endpoint:** `POST /api/courses/calendar`

**Description:** Get course schedule and important dates

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "instructor|learner|org_admin",
    "organization_id": "org_stanford"
  },
  "course_id": "course_cs229",
  "date_range": {
    "start_date": "2024-01-15",
    "end_date": "2024-02-15"
  },
  "event_types": ["lecture", "assignment", "exam", "office_hours"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "course": {
      "id": "course_cs229",
      "name": "Machine Learning"
    },
    "calendar_events": [
      {
        "id": "event_1",
        "type": "lecture",
        "title": "Supervised Learning",
        "date": "2024-01-17T10:00:00Z",
        "duration": 90,
        "location": "Gates 104",
        "description": "Introduction to supervised learning algorithms"
      },
      {
        "id": "event_2",
        "type": "assignment",
        "title": "Problem Set 3",
        "due_date": "2024-01-20T23:59:00Z",
        "points": 100,
        "status": "published"
      }
    ],
    "upcoming_deadlines": [
      {
        "assignment": "Problem Set 3",
        "due_date": "2024-01-20T23:59:00Z",
        "days_remaining": 3
      }
    ]
  }
}
```