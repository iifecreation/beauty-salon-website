"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      router.push('/money-smile/art/home');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await api.post("/admin/auth/login", {
        email,
        password,
      });

      const { accessToken, user } = response.data;

      // // Store accessToken in localStorage or memory (not HttpOnly cookie)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", user);

      toast.success("Login successful. Redirecting...");

      // // Redirect
      router.push("/money-smile/art/home");
    } catch (error: any) {
      const errorData = error?.response?.data?.error;

      const message =
        errorData?.password?._errors?.[0] ||
        errorData?.email?._errors?.[0] ||
        (typeof errorData === "string" ? errorData : null) ||
        "Unable to login at the moment! Try again.";

      toast.error(message)

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light tracking-[-2px] text-foreground mb-2">
            Beauty Kept Admin
          </h1>
          <p className="text-muted-foreground">
            Access your admin dashboard
          </p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-medium text-center">
              Sign In
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin} className='space-y-7'>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full h-12 text-base bg-warm-brown-700 hover:bg-warm-brown-700/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Beauty Kept Academy. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;