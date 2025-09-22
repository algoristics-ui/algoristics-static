# Analytics API Contracts

## Overview
Analytics endpoints providing comprehensive insights with role-based data scoping and filtering.

---

## Analytics Overview
**Endpoint:** `POST /api/analytics/overview`

**Description:** Get comprehensive analytics overview based on user role and scope

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
  "date_range": {
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  },
  "metrics": ["user_growth", "course_performance", "engagement"]
}
```

**Response (Super Admin - Platform Analytics):**
```json
{
  "success": true,
  "data": {
    "analytics_scope": "platform",
    "key_metrics": {
      "total_users": 21642,
      "active_organizations": 12,
      "total_courses": 315,
      "platform_completion_rate": "84.7%",
      "overall_engagement": "92.3%"
    },
    "growth_trends": {
      "user_growth": "+18.5%",
      "course_creation": "+12.3%",
      "revenue_growth": "+23.1%"
    },
    "organization_breakdown": [
      {
        "organization": "Stanford University",
        "users": 12950,
        "courses": 120,
        "completion_rate": 87.3,
        "engagement_score": 94.1
      },
      {
        "organization": "TechCorp Training",
        "users": 875,
        "courses": 45,
        "completion_rate": 88.9,
        "engagement_score": 92.1
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
      "total_users": 12950,
      "active_instructors": 245,
      "total_courses": 120,
      "completion_rate": "87.3%",
      "engagement": "94.1%"
    },
    "department_breakdown": [
      {
        "department": "Computer Science",
        "courses": 45,
        "students": 3200,
        "completion_rate": 89.2
      },
      {
        "department": "Mathematics",
        "courses": 35,
        "students": 2100,
        "completion_rate": 85.7
      }
    ]
  }
}
```

---

## Course Performance Analytics
**Endpoint:** `POST /api/analytics/course-performance`

**Description:** Get detailed course performance analytics

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor",
    "organization_id": "org_stanford|null"
  },
  "filters": {
    "course_ids": ["course_cs229", "course_cs106a"],
    "instructor_id": "user_456",
    "department": "Computer Science",
    "min_enrollment": 50
  },
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
    "scope": "organization|platform",
    "course_analytics": [
      {
        "course_id": "course_cs229",
        "course_name": "Machine Learning",
        "instructor": "Prof. Johnson",
        "enrollment_metrics": {
          "total_enrolled": 145,
          "active_students": 138,
          "completion_rate": 78.3,
          "dropout_rate": 4.8
        },
        "performance_metrics": {
          "average_grade": 82.4,
          "pass_rate": 94.5,
          "grade_distribution": {
            "A": 25.5,
            "B": 42.1,
            "C": 24.8,
            "D": 5.5,
            "F": 2.1
          }
        },
        "engagement_metrics": {
          "avg_login_frequency": 4.2,
          "forum_participation": 67.2,
          "assignment_submission_rate": 92.4,
          "video_completion_rate": 78.9
        }
      }
    ],
    "comparative_analysis": {
      "top_performing_courses": ["course_cs229", "course_math51"],
      "improvement_needed": ["course_cs106b"],
      "benchmark_completion_rate": 81.5
    }
  }
}
```

---

## Learning Trends Analytics
**Endpoint:** `POST /api/analytics/learning-trends`

**Description:** Get learning trends and pattern analysis

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin",
    "organization_id": "org_stanford|null"
  },
  "trend_types": ["enrollment", "completion", "engagement", "skill_development"],
  "date_range": {
    "start_date": "2023-09-01",
    "end_date": "2024-01-31"
  },
  "granularity": "weekly|monthly|quarterly"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "trends_scope": "organization",
    "time_period": "2023-09-01 to 2024-01-31",
    "enrollment_trends": {
      "total_new_enrollments": 2847,
      "peak_enrollment_month": "September 2023",
      "seasonal_patterns": {
        "fall_semester": "+145%",
        "spring_semester": "+89%",
        "summer_break": "-67%"
      }
    },
    "completion_trends": {
      "overall_improvement": "+12.5%",
      "fastest_improving_courses": ["CS229", "MATH51"],
      "completion_by_month": [
        {
          "month": "2024-01",
          "completion_rate": 87.3,
          "courses_completed": 234
        }
      ]
    },
    "engagement_patterns": {
      "peak_activity_days": ["Tuesday", "Wednesday", "Thursday"],
      "peak_activity_hours": ["10:00-12:00", "14:00-16:00"],
      "device_usage": {
        "desktop": 65.2,
        "mobile": 28.7,
        "tablet": 6.1
      }
    },
    "skill_development": {
      "most_popular_skills": ["Machine Learning", "Data Analysis", "Programming"],
      "skill_progression_rate": 73.8,
      "certification_completion": 156
    }
  }
}
```

---

## Assessment Analytics
**Endpoint:** `POST /api/analytics/assessments`

**Description:** Get detailed assessment and grading analytics

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor",
    "organization_id": "org_stanford|null"
  },
  "filters": {
    "course_ids": ["course_cs229"],
    "assessment_types": ["quiz", "assignment", "exam"],
    "difficulty_levels": ["intermediate", "advanced"]
  },
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
    "assessment_overview": {
      "total_assessments": 47,
      "total_submissions": 3241,
      "average_score": 78.6,
      "submission_rate": 92.4
    },
    "assessment_breakdown": [
      {
        "assessment_id": "quiz_ml_01",
        "title": "Machine Learning Fundamentals Quiz",
        "type": "quiz",
        "course": "CS229",
        "attempts": 145,
        "average_score": 84.2,
        "difficulty_rating": 3.7,
        "time_statistics": {
          "average_completion_time": "18 minutes",
          "fastest_completion": "8 minutes",
          "slowest_completion": "45 minutes"
        }
      }
    ],
    "performance_insights": {
      "strongest_topics": ["Linear Regression", "Classification"],
      "challenging_topics": ["Neural Networks", "SVM"],
      "improvement_recommendations": [
        "Add more practice problems for Neural Networks",
        "Provide additional study materials for SVM concepts"
      ]
    },
    "grading_analytics": {
      "auto_graded_percentage": 75.2,
      "manual_grading_time": "4.2 hours average",
      "grade_distribution": {
        "90-100": 28.5,
        "80-89": 35.7,
        "70-79": 24.1,
        "60-69": 8.9,
        "below_60": 2.8
      }
    }
  }
}
```

---

## Engagement Analytics
**Endpoint:** `POST /api/analytics/engagement`

**Description:** Get user engagement and interaction analytics

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor",
    "organization_id": "org_stanford|null"
  },
  "engagement_metrics": ["login_frequency", "session_duration", "content_interaction", "social_engagement"],
  "user_segments": ["new_users", "active_users", "at_risk_users"],
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
    "engagement_overview": {
      "total_active_users": 11240,
      "average_session_duration": "42 minutes",
      "daily_active_users": 3847,
      "weekly_active_users": 8912,
      "monthly_active_users": 11240
    },
    "user_segments": {
      "highly_engaged": {
        "count": 3456,
        "percentage": 30.8,
        "characteristics": "Daily login, high content interaction"
      },
      "moderately_engaged": {
        "count": 5621,
        "percentage": 50.0,
        "characteristics": "Regular weekly usage"
      },
      "at_risk": {
        "count": 2163,
        "percentage": 19.2,
        "characteristics": "Declining usage, potential dropouts"
      }
    },
    "content_engagement": {
      "video_completion_rates": {
        "0-25%": 12.3,
        "26-50%": 18.7,
        "51-75%": 24.1,
        "76-100%": 44.9
      },
      "forum_participation": {
        "active_contributors": 1847,
        "average_posts_per_user": 3.2,
        "response_rate": 76.8
      },
      "assignment_engagement": {
        "on_time_submissions": 89.4,
        "early_submissions": 23.7,
        "late_submissions": 10.6
      }
    },
    "platform_usage": {
      "peak_usage_times": [
        "10:00-12:00",
        "14:00-16:00",
        "19:00-21:00"
      ],
      "device_preferences": {
        "desktop": 65.2,
        "mobile": 28.7,
        "tablet": 6.1
      },
      "feature_usage": {
        "course_videos": 94.2,
        "assignments": 87.6,
        "forums": 45.3,
        "live_sessions": 23.8
      }
    }
  }
}
```

---

## Generate Report
**Endpoint:** `POST /api/analytics/generate-report`

**Description:** Generate comprehensive analytics reports

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor",
    "organization_id": "org_stanford|null"
  },
  "report_type": "course_performance|user_engagement|financial|custom",
  "scope": "platform|organization|course",
  "target_ids": ["course_cs229", "course_cs106a"],
  "date_range": {
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  },
  "format": "pdf|excel|csv",
  "include_charts": true,
  "delivery": {
    "method": "download|email",
    "recipients": ["admin@stanford.edu"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "report": {
      "id": "report_20240115_001",
      "type": "course_performance",
      "scope": "organization",
      "format": "pdf",
      "generated_date": "2024-01-15T20:00:00Z",
      "file_size": "2.4 MB"
    },
    "download_url": "/downloads/reports/report_20240115_001.pdf",
    "expires_at": "2024-01-22T20:00:00Z",
    "summary": {
      "courses_analyzed": 2,
      "students_included": 289,
      "data_points": 1547,
      "key_insights": [
        "CS229 shows 15% improvement in completion rate",
        "Student engagement increased by 8% month-over-month"
      ]
    }
  }
}
```

---

## AI Insights
**Endpoint:** `POST /api/analytics/ai-insights`

**Description:** Get AI-generated insights and recommendations

**Request:**
```json
{
  "user_context": {
    "user_id": "user_123",
    "role": "super_admin|org_admin|instructor",
    "organization_id": "org_stanford|null"
  },
  "insight_types": ["performance_optimization", "engagement_improvement", "content_recommendations"],
  "scope": "platform|organization|course",
  "target_id": "course_cs229",
  "analysis_depth": "basic|detailed|comprehensive"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "insights_scope": "course",
    "target": {
      "id": "course_cs229",
      "name": "Machine Learning"
    },
    "ai_insights": [
      {
        "category": "performance_optimization",
        "insight": "Students struggle most with Neural Networks module",
        "evidence": "40% lower quiz scores, 25% higher forum questions",
        "recommendation": "Add interactive Neural Network visualization tool",
        "impact_prediction": "Potential 15% improvement in module completion",
        "confidence_score": 0.87
      },
      {
        "category": "engagement_improvement",
        "insight": "Video engagement drops significantly after 15 minutes",
        "evidence": "78% completion rate for <15min videos vs 45% for >15min",
        "recommendation": "Break longer videos into 10-12 minute segments",
        "impact_prediction": "Expected 20% increase in video completion",
        "confidence_score": 0.92
      }
    ],
    "predictive_analytics": {
      "at_risk_students": [
        {
          "student_id": "user_789",
          "risk_score": 0.78,
          "risk_factors": ["declining engagement", "missed assignments"],
          "intervention_suggestions": ["personalized study plan", "instructor check-in"]
        }
      ],
      "success_predictors": [
        "early assignment submission",
        "regular forum participation",
        "consistent login patterns"
      ]
    },
    "trend_forecasting": {
      "enrollment_prediction": "+12% next semester",
      "completion_rate_forecast": "82-85% based on current trends",
      "resource_requirements": "Additional TA support recommended"
    }
  }
}
```