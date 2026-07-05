import "./styles/index.css";
import type { ThemeComponents } from "@/features/theme/contract/components";
import { config } from "./config";
import Toaster from "@/components/ui/toaster";
import { PublicLayout } from "./layouts/public-layout";
import { AuthLayout } from "./layouts/auth-layout";
import { UserLayout } from "./layouts/user-layout";
import { HomePage, HomePageSkeleton } from "./pages/home";
import { PostsPage, PostsPageSkeleton } from "./pages/posts";
import { PostPage, PostPageSkeleton } from "./pages/post";
import { FriendLinksPage, FriendLinksPageSkeleton } from "./pages/friend-links";
import { SearchPage } from "./pages/search";
import { SubmitFriendLinkPage } from "./pages/submit-friend-link";
import { LoginPage } from "./pages/auth/login";
import { RegisterPage } from "./pages/auth/register";
import { ForgotPasswordPage } from "./pages/auth/forgot-password";
import { ResetPasswordPage } from "./pages/auth/reset-password";
import { VerifyEmailPage } from "./pages/auth/verify-email";
import { ProfilePage } from "./pages/user/profile";

export default {
  config,
  getDocumentStyle: () => undefined,
  HomePage, HomePageSkeleton,
  PostsPage, PostsPageSkeleton,
  PostPage, PostPageSkeleton,
  PublicLayout, AuthLayout, UserLayout,
  FriendLinksPage, FriendLinksPageSkeleton,
  SearchPage, SubmitFriendLinkPage,
  LoginPage, RegisterPage, ForgotPasswordPage,
  ResetPasswordPage, VerifyEmailPage,
  ProfilePage,
  Toaster,
} satisfies ThemeComponents;
