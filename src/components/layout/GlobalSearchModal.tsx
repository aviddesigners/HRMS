import React, { useState, useEffect } from 'react';
import { Search, Building2, FolderKanban, Users2, Receipt, UserCheck, ArrowRight, X } from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    setActiveModule,
    employees,
    projects,
    leads,
    invoices,
    jobOpenings
  } = useHRMS();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredEmployees = q
    ? employees.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.department.toLowerCase().includes(q) ||
          e.designation.toLowerCase().includes(q) ||
          e.empId.toLowerCase().includes(q)
      )
    : employees.slice(0, 3);

  const filteredProjects = q
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q)
      )
    : projects.slice(0, 3);

  const filteredLeads = q
    ? leads.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q)
      )
    : leads.slice(0, 2);

  const filteredInvoices = q
    ? invoices.filter(
        (i) =>
          i.invoiceNumber.toLowerCase().includes(q) ||
          i.clientName.toLowerCase().includes(q)
      )
    : invoices.slice(0, 2);

  const filteredJobs = q
    ? jobOpenings.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q)
      )
    : jobOpenings.slice(0, 2);

  const handleSelect = (module: string) => {
    setActiveModule(module);
    setIsSearchModalOpen(false);
    setQuery('');
  };

  const totalResults =
    filteredEmployees.length +
    filteredProjects.length +
    filteredLeads.length +
    filteredInvoices.length +
    filteredJobs.length;

  return (
    <div
      className="modal-overlay"
      style={{ zIndex: 1200, alignItems: 'flex-start', paddingTop: '10vh' }}
      onClick={() => setIsSearchModalOpen(false)}
    >
      <div
        className="modal-content"
        style={{ maxWidth: '640px', borderRadius: 'var(--radius-xl)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <Search size={20} className="text-primary" />
          <input
            type="text"
            placeholder="Search employees, projects, CRM deals, invoices, jobs... (Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              fontFamily: 'inherit',
              color: 'var(--color-text-primary)'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
            >
              <X size={16} />
            </button>
          )}
          <kbd
            style={{
              padding: '0.2rem 0.4rem',
              background: '#F1F5F9',
              borderRadius: '4px',
              fontSize: '0.6875rem',
              color: '#64748B'
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '440px', overflowY: 'auto', padding: '0.75rem' }}>
          {totalResults === 0 ? (
            <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: '#64748B' }}>
              <p style={{ fontWeight: 600, color: '#1E293B' }}>No results found for "{query}"</p>
              <p style={{ fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                Try searching for an employee name, project title, or invoice code.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Employees Section */}
              {filteredEmployees.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.5rem'
                    }}
                  >
                    Employees
                  </div>
                  {filteredEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      onClick={() => handleSelect('HRM')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        transition: 'background-color 150ms'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Avatar src={emp.avatar} name={emp.name} size="sm" />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1E293B' }}>
                            {emp.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            {emp.designation} • {emp.department} ({emp.empId})
                          </div>
                        </div>
                      </div>
                      <Badge variant="primary">HRM</Badge>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects Section */}
              {filteredProjects.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.5rem'
                    }}
                  >
                    Projects
                  </div>
                  {filteredProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelect('Projects')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: '8px',
                            background: '#EFF6FF',
                            color: '#3B82F6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <FolderKanban size={16} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1E293B' }}>
                            {p.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            {p.client} • {p.code} • {p.progress}% done
                          </div>
                        </div>
                      </div>
                      <Badge variant="info">{p.status}</Badge>
                    </div>
                  ))}
                </div>
              )}

              {/* Leads Section */}
              {filteredLeads.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.5rem'
                    }}
                  >
                    CRM Deals
                  </div>
                  {filteredLeads.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => handleSelect('CRM')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: '8px',
                            background: '#F5F3FF',
                            color: '#8B5CF6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Users2 size={16} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1E293B' }}>
                            {l.company}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            {l.name} • ${l.dealValue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <Badge variant="purple">{l.stage}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div
          style={{
            padding: '0.75rem 1.25rem',
            background: '#F8FAFC',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: '#64748B'
          }}
        >
          <span>Select any item to jump directly to its module</span>
          <span>Avid Designers Search</span>
        </div>
      </div>
    </div>
  );
};
