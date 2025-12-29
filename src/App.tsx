import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import PeoplePage from "./pages/PeoplePage/PeoplePage";
import SegregatedBiblesPage from "./pages/SegregatedBiblesPage/SegregatedBiblesPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import VerifyEmailPage from "./pages/Auth/VerifyEmailPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import ProtectedRoute from "./components/ProtectedRoute/index";
import PublicRoute from "./components/PublicRoute/index";
import { ProfileProvider } from "./contexts/ProfileContext";
import { SearchProvider } from "./contexts/SearchContext";
import { BookProvider } from "./contexts/BookContext";
import BibleViewer from "./pages/BibleViewer";
import VersesPage from "./pages/VersesPage/VersesPage";
import DownloadsPage from "./pages/DownloadsPage/DownloadsPage";
import BookmarksPage from "./pages/BookmarksPage/BookmarksPage";
import BookDetails from "./pages/BookDetails/BookDetails";
import BibleReaderPage from "./pages/BibleReaderPage/BibleReaderPage";
import PrayerRequestViewPage from "./pages/PrayerRequestViewPage/PrayerRequestViewPage";
import AdminLoginPage from "./pages/Admin/Auth/AdminLoginPage";
import AdminLayout from "./pages/Admin/Layout/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import CreateVerse from "./pages/Admin/Verses/CreateVerse";
import CreateBook from "./pages/Admin/Books/CreateBook";
import BookChapters from "./pages/Admin/Books/BookChapters";
import AdminProtectedRoute from "./components/AdminProtectedRoute/index";
import UserProtectedRoute from "./components/UserProtectedRoute/index";
import NotesPage from "./pages/NotesPage/NotesPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage/TermsAndConditionsPage";
import AdminTestimonials from "./pages/Admin/Testimonials/AdminTestimonials";
import LandingPage from "./landingPage";
import { StyleWrapper } from "./components/StyledWrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <StyleWrapper>
              <LoginPage />
              </StyleWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <StyleWrapper>
              <SignupPage />
              </StyleWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <PublicRoute>
              <StyleWrapper>
              <VerifyEmailPage />
              </StyleWrapper>
            </PublicRoute>
          }
        />
        <Route
          path="/admin/login"
          element={
            <PublicRoute>
              <StyleWrapper>
              <AdminLoginPage />
              </StyleWrapper>
            </PublicRoute>
          }
        />

        <Route path="/" element={ 
            <LandingPage />
        } />

        <Route path="/forgot-password" element={<StyleWrapper><ForgotPasswordPage /></StyleWrapper>} />
        <Route
          path="/terms-and-conditions"
          element={
            <PublicRoute>
              <StyleWrapper><TermsAndConditionsPage /></StyleWrapper>
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
                <ProfileProvider>
                  <WebSocketProvider>
                    <NotificationProvider>
                      <SearchProvider>
                        <BookProvider>
                          <Routes>
                          {/* Admin Routes */}
                          <Route
                            path="/admin/*"
                            element={
                              <AdminProtectedRoute>
                                <StyleWrapper>
                                <Routes>
                                  <Route element={<AdminLayout />}>
                                    <Route
                                      path="dashboard"
                                      element={<AdminDashboard />}
                                    />
                                    <Route
                                      path="create-verse"
                                      element={<CreateVerse />}
                                    />
                                    <Route
                                      path="books"
                                      element={<CreateBook />}
                                    />
                                    <Route
                                      path="books/:bookId/chapters"
                                      element={<BookChapters />}
                                    />
                                    <Route path = "testimonials"
                                      element={<AdminTestimonials />}
                                    />
                                    <Route
                                      path=""
                                      element={<Navigate to="dashboard" replace />}
                                    />
                                  </Route>
                                </Routes>
                                </StyleWrapper>
                              </AdminProtectedRoute>
                            }
                          />

                          {/* User Routes */}
                          <Route
                            path="*"
                            element={
                              <UserProtectedRoute>
                                <StyleWrapper>
                                <Layout>
                                  <Routes>
                                    <Route path="/home" element={<HomePage />} />
                                    <Route
                                      path="/people"
                                      element={<PeoplePage />}
                                    />
                                    <Route
                                      path="/segregated-bibles"
                                      element={<SegregatedBiblesPage />}
                                    />
                                     <Route
                                  path="/bookmarks"
                                  element={<BookmarksPage />}
                                />
                                    <Route
                                      path="/profile"
                                      element={<ProfilePage />}
                                    />
                                    <Route
                                      path="/profile/:userId"
                                      element={<UserProfilePage />}
                                    />
                                    <Route
                                      path="/verses"
                                      element={<VersesPage />}
                                    />
                                    <Route
                                      path="/bible-viewer"
                                      element={<BibleViewer />}
                                    />
                                    <Route
                                      path="/downloads"
                                      element={<DownloadsPage />}
                                    />
                                    <Route
                                      path="/bible-reader/:categoryId/:ageGroupId"
                                      element={<BibleReaderPage />}
                                    />
                                    <Route
                                      path="/book/:bookId"
                                      element={<BookDetails />}
                                    />
                                    <Route
                                      path="/prayer-request/:requestId"
                                      element={<PrayerRequestViewPage />}
                                    />
                                    <Route 
                                      path="/notes"
                                      element={<NotesPage />}
                                    />
                                  </Routes>
                                </Layout>
                                </StyleWrapper>
                              </UserProtectedRoute>
                            }
                          />
                        </Routes>
                        </BookProvider>
                      </SearchProvider>
                    </NotificationProvider>
                  </WebSocketProvider>
                </ProfileProvider>
              
            </ProtectedRoute>
          }
        />

        {/* <Route path = "/testing-websocket" element={<WebSocketConnection />} /> */}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
