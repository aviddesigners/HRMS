import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User as UserIcon, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { UserRole } from '../../types';

export const AuthPage: React.FC<{ onAuthenticated?: () => void }> = ({ onAuthenticated }) => {
  const { login } = useAuth();
  const { showToast } = useToast();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('amit.kumar@aviddesigners.com');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    await login(email);
    setIsLoading(false);
    if (onAuthenticated) onAuthenticated();
  };

  const handleQuickDemoLogin = async (role: UserRole, demoEmail: string) => {
    setIsLoading(true);
    setEmail(demoEmail);
    await new Promise((r) => setTimeout(r, 400));
    await login(demoEmail, role);
    setIsLoading(false);
    if (onAuthenticated) onAuthenticated();
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast('Please enter your email to receive recovery instructions.', 'error');
      return;
    }
    showToast(`Password reset link dispatched to ${forgotEmail}`, 'success', 'Email Sent');
    setIsForgotModalOpen(false);
    setForgotEmail('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        backgroundColor: '#FFFFFF'
      }}
    >
      {/* Left Column: Visual Brand Illustration & Features */}
      <div
        style={{
          background: 'linear-gradient(135deg, #111827 0%, #1E293B 100%)',
          color: '#FFFFFF',
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,91,55,0.15) 0%, rgba(255,91,55,0) 70%)',
            top: '-100px',
            right: '-100px',
            pointerEvents: 'none'
          }}
        />

        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <img
            src="/logo.png"
            alt="Avi Designers"
            style={{
              height: '56px',
              maxWidth: '220px',
              objectFit: 'contain',
              background: '#FFFFFF',
              padding: '0.35rem 0.75rem',
              borderRadius: '12px'
            }}
          />
        </div>

        {/* Main Value Proposition */}
        <div style={{ margin: '3rem 0', maxWidth: '460px' }}>
          <span
            style={{
              background: 'rgba(255, 91, 55, 0.15)',
              color: '#FF8A65',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'inline-block',
              marginBottom: '1rem',
              border: '1px solid rgba(255, 91, 55, 0.3)'
            }}
          >
            Modern Workplace Intelligence
          </span>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              lineHeight: 1.25,
              marginBottom: '1rem',
              color: '#FFFFFF'
            }}
          >
            Empower your team. Streamline workforce operations.
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            Avi Designers HRMS integrates employee directories, interactive project tracking,
            CRM lead pipelines, payroll disbursements in ₹ (INR), and recruitment funnels in one unified ecosystem.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: '#E2E8F0' }}>
              <CheckCircle2 size={18} style={{ color: '#10B981', flexShrink: 0 }} />
              <span>Full Role-Based Access Control (RBAC) with 6 permission levels</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: '#E2E8F0' }}>
              <CheckCircle2 size={18} style={{ color: '#10B981', flexShrink: 0 }} />
              <span>Real-time Attendance Clock-in & Leave Approval workflows</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: '#E2E8F0' }}>
              <CheckCircle2 size={18} style={{ color: '#10B981', flexShrink: 0 }} />
              <span>Comprehensive financial reports with instant CSV & PDF export</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
          © 2026 Avi Designers Inc. All rights reserved. Strict enterprise confidentiality.
        </div>
      </div>

      {/* Right Column: Auth Forms & Quick Switcher */}
      <div
        style={{
          padding: '3rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '520px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {mode === 'login' ? 'Sign in to HRMS' : 'Create an Account'}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {mode === 'login'
              ? 'Access your Avi Designers organizational dashboard.'
              : 'Join Avi Designers internal management workspace.'}
          </p>
        </div>

        {/* Quick Demo Role Auto-Fill Bar */}
        <div
          style={{
            background: 'var(--color-surface-muted)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '0.875rem',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <ShieldCheck size={16} className="text-primary" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
              1-Click Demo Profiles
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => handleQuickDemoLogin('Super Admin', 'amit.kumar@aviddesigners.com')}
            >
              Super Admin
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => handleQuickDemoLogin('HR Manager', 'priya.sharma@aviddesigners.com')}
            >
              HR Manager
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => handleQuickDemoLogin('Project Manager', 'rajesh.m@aviddesigners.com')}
            >
              Project Mgr
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => handleQuickDemoLogin('Recruiter', 'vikram.s@aviddesigners.com')}
            >
              Recruiter
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => handleQuickDemoLogin('Employee', 'ananya.s@aviddesigners.com')}
            >
              Employee
            </button>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <div className="input-icon-wrapper">
                <UserIcon size={16} className="input-icon-left" />
                <input
                  type="text"
                  className="form-control has-icon-left"
                  placeholder="e.g. Amit Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              Work Email Address <span className="required">*</span>
            </label>
            <div className="input-icon-wrapper">
              <Mail size={16} className="input-icon-left" />
              <input
                type="email"
                className="form-control has-icon-left"
                placeholder="name@aviddesigners.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">
              <span>Password <span className="required">*</span></span>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="input-icon-wrapper">
              <Lock size={16} className="input-icon-left" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control has-icon-left has-icon-right"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="input-icon-right"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <label className="form-check">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                Keep me signed in on this device
              </span>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            style={{ width: '100%' }}
            iconRight={<ArrowRight size={16} />}
          >
            {mode === 'login' ? 'Sign In to Workspace' : 'Create Organization Account'}
          </Button>
        </form>

        {/* Toggle Mode */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer' }}
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer' }}
              >
                Sign in
              </button>
            </span>
          )}
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        title="Reset Your Password"
        subtitle="We will send password recovery instructions to your registered email"
      >
        <form onSubmit={handleForgotPassword}>
          <div className="form-group">
            <label className="form-label">
              Enter your work email address <span className="required">*</span>
            </label>
            <div className="input-icon-wrapper">
              <Mail size={16} className="input-icon-left" />
              <input
                type="email"
                className="form-control has-icon-left"
                placeholder="name@aviddesigners.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <Button type="button" variant="secondary" onClick={() => setIsForgotModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Send Reset Link
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
