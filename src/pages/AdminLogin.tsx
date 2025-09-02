import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Loader2, Mail, Lock, Shield, AlertCircle, ArrowLeft, LogOut } from "lucide-react";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Handle successful authentication
        if (event === 'SIGNED_IN' && session?.user) {
          // Use setTimeout to prevent deadlock
          setTimeout(() => {
            checkAdminRoleAndRedirect(session.user.id);
          }, 0);
        }
        
        // Handle sign out
        if (event === 'SIGNED_OUT') {
          setUserRole(null);
          navigate('/');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // If already logged in, check role
      if (session?.user) {
        checkAdminRoleAndRedirect(session.user.id);
      } else {
        setCheckingAuth(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRoleAndRedirect = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, email')
        .eq('id', userId)
        .single();

      if (!error && profile) {
        setUserRole(profile.role);
        
        // Only redirect if user is admin or superadmin
        if (profile.role === 'superadmin') {
          toast.success(`Welcome back, Superadmin!`);
          navigate('/superadmin');
        } else if (profile.role === 'admin') {
          toast.success(`Welcome back, Admin!`);
          navigate('/admin');
        } else {
          // Non-admin users - show warning but stay on page
          toast.error("Access denied. Admin privileges required.");
        }
      } else {
        // No profile found
        toast.error("Profile not found. Please contact support.");
        setUserRole(null);
      }
    } catch (error) {
      console.error('Error checking admin role:', error);
      toast.error("Error verifying admin access.");
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, attempt to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          toast.error("Invalid admin credentials. Please check your email and password.");
        } else if (error.message.includes('Email not confirmed')) {
          toast.error("Please confirm your email before logging in.");
        } else {
          toast.error(error.message);
        }
        setLoading(false);
        return;
      }

      if (data.user) {
        // Check if user has admin role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError || !profile) {
          toast.error("Unable to verify admin privileges.");
          await supabase.auth.signOut();
          setLoading(false);
          return;
        }

        // Verify admin or superadmin role
        if (profile.role !== 'admin' && profile.role !== 'superadmin') {
          toast.error("Access denied. This portal is for administrators only.");
          await supabase.auth.signOut();
          setLoading(false);
          return;
        }

        // Success - the redirect will be handled by onAuthStateChange
        toast.success("Admin authentication successful!");
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error('Admin login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Signed out successfully");
        setUserRole(null);
        navigate('/');
      }
    } catch (error) {
      toast.error("An error occurred while signing out");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your admin email address first");
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password reset instructions sent to your email!");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Loading state while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If user is logged in but not an admin
  if (session && user && userRole && userRole !== 'admin' && userRole !== 'superadmin') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-secondary/20">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <AlertCircle className="h-6 w-6 text-destructive" />
              Access Denied
            </CardTitle>
            <CardDescription className="text-center">
              This area is restricted to administrators only
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-destructive/50 bg-destructive/10">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your account ({user.email}) does not have administrator privileges. 
                If you believe this is an error, please contact the system administrator.
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Button 
                onClick={() => navigate('/')} 
                className="w-full"
                variant="default"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go to Home
              </Button>
              <Button 
                onClick={handleSignOut} 
                className="w-full"
                variant="outline"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing out...
                  </>
                ) : (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If user is already logged in as admin
  if (session && user && (userRole === 'admin' || userRole === 'superadmin')) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-secondary/20">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Already Authenticated
            </CardTitle>
            <CardDescription className="text-center">
              You are logged in as {userRole === 'superadmin' ? 'Superadmin' : 'Admin'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-primary/50 bg-primary/10">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Logged in as: <strong>{user.email}</strong>
                <br />
                Role: <strong className="capitalize">{userRole}</strong>
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Button 
                onClick={() => navigate(userRole === 'superadmin' ? '/superadmin' : '/admin')} 
                className="w-full"
                variant="default"
              >
                <Shield className="mr-2 h-4 w-4" />
                Go to {userRole === 'superadmin' ? 'Superadmin' : 'Admin'} Dashboard
              </Button>
              <Button 
                onClick={() => navigate('/')} 
                className="w-full"
                variant="outline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go to Home
              </Button>
              <Button 
                onClick={handleSignOut} 
                className="w-full"
                variant="destructive"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing out...
                  </>
                ) : (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin Login Form
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-secondary/20">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Admin Portal</CardTitle>
          <CardDescription className="text-center">
            Secure access for administrators only
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="pl-10"
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="pl-10"
                  autoComplete="current-password"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-sm"
                onClick={handleForgotPassword}
                disabled={loading}
              >
                Forgot password?
              </Button>
            </div>

            <Button type="submit" className="w-full" disabled={loading} size="lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Login
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 pt-4 border-t">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Not an admin?
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link 
                  to="/login" 
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full" size="sm">
                    User Login
                  </Button>
                </Link>
                <Link 
                  to="/" 
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full" size="sm">
                    <ArrowLeft className="mr-2 h-3 w-3" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Alert className="border-muted">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                This is a secure area. All login attempts are monitored and logged. 
                Unauthorized access attempts will be reported.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}