'use client';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import PortalLayout from './components/PortalLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Library from './pages/library/Library';

// Student Portal
import Dashboard from './pages/student/Dashboard';
import DashboardBak from './pages/student/DashboardBak';
import CourseView from './pages/student/CourseView';
import LessonView from './pages/student/LessonView';
import StudentPortfolio from './pages/student/Portfolio';
import StudentTools from './pages/student/Tools';
import StudentSettings from './pages/student/Settings';
import StudentAssessments from './pages/student/Assessments';
import AssessmentView from './pages/student/AssessmentView';

// Teacher Portal
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherClasses from './pages/teacher/Classes';
import TeacherAssessments from './pages/teacher/Assessments';
import TeacherProgress from './pages/teacher/Progress';
import TeacherCalendar from './pages/teacher/Calendar';
import TeacherMessages from './pages/teacher/Messages';
import TeacherTools from './pages/teacher/Tools';
import TeacherSettings from './pages/teacher/Settings';

// Parent Portal
import ParentDashboard from './pages/parent/Dashboard';
import ParentChildren from './pages/parent/Children';
import ParentReports from './pages/parent/Reports';
import ParentMessages from './pages/parent/Messages';
import ParentCalendar from './pages/parent/Calendar';
import ParentSettings from './pages/parent/Settings';

// Admin Portal
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminCourses from './pages/admin/Courses';
import AdminAnalytics from './pages/admin/Analytics';
import AdminAnnouncements from './pages/admin/Announcements';
import AdminSettings from './pages/admin/Settings';

// Health Team Portal
import HealthDashboard from './pages/health/Dashboard';
import HealthFirstAid from './pages/health/FirstAid';
import HealthPsychological from './pages/health/Psychological';
import HealthRecords from './pages/health/Records';
import HealthResources from './pages/health/Resources';
import HealthTools from './pages/health/Tools';
import HealthSettings from './pages/health/Settings';

import NotFound from './pages/NotFound';

// Create a client for React Query
const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to='/login' />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case 'student':
        return <Navigate to='/dashboard' />;
      case 'teacher':
        return <Navigate to='/teacher/dashboard' />;
      case 'parent':
        return <Navigate to='/parent/dashboard' />;
      case 'admin':
        return <Navigate to='/admin/dashboard' />;
      case 'health':
        return <Navigate to='/health/dashboard' />;
      default:
        return <Navigate to='/login' />;
    }
  }

  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ThemeProvider>
          <AuthProvider>
            <NotificationProvider>
              <div className='w-full overflow-hidden'>
                <Router>
                  <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />

                    {/* Student Portal */}
                    <Route
                      element={
                        <ProtectedRoute allowedRoles={['student']}>
                          <PortalLayout portalType='student' />
                        </ProtectedRoute>
                      }
                    >
                      <Route path='/dashboard' element={<Dashboard />} />
                      <Route path='/courses' element={<DashboardBak />} />
                      <Route
                        path='/course/:courseId'
                        element={<CourseView />}
                      />
                      <Route
                        path='/lesson/:lessonId'
                        element={<LessonView />}
                      />
                      <Route path='/portfolio' element={<StudentPortfolio />} />
                      <Route
                        path='/achievements'
                        element={<Navigate to='/portfolio' replace />}
                      />
                      <Route path='/tools' element={<StudentTools />} />
                      <Route path='/settings' element={<StudentSettings />} />
                      <Route
                        path='/assessments'
                        element={<StudentAssessments />}
                      />
                      <Route
                        path='/assessment/:assessmentId'
                        element={<AssessmentView />}
                      />
                      <Route
                        path='/assessment/:assessmentId/review'
                        element={<AssessmentView />}
                      />
                      <Route
                        path='/library'
                        element={<Library userType='student' />}
                      />
                    </Route>

                    {/* Teacher Portal */}
                    <Route
                      element={
                        <ProtectedRoute allowedRoles={['teacher']}>
                          <PortalLayout portalType='teacher' />
                        </ProtectedRoute>
                      }
                    >
                      <Route
                        path='/teacher/dashboard'
                        element={<TeacherDashboard />}
                      />
                      <Route
                        path='/teacher/classes'
                        element={<TeacherClasses />}
                      />
                      <Route
                        path='/teacher/assessments'
                        element={<TeacherAssessments />}
                      />
                      <Route
                        path='/teacher/progress'
                        element={<TeacherProgress />}
                      />
                      <Route
                        path='/teacher/calendar'
                        element={<TeacherCalendar />}
                      />
                      <Route
                        path='/teacher/messages'
                        element={<TeacherMessages />}
                      />
                      <Route path='/teacher/tools' element={<TeacherTools />} />
                      <Route
                        path='/teacher/settings'
                        element={<TeacherSettings />}
                      />
                      <Route
                        path='/teacher/library'
                        element={<Library userType='teacher' />}
                      />
                    </Route>

                    {/* Parent Portal */}
                    <Route
                      element={
                        <ProtectedRoute allowedRoles={['parent']}>
                          <PortalLayout portalType='parent' />
                        </ProtectedRoute>
                      }
                    >
                      <Route
                        path='/parent/dashboard'
                        element={<ParentDashboard />}
                      />
                      <Route
                        path='/parent/children'
                        element={<ParentChildren />}
                      />
                      <Route
                        path='/parent/reports'
                        element={<ParentReports />}
                      />
                      <Route
                        path='/parent/messages'
                        element={<ParentMessages />}
                      />
                      <Route
                        path='/parent/calendar'
                        element={<ParentCalendar />}
                      />
                      <Route
                        path='/parent/settings'
                        element={<ParentSettings />}
                      />
                    </Route>

                    {/* Admin Portal */}
                    <Route
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <PortalLayout portalType='admin' />
                        </ProtectedRoute>
                      }
                    >
                      <Route
                        path='/admin/dashboard'
                        element={<AdminDashboard />}
                      />
                      <Route path='/admin/users' element={<AdminUsers />} />
                      <Route path='/admin/courses' element={<AdminCourses />} />
                      <Route
                        path='/admin/analytics'
                        element={<AdminAnalytics />}
                      />
                      <Route
                        path='/admin/announcements'
                        element={<AdminAnnouncements />}
                      />
                      <Route
                        path='/admin/settings'
                        element={<AdminSettings />}
                      />
                    </Route>

                    {/* Health Team Portal */}
                    <Route
                      element={
                        <ProtectedRoute allowedRoles={['health']}>
                          <PortalLayout portalType='health' />
                        </ProtectedRoute>
                      }
                    >
                      <Route
                        path='/health/dashboard'
                        element={<HealthDashboard />}
                      />
                      <Route
                        path='/health/first-aid'
                        element={<HealthFirstAid />}
                      />
                      <Route
                        path='/health/psychological'
                        element={<HealthPsychological />}
                      />
                      <Route
                        path='/health/records'
                        element={<HealthRecords />}
                      />
                      <Route
                        path='/health/resources'
                        element={<HealthResources />}
                      />
                      <Route path='/health/tools' element={<HealthTools />} />
                      <Route
                        path='/health/settings'
                        element={<HealthSettings />}
                      />
                      <Route
                        path='/health/library'
                        element={<Library userType='health' />}
                      />
                    </Route>

                    <Route path='*' element={<NotFound />} />
                  </Routes>
                </Router>
              </div>
              <Toaster position='bottom-right' richColors closeButton />
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
