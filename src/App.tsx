import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import LearnerLayout from "@/components/LearnerLayout";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AssessmentsPage from "./pages/AssessmentsPage";
import ReportsPage from "./pages/ReportsPage";
import StudentsPage from "./pages/StudentsPage";
import InstructorsPage from "./pages/InstructorsPage";
import OrganizationsPage from "./pages/OrganizationsPage";
import SettingsPage from "./pages/SettingsPage";
import { NewCoursePage } from "./pages/NewCoursePage";
import { CreateAssessmentPage } from "./pages/CreateAssessmentPage";
import { AddStudentsPage } from "./pages/AddStudentsPage";
import { CertificatesPage } from "./pages/CertificatesPage";
import CreateOrganizationPage from "./pages/CreateOrganizationPage";
import StanfordPortalPage from "./pages/StanfordPortalPage";
import TechCorpPortalPage from "./pages/TechCorpPortalPage";
import CityCollegePortalPage from "./pages/CityCollegePortalPage";
import OrganizationDashboardPage from "./pages/OrganizationDashboardPage";
import OrganizationCoursesPage from "./pages/OrganizationCoursesPage";
import OrganizationStudentsPage from "./pages/OrganizationStudentsPage";
import OrganizationAnalyticsPage from "./pages/OrganizationAnalyticsPage";
import OrganizationAssessmentsPage from "./pages/OrganizationAssessmentsPage";
import OrganizationCertificatesPage from "./pages/OrganizationCertificatesPage";
import OrganizationReportsPage from "./pages/OrganizationReportsPage";
import OrganizationInstructorsPage from "./pages/OrganizationInstructorsPage";
import OrganizationSettingsPage from "./pages/OrganizationSettingsPage";
import OrganizationNewsFeedPage from "./pages/OrganizationNewsFeedPage";
import OrganizationHomePage from "./pages/OrganizationHomePage";
import OrganizationLoginPage from "./pages/OrganizationLoginPage";
import OrganizationDetailPage from "./pages/OrganizationDetailPage";
import OrganizationEditPage from "./pages/OrganizationEditPage";
import OrganizationAdminSettingsPage from "./pages/OrganizationAdminSettingsPage";
import InstructorProfilePage from "./pages/InstructorProfilePage";
import InstructorCourseViewPage from "./pages/InstructorCourseViewPage";
import InstructorCourseEditPage from "./pages/InstructorCourseEditPage";
import InstructorCourseSettingsPage from "./pages/InstructorCourseSettingsPage";
import InstructorCourseAnalyticsPage from "./pages/InstructorCourseAnalyticsPage";
import LearnerDashboardPage from "./pages/LearnerDashboardPage";
import LearnerCoursesPage from "./pages/LearnerCoursesPage";
import LearnerAssessmentsPage from "./pages/LearnerAssessmentsPage";
import LearnerPathsPage from "./pages/LearnerPathsPage";
import LearnerAnalyticsPage from "./pages/LearnerAnalyticsPage";
import EnhancedLearnerDashboard from "./pages/EnhancedLearnerDashboard";
import LearnerCertificatesPage from "./pages/LearnerCertificatesPage";
import NotFound from "./pages/NotFound";
import RequestDemoPage from "./pages/RequestDemoPage";
import WatchVideoPage from "./pages/WatchVideoPage";
import ConsultationPage from "./pages/ConsultationPage";
import GetStartedPage from "./pages/GetStartedPage";
import GlobalUsersPage from "./pages/GlobalUsersPage";
import PerformancePage from "./pages/PerformancePage";
import SecurityPage from "./pages/SecurityPage";
import InfrastructurePage from "./pages/InfrastructurePage";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/request-demo" element={<RequestDemoPage />} />
            <Route path="/watch-video" element={<WatchVideoPage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/get-started" element={<GetStartedPage />} />
            
            {/* Public Organization Home Pages */}
            <Route path="/stanford" element={<OrganizationHomePage />} />
            <Route path="/techcorp" element={<OrganizationHomePage />} />
            <Route path="/algoristics" element={<OrganizationHomePage />} />
            <Route path="/citycollege" element={<OrganizationHomePage />} />
            
            {/* Public Organization Login Pages */}
            <Route path="/stanford/login" element={<OrganizationLoginPage />} />
            <Route path="/techcorp/login" element={<OrganizationLoginPage />} />
            <Route path="/algoristics/login" element={<OrganizationLoginPage />} />
            <Route path="/citycollege/login" element={<OrganizationLoginPage />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/courses" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CoursesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/analytics" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AnalyticsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Placeholder routes for other sections */}
            <Route path="/assessments" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AssessmentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ReportsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/students" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <StudentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/instructors" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/organizations" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Super Admin Organization Management Routes */}
            <Route path="/super-admin/organizations/:orgId" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationDetailPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/super-admin/organizations/:orgId/edit" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationEditPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/super-admin/organizations/:orgId/settings" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationAdminSettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/new-course" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NewCoursePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/create-assessment" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CreateAssessmentPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/add-students" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AddStudentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/certificates" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CertificatesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/users" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <GlobalUsersPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/performance" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <PerformancePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/security" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SecurityPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/infrastructure" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InfrastructurePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />


            <Route path="/newsfeed" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationNewsFeedPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/create-organization" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CreateOrganizationPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Legacy Portal Routes - Redirect to new meaningful URLs */}
            <Route path="/portal/1/*" element={<Navigate to="/stanford/dashboard" replace />} />
            <Route path="/portal/2/*" element={<Navigate to="/techcorp/dashboard" replace />} />
            <Route path="/portal/3/*" element={<Navigate to="/citycollege/dashboard" replace />} />
            <Route path="/portal/4/*" element={<Navigate to="/citycollege/dashboard" replace />} />
            <Route path="/portal/5/*" element={<Navigate to="/techcorp/dashboard" replace />} />
            <Route path="/portal/6/*" element={<Navigate to="/citycollege/dashboard" replace />} />
            <Route path="/portal/7/*" element={<Navigate to="/techcorp/dashboard" replace />} />
            <Route path="/portal/8/*" element={<Navigate to="/techcorp/dashboard" replace />} />
            <Route path="/portal/9/*" element={<Navigate to="/stanford/dashboard" replace />} />

            {/* Legacy Portal Sub-routes - Redirect to new meaningful URLs */}
            <Route path="/portal/1/courses" element={<Navigate to="/stanford/courses" replace />} />
            <Route path="/portal/1/students" element={<Navigate to="/stanford/students" replace />} />
            <Route path="/portal/1/analytics" element={<Navigate to="/stanford/analytics" replace />} />
            <Route path="/portal/1/settings" element={<Navigate to="/stanford/settings" replace />} />
            
            <Route path="/portal/2/courses" element={<Navigate to="/techcorp/courses" replace />} />
            <Route path="/portal/2/students" element={<Navigate to="/techcorp/students" replace />} />
            <Route path="/portal/2/analytics" element={<Navigate to="/techcorp/analytics" replace />} />
            <Route path="/portal/2/settings" element={<Navigate to="/techcorp/settings" replace />} />
            
            <Route path="/portal/3/courses" element={<Navigate to="/citycollege/courses" replace />} />
            <Route path="/portal/3/students" element={<Navigate to="/citycollege/students" replace />} />
            <Route path="/portal/3/analytics" element={<Navigate to="/citycollege/analytics" replace />} />
            <Route path="/portal/3/settings" element={<Navigate to="/citycollege/settings" replace />} />

            {/* Keep legacy routes for backward compatibility */}
            <Route path="/portal/:orgId/dashboard" element={<OrganizationDashboardPage />} />
            <Route path="/portal/:orgId/courses" element={<OrganizationCoursesPage />} />
            <Route path="/portal/:orgId/students" element={<OrganizationStudentsPage />} />
            <Route path="/portal/:orgId/analytics" element={<OrganizationAnalyticsPage />} />
            <Route path="/portal/:orgId/assessments" element={<OrganizationAssessmentsPage />} />
            <Route path="/portal/:orgId/certificates" element={<OrganizationCertificatesPage />} />
            <Route path="/portal/:orgId/reports" element={<OrganizationReportsPage />} />
            <Route path="/portal/:orgId/instructors" element={<OrganizationInstructorsPage />} />
            <Route path="/portal/:orgId/newsfeed" element={<OrganizationNewsFeedPage />} />
            <Route path="/portal/:orgId/settings" element={<OrganizationSettingsPage />} />

            {/* Organization-based Routes with Meaningful Names */}
            <Route path="/stanford/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationDashboardPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationDashboardPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationDashboardPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationDashboardPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Add other organization routes for different pages */}
            <Route path="/stanford/courses" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationCoursesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/courses" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationCoursesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/courses" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationCoursesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/courses" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationCoursesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/stanford/students" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationStudentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/students" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationStudentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/students" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationStudentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/students" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationStudentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/stanford/analytics" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationAnalyticsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/analytics" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationAnalyticsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/analytics" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationAnalyticsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/analytics" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationAnalyticsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Organization Assessments Routes */}
            <Route path="/stanford/assessments" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationAssessmentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/assessments" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationAssessmentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/assessments" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationAssessmentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/assessments" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationAssessmentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/stanford/settings" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationSettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/settings" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationSettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/settings" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationSettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/settings" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationSettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Instructor Profile Routes */}
            <Route path="/stanford/profile" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorProfilePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/profile" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorProfilePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/profile" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorProfilePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/profile" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorProfilePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Instructor Course Routes */}
            {/* Stanford Instructor Course Routes */}
            <Route path="/stanford/courses/:courseId" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseViewPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/stanford/courses/:courseId/edit" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseEditPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/stanford/courses/:courseId/settings" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseSettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/stanford/courses/:courseId/analytics" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseAnalyticsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* TechCorp Instructor Course Routes */}
            <Route path="/techcorp/courses/:courseId" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseViewPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/courses/:courseId/edit" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseEditPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/courses/:courseId/settings" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseSettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/courses/:courseId/analytics" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseAnalyticsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Algoristics Instructor Course Routes */}
            <Route path="/algoristics/courses/:courseId" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseViewPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/courses/:courseId/edit" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseEditPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/courses/:courseId/settings" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseSettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/courses/:courseId/analytics" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseAnalyticsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* City College Instructor Course Routes */}
            <Route path="/citycollege/courses/:courseId" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseViewPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/courses/:courseId/edit" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseEditPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/courses/:courseId/settings" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseSettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/courses/:courseId/analytics" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorCourseAnalyticsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Organization Reports Routes */}
            <Route path="/stanford/reports" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationReportsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/reports" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationReportsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/reports" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationReportsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/reports" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationReportsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Organization Instructors Routes */}
            <Route path="/stanford/instructors" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationInstructorsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/instructors" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationInstructorsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/instructors" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationInstructorsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/instructors" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationInstructorsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Organization Certificates Routes */}
            <Route path="/stanford/certificates" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationCertificatesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/certificates" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationCertificatesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/certificates" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationCertificatesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/certificates" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationCertificatesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Organization News Feed Routes */}
            <Route path="/stanford/newsfeed" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationNewsFeedPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/newsfeed" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationNewsFeedPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/newsfeed" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationNewsFeedPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/newsfeed" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OrganizationNewsFeedPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Organization New Course Routes */}
            <Route path="/stanford/new-course" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NewCoursePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/new-course" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NewCoursePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/new-course" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NewCoursePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/new-course" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NewCoursePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Organization Create Assessment Routes */}
            <Route path="/stanford/create-assessment" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CreateAssessmentPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/create-assessment" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CreateAssessmentPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/create-assessment" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CreateAssessmentPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/create-assessment" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CreateAssessmentPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Organization Issue Certificate Routes */}
            <Route path="/stanford/issue-certificate" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CertificatesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/issue-certificate" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CertificatesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/issue-certificate" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CertificatesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/issue-certificate" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CertificatesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Organization Add Students Routes */}
            <Route path="/stanford/add-students" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AddStudentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/add-students" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AddStudentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/add-students" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AddStudentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/add-students" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AddStudentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Organization Custom Report Routes */}
            <Route path="/stanford/custom-report" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ReportsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/custom-report" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ReportsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/custom-report" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ReportsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/custom-report" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ReportsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Organization Add Instructor Routes */}
            <Route path="/stanford/add-instructor" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/add-instructor" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/add-instructor" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/add-instructor" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InstructorsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Learner Portal Routes - Mobile-First Responsive Design */}
            {/* Stanford Learner Routes */}
            <Route path="/stanford/learner/dashboard" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <EnhancedLearnerDashboard />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/stanford/learner/courses" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerCoursesPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/stanford/learner/assessments" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerAssessmentsPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/stanford/learner/paths" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerPathsPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/stanford/learner/analytics" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerAnalyticsPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />

            {/* TechCorp Learner Routes */}
            <Route path="/techcorp/learner/dashboard" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <EnhancedLearnerDashboard />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/learner/courses" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerCoursesPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/learner/assessments" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerAssessmentsPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/learner/paths" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerPathsPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/learner/analytics" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerAnalyticsPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />

            {/* Algoristics Learner Routes */}
            <Route path="/algoristics/learner/dashboard" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <EnhancedLearnerDashboard />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/learner/courses" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerCoursesPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/learner/assessments" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerAssessmentsPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/learner/paths" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerPathsPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/learner/analytics" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerAnalyticsPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />

            {/* CityCollege Learner Routes */}
            <Route path="/citycollege/learner/dashboard" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <EnhancedLearnerDashboard />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/learner/courses" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerCoursesPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/learner/assessments" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerAssessmentsPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/learner/paths" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerPathsPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/learner/analytics" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerAnalyticsPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />

            {/* Learner Certificates Routes - learner-focused certificates page */}
            <Route path="/stanford/learner/certificates" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerCertificatesPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/techcorp/learner/certificates" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerCertificatesPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/algoristics/learner/certificates" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerCertificatesPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />
            <Route path="/citycollege/learner/certificates" element={
              <ProtectedRoute>
                <LearnerLayout>
                  <LearnerCertificatesPage />
                </LearnerLayout>
              </ProtectedRoute>
            } />



            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
