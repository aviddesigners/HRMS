import React from 'react';
import type { Project } from '../../types';
import { useHRMS } from '../../context/HRMSContext';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { CheckSquare, Square, Calendar, DollarSign, Clock, Users, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  const { toggleProjectTask } = useHRMS();

  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span>{project.title}</span>
          <Badge
            variant={
              project.status === 'Active'
                ? 'success'
                : project.status === 'Completed'
                ? 'primary'
                : 'error'
            }
          >
            {project.status}
          </Badge>
        </div>
      }
      subtitle={`Code: ${project.code} • Client: ${project.client}`}
      maxWidth="780px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Project Metrics Top Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--color-surface-muted)',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              Total Budget
            </span>
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              ₹{project.budget.toLocaleString('en-IN')}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              Spent to Date
            </span>
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>
              ₹{project.spent.toLocaleString('en-IN')}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              Deadline
            </span>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1E293B' }}>
              {project.deadline}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              Completion
            </span>
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#10B981' }}>
              {project.progress}%
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.375rem' }}>
            Scope & Objectives
          </h4>
          <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.6 }}>
            {project.description}
          </p>
        </div>

        {/* Assigned Team */}
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.75rem' }}>
            Project Team
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.375rem 0.75rem',
                backgroundColor: 'var(--color-primary-light)',
                border: '1px solid rgba(255, 91, 55, 0.2)',
                borderRadius: 'var(--radius-pill)'
              }}
            >
              <Avatar src={project.leader.avatar} name={project.leader.name} size="xs" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                Lead: {project.leader.name}
              </span>
            </div>

            {project.team.map((member) => (
              <div
                key={member.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.375rem 0.75rem',
                  backgroundColor: 'var(--color-surface-muted)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-pill)'
                }}
              >
                <Avatar src={member.avatar} name={member.name} size="xs" />
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#1E293B' }}>
                  {member.name} ({member.role})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sprint Tasks Checklist */}
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.75rem' }}>
            Deliverables & Tasks Checklist
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {project.tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleProjectTask(project.id, task.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: task.completed ? 'var(--color-surface-muted)' : 'var(--color-surface)',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {task.completed ? (
                    <CheckSquare size={18} color="var(--color-primary)" />
                  ) : (
                    <Square size={18} color="#94A3B8" />
                  )}
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: task.completed ? 400 : 600,
                      color: task.completed ? '#94A3B8' : '#1E293B',
                      textDecoration: task.completed ? 'line-through' : 'none'
                    }}
                  >
                    {task.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {task.assignee}
                  </span>
                  <Badge variant={task.priority === 'High' ? 'error' : 'neutral'}>
                    {task.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
