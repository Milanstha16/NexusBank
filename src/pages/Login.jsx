import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Building2 } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { BankingInput } from "../components/banking/BankingInput";
import { BankingButton } from "../components/banking/BankingButton";
import { BankingCard } from "../components/banking/BankingCard";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate("/dashboard");
      } else {
        setErrors({ general: "Invalid email or password" });
      }
    } catch {
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-accent/80 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)]" />

      <BankingCard
        variant="elevated"
        padding="lg"
        className="relative w-full max-w-md backdrop-blur-xl bg-background/70 border border-white/20 shadow-2xl animate-fade-in hover:scale-[1.01] transition-transform duration-300"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-accent/90 flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-accent-foreground" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Sign in to NexusBank
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Secure access to your financial world
          </p>
        </div>

        {/* Error */}
        {errors.general && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 backdrop-blur border border-destructive/20 text-destructive text-sm animate-fade-in">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <BankingInput
            label="Email address"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
            icon={<Mail className="w-5 h-5" />}
          />

          {/* Password */}
          <div className="relative">
            <BankingInput
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={errors.password}
              icon={<Lock className="w-5 h-5" />}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[42px] text-muted-foreground hover:text-accent transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-input accent-accent"
              />
              <span className="text-muted-foreground">
                Keep me signed in
              </span>
            </label>

            <Link
              to="/forgot-password"
              className="text-accent hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <BankingButton
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full bg-accent hover:bg-accent/90 shadow-lg shadow-accent/30"
          >
            Sign in
          </BankingButton>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-accent hover:underline font-medium"
            >
              Create one
            </Link>
          </p>
        </div>
      </BankingCard>

      {/* Legal */}
      <p className="absolute bottom-6 text-center text-xs text-muted-foreground">
        By signing in, you agree to our{" "}
        <a href="#" className="hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default Login;
