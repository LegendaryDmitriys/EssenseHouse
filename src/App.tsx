import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home.tsx";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import About from "@/pages/About.tsx";
import Contacts from "@/pages/Contacts.tsx";
import Testimonials from "@/pages/Testimonials.tsx";
import Blog from "@/pages/Blog.tsx";
import BlogPost from "@/components/blog/BlogPost.tsx";
import ProjectDetail from "@/pages/ProjectDetails.tsx";
import PrivacyPolicy from "@/pages/PrivacyPolice.tsx";
import TermsOfUse from "@/pages/TermsOfUse.tsx";
import ReadyHouses from "@/pages/ReadyHouses.tsx";
import Login from "@/pages/Login.tsx";
import Register from "@/pages/Register.tsx";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute.tsx";
import Profile from "@/pages/Profile.tsx";
import AdminDashboard from "@/pages/Admin.tsx";
import Orders from "@/pages/Orders.tsx";
import PurchasedHouses from "@/pages/PurchasedHouses.tsx";
import HouseQuestions from "@/pages/HouseQuestions.tsx";
import UserQuestions from "@/pages/UserQuestions.tsx";
import UserReviews from "@/pages/UserReviews.tsx";
import AdminProjects from "@/pages/AdminProject.tsx";
import AdminProjectDetail from "@/pages/AdminProjectDetail.tsx";
import BlogsAdmin from "@/pages/BlogsAdmin.tsx";

import AdminNotifications from "@/pages/AdminNotifications.tsx";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <AuthProvider>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/projects" element={<Projects />} />
                                <Route path="/projects/:id" element={<ProjectDetail />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contacts" element={<Contacts />} />
                                <Route path="/comments" element={<Testimonials />} />
                                <Route path="/blog" element={<Blog />} />
                                <Route path="/blog/:id" element={<BlogPost />} />
                                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                <Route path="/terms-of-use" element={<TermsOfUse />} />
                                <Route path="/ready-houses" element={<ReadyHouses />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="*" element={<NotFound />} />

                                <Route
                                    path="/profile"
                                    element={
                                        <ProtectedRoute>
                                            <Profile />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/admin"
                                    element={
                                        <ProtectedRoute adminOnly>
                                            <AdminDashboard />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/admin/orders"
                                    element={
                                        <ProtectedRoute adminOnly>
                                            <Orders />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/admin/construction"
                                    element={
                                        <ProtectedRoute adminOnly>
                                            <PurchasedHouses />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/admin/house-questions"
                                    element={
                                        <ProtectedRoute adminOnly>
                                            <HouseQuestions />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/admin/user-questions"
                                    element={
                                        <ProtectedRoute adminOnly>
                                            <UserQuestions />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/admin/reviews"
                                    element={
                                        <ProtectedRoute>
                                            <UserReviews />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/admin/projects"
                                    element={
                                        <ProtectedRoute>
                                            <AdminProjects />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/admin/projects/:id"
                                    element={
                                        <ProtectedRoute>
                                            <AdminProjectDetail />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/admin/blogs"
                                    element={
                                        <ProtectedRoute>
                                            <BlogsAdmin />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/admin/notifications"
                                    element={
                                        <ProtectedRoute>
                                            <AdminNotifications />
                                        </ProtectedRoute>
                                    }
                                />

                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </AuthProvider>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default App;