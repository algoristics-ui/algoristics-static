# Public API Contracts

## Overview
Public endpoints that don't require authentication, used for landing pages, organization discovery, and public information.

---

## Platform Statistics
**Endpoint:** `POST /api/public/statistics`

**Description:** Get public platform statistics for landing page

**Request:**
```json
{
  "user_context": {
    "user_id": null,
    "role": "anonymous"
  },
  "include_trends": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "platform_stats": {
      "total_learners": "21,000+",
      "active_courses": "300+",
      "organizations": "12",
      "completion_rate": "85%",
      "satisfaction_score": "4.8/5"
    },
    "growth_highlights": {
      "new_learners_monthly": "1,200+",
      "courses_completed": "8,500+",
      "success_stories": 156
    },
    "platform_metrics": {
      "uptime": "99.9%",
      "support_response": "< 2 hours",
      "mobile_friendly": true
    }
  }
}
```

---

## Featured Organizations
**Endpoint:** `POST /api/public/featured-organizations`

**Description:** Get featured organizations for public display

**Request:**
```json
{
  "user_context": {
    "user_id": null,
    "role": "anonymous"
  },
  "limit": 8,
  "include_statistics": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "featured_organizations": [
      {
        "id": "org_stanford",
        "name": "Stanford University",
        "logo_url": "/images/stanford-logo.png",
        "description": "Leading research university with innovative online programs",
        "student_count": "12,500+",
        "course_count": "120+",
        "specialties": ["Computer Science", "Engineering", "Medicine"],
        "public_url": "/stanford",
        "featured_badge": "Top Rated"
      },
      {
        "id": "org_techcorp",
        "name": "TechCorp Training",
        "logo_url": "/images/techcorp-logo.png",
        "description": "Professional development and corporate training solutions",
        "student_count": "875+",
        "course_count": "45+",
        "specialties": ["Software Development", "Project Management", "Leadership"],
        "public_url": "/techcorp",
        "featured_badge": "Industry Leader"
      }
    ]
  }
}
```

---

## Testimonials
**Endpoint:** `POST /api/public/testimonials`

**Description:** Get user testimonials for public display

**Request:**
```json
{
  "user_context": {
    "user_id": null,
    "role": "anonymous"
  },
  "category": "all|student|instructor|organization",
  "limit": 6
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "testimonials": [
      {
        "id": "testimonial_1",
        "name": "Sarah Johnson",
        "role": "Graduate Student",
        "organization": "Stanford University",
        "avatar_url": "/images/avatars/sarah.jpg",
        "rating": 5,
        "quote": "The interactive learning platform transformed my understanding of machine learning. The hands-on projects were invaluable.",
        "course": "CS229 - Machine Learning",
        "verified": true
      },
      {
        "id": "testimonial_2",
        "name": "Dr. Michael Chen",
        "role": "Professor",
        "organization": "Stanford University",
        "avatar_url": "/images/avatars/michael.jpg",
        "rating": 5,
        "quote": "As an instructor, the analytics and student engagement tools help me provide better support to my students.",
        "course": "Multiple Courses",
        "verified": true
      }
    ]
  }
}
```

---

## Organization Directory
**Endpoint:** `POST /api/public/organizations`

**Description:** Get public directory of organizations

**Request:**
```json
{
  "user_context": {
    "user_id": null,
    "role": "anonymous"
  },
  "filters": {
    "category": "university|corporate|community",
    "search": "",
    "active_only": true
  },
  "sort_by": "name|student_count|featured"
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
        "category": "university",
        "logo_url": "/images/stanford-logo.png",
        "description": "World-renowned research university",
        "public_url": "/stanford",
        "student_count": "12,500+",
        "course_count": "120+",
        "rating": 4.9,
        "is_featured": true,
        "login_enabled": true
      },
      {
        "id": "org_citycollege",
        "name": "City Community College",
        "category": "community",
        "logo_url": "/images/citycollege-logo.png",
        "description": "Accessible higher education for all",
        "public_url": "/citycollege",
        "student_count": "2,500+",
        "course_count": "65+",
        "rating": 4.7,
        "is_featured": false,
        "login_enabled": true
      }
    ]
  }
}
```

---

## Course Catalog (Public)
**Endpoint:** `POST /api/public/courses`

**Description:** Get public course catalog

**Request:**
```json
{
  "user_context": {
    "user_id": null,
    "role": "anonymous"
  },
  "organization_id": "org_stanford",
  "filters": {
    "category": "programming|mathematics|science",
    "difficulty": "beginner|intermediate|advanced",
    "duration": "short|medium|long",
    "free_only": false
  },
  "search": "machine learning",
  "limit": 20
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": "course_cs229",
        "name": "Machine Learning",
        "code": "CS229",
        "organization": "Stanford University",
        "instructor": "Prof. Andrew Ng",
        "description": "Broad introduction to machine learning and statistical pattern recognition",
        "category": "programming",
        "difficulty": "intermediate",
        "duration_weeks": 16,
        "rating": 4.8,
        "student_count": "145 enrolled",
        "price": "Free for students",
        "prerequisites": ["Linear Algebra", "Probability"],
        "preview_video": "/videos/cs229_preview.mp4",
        "syllabus_url": "/syllabi/cs229.pdf",
        "enrollment_status": "open"
      }
    ],
    "filters_applied": {
      "organization": "Stanford University",
      "search": "machine learning",
      "category": "programming"
    },
    "total_results": 5
  }
}
```

---

## Contact Information
**Endpoint:** `POST /api/public/contact`

**Description:** Get platform contact information

**Request:**
```json
{
  "user_context": {
    "user_id": null,
    "role": "anonymous"
  },
  "contact_type": "general|support|sales|partnership"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "contact_info": {
      "general": {
        "email": "info@algoristics.com",
        "phone": "+1-800-555-0123",
        "address": {
          "street": "123 Innovation Drive",
          "city": "Palo Alto",
          "state": "CA",
          "zip": "94301",
          "country": "USA"
        }
      },
      "support": {
        "email": "support@algoristics.com",
        "phone": "+1-800-555-0124",
        "hours": "24/7",
        "response_time": "< 2 hours"
      },
      "partnerships": {
        "email": "partnerships@algoristics.com",
        "phone": "+1-800-555-0125"
      }
    },
    "social_media": {
      "linkedin": "https://linkedin.com/company/algoristics",
      "twitter": "https://twitter.com/algoristics",
      "facebook": "https://facebook.com/algoristics"
    },
    "business_hours": {
      "monday_friday": "9:00 AM - 6:00 PM PST",
      "weekend": "Support available 24/7"
    }
  }
}
```

---

## System Status
**Endpoint:** `POST /api/public/status`

**Description:** Get public system status information

**Request:**
```json
{
  "user_context": {
    "user_id": null,
    "role": "anonymous"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "system_status": {
      "overall_status": "operational",
      "last_updated": "2024-01-15T20:00:00Z",
      "uptime": "99.9%"
    },
    "services": [
      {
        "name": "Learning Platform",
        "status": "operational",
        "description": "All learning features functioning normally"
      },
      {
        "name": "Authentication",
        "status": "operational",
        "description": "Login and registration services active"
      },
      {
        "name": "Video Streaming",
        "status": "operational",
        "description": "Course videos streaming without issues"
      }
    ],
    "recent_incidents": [],
    "maintenance_windows": [
      {
        "title": "Scheduled Database Maintenance",
        "start_time": "2024-01-20T02:00:00Z",
        "end_time": "2024-01-20T04:00:00Z",
        "impact": "minimal",
        "description": "Brief interruptions possible during maintenance window"
      }
    ]
  }
}
```