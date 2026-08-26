import React, { useState } from 'react';
import {
  Users2,
  Plus,
  TrendingUp,
  Award,
  Grid,
  List,
  LayoutGrid,
  Phone,
  MessageSquare,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  Download,
  Calendar,
  CheckCircle2,
  CheckCircle,
  Clock,
  ArrowLeft,
  Mail,
  MapPin,
  Globe,
  Share2,
  FileText,
  FolderKanban,
  CheckSquare,
  Square,
  Lock,
  Star,
  Receipt,
  Edit2,
  Trash2,
  Send,
  Paperclip,
  RotateCw,
  Building2,
  UserCheck,
  UserPlus,
  Activity,
  Briefcase,
  Copy,
  Check,
  Search,
  Filter,
  BarChart2,
  ThumbsUp,
  Video
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import { AddLeadModal } from './AddLeadModal';

export const CRMPage: React.FC = () => {
  const { crmTab, setCrmTab } = useHRMS();
  const { showToast } = useToast();

  const crmSection = crmTab || 'contacts';
  const setCrmSection = setCrmTab;

  // Selected Detail Views
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<any | null>(null);

  // Modals
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [isAddDealModalOpen, setIsAddDealModalOpen] = useState(false);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [isAddPipelineOpen, setIsAddPipelineOpen] = useState(false);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeFeedTab, setActiveFeedTab] = useState<'activities' | 'notes' | 'calls' | 'files' | 'email'>('activities');

  /* ------------------------------------------------------------- */
  /* 12 CONTACTS DATASET                                           */
  /* ------------------------------------------------------------- */
  const contactCards = [
    {
      id: 'CNT-01',
      name: 'Darlee Robertson',
      role: 'Facility Manager',
      company: 'BrightWave Innovations',
      companyUrl: 'bwi.example.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      avatarBorder: '#0284C7',
      email: 'darlee@example.com',
      phone: '(163) 2459 315',
      location: 'Germany',
      rating: 4.2,
      gender: 'Male',
      dob: '24th July 2000',
      address: '1861 Bayonne Ave, Manchester, NJ, 08759',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Paid Campaign',
      tags: ['Collab', 'Rated']
    },
    {
      id: 'CNT-02',
      name: 'Sharon Roy',
      role: 'Installer',
      company: 'Stellar Dynamics',
      companyUrl: 'stellardynamics.in',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      avatarBorder: '#FF7A00',
      email: 'sharon@example.com',
      phone: '(146) 1249 296',
      location: 'USA',
      rating: 5.0,
      gender: 'Female',
      dob: '15th May 1996',
      address: '42 Wallaby Way, Sydney / New York',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Direct Lead',
      tags: ['Collab', 'VIP']
    },
    {
      id: 'CNT-03',
      name: 'Vaughan Lewis',
      role: 'Senior Manager',
      company: 'Quantum Nexus',
      companyUrl: 'quantumnexus.in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      avatarBorder: '#B45309',
      email: 'vaughan@example.com',
      phone: '(135) 3489 516',
      location: 'Canada',
      rating: 3.5,
      gender: 'Male',
      dob: '18th Nov 1992',
      address: '100 King St West, Toronto, Canada',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Google',
      tags: ['Enterprise']
    },
    {
      id: 'CNT-04',
      name: 'Jessica Louise',
      role: 'Test Engineer',
      company: 'EcoVision Enterprises',
      companyUrl: 'ecovision.in',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      avatarBorder: '#EC4899',
      email: 'jessica@example.com',
      phone: '(158) 3459 596',
      location: 'India',
      rating: 4.5,
      gender: 'Female',
      dob: '05th Jan 1998',
      address: 'Hitech City, Hyderabad, India',
      language: 'English',
      currency: '₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Organic',
      tags: ['Collab', 'Rated']
    },
    {
      id: 'CNT-05',
      name: 'Carol Thomas',
      role: 'UI/UX Designer',
      company: 'Aurora Technologies',
      companyUrl: 'auroratech.in',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      avatarBorder: '#FF7A00',
      email: 'carol@example.com',
      phone: '(196) 4862 196',
      location: 'China',
      rating: 4.7,
      gender: 'Male',
      dob: '12th Aug 1995',
      address: 'Pudong New Area, Shanghai',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Paid Campaign',
      tags: ['Collab']
    },
    {
      id: 'CNT-06',
      name: 'Dawn Mercha',
      role: 'UI/UX Designer',
      company: 'BlueSky Ventures',
      companyUrl: 'bluesky.in',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      avatarBorder: '#EC4899',
      email: 'dawn@example.com',
      phone: '(163) 6498 256',
      location: 'Japan',
      rating: 5.0,
      gender: 'Female',
      dob: '30th Dec 1996',
      address: 'Shinjuku, Tokyo, Japan',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Referral',
      tags: ['Rated']
    },
    {
      id: 'CNT-07',
      name: 'Rachel Hampton',
      role: 'Software Developer',
      company: 'TerraFusion Energy',
      companyUrl: 'terrafusion.in',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      avatarBorder: '#EF4444',
      email: 'rachel@example.com',
      phone: '(154) 6481 075',
      location: 'Indonesia',
      rating: 3.1,
      gender: 'Female',
      dob: '14th Apr 1997',
      address: 'Jakarta Central, Indonesia',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Google',
      tags: ['Collab']
    },
    {
      id: 'CNT-08',
      name: 'Jonelle Curtiss',
      role: 'Supervisor',
      company: 'UrbanPulse Design',
      companyUrl: 'urbanpulse.in',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      avatarBorder: '#8B5CF6',
      email: 'jonella@example.com',
      phone: '(184) 6348 195',
      location: 'Cuba',
      rating: 5.0,
      gender: 'Female',
      dob: '02nd Feb 1994',
      address: 'Old Havana, Cuba',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Direct Lead',
      tags: ['Rated']
    },
    {
      id: 'CNT-09',
      name: 'Jonathan Smith',
      role: 'Team Lead Dev',
      company: 'Nimbus Networks',
      companyUrl: 'nimbusnet.in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      avatarBorder: '#0284C7',
      email: 'jonathan@example.com',
      phone: '(175) 2496 125',
      location: 'Israel',
      rating: 2.7,
      gender: 'Male',
      dob: '21st Aug 1993',
      address: 'Rothschild Blvd, Tel Aviv',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Paid Campaign',
      tags: ['Collab']
    },
    {
      id: 'CNT-10',
      name: 'Patricia Carter',
      role: 'Team Lead Dev',
      company: 'Epicurean Delights',
      companyUrl: 'epicurean.in',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      avatarBorder: '#EF4444',
      email: 'patricia@example.com',
      phone: '(132) 3145 977',
      location: 'Colombia',
      rating: 3.0,
      gender: 'Female',
      dob: '10th Mar 1995',
      address: 'El Poblado, Medellin, Colombia',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Google',
      tags: ['Collab', 'Rated']
    },
    {
      id: 'CNT-11',
      name: 'Jeffrey Jarrett',
      role: 'Team Lead Dev',
      company: 'AlphaTech Solutions',
      companyUrl: 'alphatech.in',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      avatarBorder: '#FF7A00',
      email: 'jeffrey@example.com',
      phone: '(167) 4526 5496',
      location: 'Iran',
      rating: 4.6,
      gender: 'Male',
      dob: '15th Jul 1991',
      address: 'Tehran Tech Park',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Referral',
      tags: ['Enterprise']
    },
    {
      id: 'CNT-12',
      name: 'Gloria Rubio',
      role: 'Team Lead Dev',
      company: 'Phoenix Solutions',
      companyUrl: 'phoenixsol.in',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      avatarBorder: '#10B981',
      email: 'gloria@example.com',
      phone: '(134) 7589 6348',
      location: 'Brazil',
      rating: 4.1,
      gender: 'Female',
      dob: '28th Sep 1996',
      address: 'Paulista Ave, Sao Paulo, Brazil',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Direct Lead',
      tags: ['Collab', 'Rated']
    }
  ];

  /* ------------------------------------------------------------- */
  /* 12 COMPANIES DATASET                                          */
  /* ------------------------------------------------------------- */
  const companyCards = [
    {
      id: 'CMP-01',
      name: 'BrightWave Innovations',
      logoIcon: '⬡',
      logoBg: '#8B5CF6',
      logoColor: '#FFFFFF',
      email: 'darlee@example.com',
      phone: '(163) 2459 315',
      location: 'Germany',
      rating: 4.2,
      address: '1861 Bayonne Ave, Manchester, NJ, 08759',
      createdOn: '24 July 2024, 11:45 pm',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Paid Campaign',
      tags: ['Collab', 'Rated'],
      teamAvatars: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      ],
      extraCount: '+1',
      contacts: [
        { name: 'Sharon Roy', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
        { name: 'Vaughan Lewis', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
      ]
    },
    {
      id: 'CMP-02',
      name: 'Stellar Dynamics',
      logoIcon: '⚡',
      logoBg: '#10B981',
      logoColor: '#FFFFFF',
      email: 'sharon@example.com',
      phone: '(146) 1249 296',
      location: 'USA',
      rating: 5.0,
      address: 'Bandra Kurla Complex, Mumbai 400051',
      createdOn: '18 June 2024, 10:30 am',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Direct Lead',
      tags: ['Collab', 'VIP'],
      teamAvatars: [
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
      ],
      extraCount: '+1',
      contacts: [
        { name: 'Sharon Roy', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
        { name: 'Amit Kumar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' }
      ]
    },
    {
      id: 'CMP-03',
      name: 'Quantum Nexus',
      logoIcon: '●●',
      logoBg: '#2563EB',
      logoColor: '#FFFFFF',
      email: 'vaughan@example.com',
      phone: '(135) 3489 516',
      location: 'Canada',
      rating: 3.5,
      address: 'Cyber City, Gurugram, Haryana 122002',
      createdOn: '12 May 2024, 04:15 pm',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Google',
      tags: ['Enterprise'],
      teamAvatars: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
      ],
      extraCount: '+1',
      contacts: [
        { name: 'Vaughan Lewis', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
      ]
    },
    {
      id: 'CMP-04',
      name: 'EcoVision Enterprises',
      logoIcon: '◈',
      logoBg: '#0284C7',
      logoColor: '#FFFFFF',
      email: 'jessica@example.com',
      phone: '(158) 3459 596',
      location: 'India',
      rating: 4.5,
      address: 'Hitech City, Madhapur, Hyderabad 500081',
      createdOn: '05 April 2024, 09:00 am',
      language: 'English',
      currency: '₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Organic',
      tags: ['Collab', 'Rated'],
      teamAvatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      ],
      extraCount: '+1',
      contacts: [
        { name: 'Jessica Louise', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' }
      ]
    },
    {
      id: 'CMP-05',
      name: 'Aurora Technologies',
      logoIcon: '🌐',
      logoBg: '#7C3AED',
      logoColor: '#FFFFFF',
      email: 'carol@example.com',
      phone: '(196) 4862 196',
      location: 'China',
      rating: 4.7,
      address: 'Koregaon Park, Pune 411001',
      createdOn: '20 March 2024, 02:40 pm',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Paid Campaign',
      tags: ['Collab'],
      teamAvatars: [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
      ],
      extraCount: '+1',
      contacts: [
        { name: 'Carol Thomas', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' }
      ]
    },
    {
      id: 'CMP-06',
      name: 'BlueSky Ventures',
      logoIcon: '⚡',
      logoBg: '#3B82F6',
      logoColor: '#FFFFFF',
      email: 'dawn@example.com',
      phone: '(163) 6498 256',
      location: 'Japan',
      rating: 5.0,
      address: 'OMR Road, Chennai 600097',
      createdOn: '14 Feb 2024, 11:20 am',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Referral',
      tags: ['Rated'],
      teamAvatars: [
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      ],
      extraCount: '+1',
      contacts: [
        { name: 'Dawn Mercha', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' }
      ]
    },
    {
      id: 'CMP-07',
      name: 'TerraFusion Energy',
      logoIcon: '⚙',
      logoBg: '#EA580C',
      logoColor: '#FFFFFF',
      email: 'rachel@example.com',
      phone: '(154) 6481 075',
      location: 'Indonesia',
      rating: 3.5,
      address: 'Salt Lake Sector V, Kolkata 700091',
      createdOn: '08 Jan 2024, 05:30 pm',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Google',
      tags: ['Collab'],
      teamAvatars: [
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
      ],
      extraCount: '+1',
      contacts: [
        { name: 'Rachel Hampton', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80' }
      ]
    },
    {
      id: 'CMP-08',
      name: 'UrbanPulse Design',
      logoIcon: '🎯',
      logoBg: '#0284C7',
      logoColor: '#FFFFFF',
      email: 'jonella@example.com',
      phone: '(184) 6348 195',
      location: 'Cuba',
      rating: 4.5,
      address: 'MG Road, Kochi 682016',
      createdOn: '25 Dec 2023, 10:15 am',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Direct Lead',
      tags: ['Rated'],
      teamAvatars: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
      ],
      extraCount: '+1',
      contacts: [
        { name: 'Jonelle Curtiss', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
      ]
    },
    {
      id: 'CMP-09',
      name: 'Nimbus Networks',
      logoIcon: '▰▰',
      logoBg: '#10B981',
      logoColor: '#FFFFFF',
      email: 'jonathan@example.com',
      phone: '(175) 2496 125',
      location: 'Israel',
      rating: 2.7,
      address: 'Connaught Place, New Delhi 110001',
      createdOn: '18 Nov 2023, 03:00 pm',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Paid Campaign',
      tags: ['Collab'],
      teamAvatars: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
      ],
      extraCount: '+1',
      contacts: [
        { name: 'Jonathan Smith', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
      ]
    },
    {
      id: 'CMP-10',
      name: 'Epicurean Delights',
      logoIcon: 'C',
      logoBg: '#3B82F6',
      logoColor: '#FFFFFF',
      email: 'patricia@example.com',
      phone: '(132) 3145 977',
      location: 'Colombia',
      rating: 3.0,
      address: 'Civil Lines, Jaipur 302006',
      createdOn: '10 Oct 2023, 11:00 am',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Google',
      tags: ['Collab', 'Rated'],
      teamAvatars: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
      ],
      extraCount: '+1',
      contacts: [
        { name: 'Patricia Carter', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' }
      ]
    },
    {
      id: 'CMP-11',
      name: 'Hermann Groups',
      logoIcon: '❖',
      logoBg: '#EC4899',
      logoColor: '#FFFFFF',
      email: 'jeffrey@example.com',
      phone: '(167) 4526 5496',
      location: 'Iran',
      rating: 4.6,
      address: 'Satellite Road, Ahmedabad 380015',
      createdOn: '04 Sep 2023, 04:30 pm',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Referral',
      tags: ['Enterprise'],
      teamAvatars: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
      ],
      extraCount: '+1',
      contacts: [
        { name: 'Jeffrey Jarrett', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
      ]
    },
    {
      id: 'CMP-12',
      name: 'Beacon Softwares',
      logoIcon: '❀',
      logoBg: '#F59E0B',
      logoColor: '#FFFFFF',
      email: 'gloria@example.com',
      phone: '(134) 7589 6348',
      location: 'Brazil',
      rating: 4.1,
      address: 'Lalbagh Road, Lucknow 226001',
      createdOn: '15 Aug 2023, 01:20 pm',
      language: 'English',
      currency: 'United States dollar / ₹ INR',
      lastModified: '27/09/24, 11:45 pm',
      source: 'Direct Lead',
      tags: ['Collab', 'Rated'],
      teamAvatars: [
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
      ],
      extraCount: '+1',
      contacts: [
        { name: 'Gloria Rubio', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' }
      ]
    }
  ];

  /* ------------------------------------------------------------- */
  /* DEALS KANBAN DATASET                                          */
  /* ------------------------------------------------------------- */
  const dealsKanbanData = {
    new: {
      title: 'New',
      color: '#10B981',
      summary: '45 Leads - ₹15,44,540',
      deals: [
        {
          id: 'DL-01',
          code: 'HT',
          title: 'Howell, Tremblay and Rath',
          projectTitle: 'Website Redesign',
          value: '₹3,50,000',
          email: 'darlee@gmail.com',
          phone: '(163) 2459 315',
          location: 'Newyork, United States',
          ownerName: 'Darlee Robertson',
          ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          probability: '85%',
          createdDate: '10 Jan 2024',
          topBorder: '#8B5CF6'
        },
        {
          id: 'DL-02',
          code: 'RJ',
          title: 'Robert, John and Carlos',
          projectTitle: 'Mobile Application',
          value: '₹2,10,000',
          email: 'sheron@gmail.com',
          phone: '(146) 1249 296',
          location: 'Exeter, United States',
          ownerName: 'Sharon Roy',
          ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          probability: '15%',
          createdDate: '12 Jan 2024',
          topBorder: '#F59E0B'
        },
        {
          id: 'DL-03',
          code: 'WS',
          title: 'Wendy, Star and David',
          projectTitle: 'Cloud ERP Migration',
          value: '₹4,22,000',
          email: 'vaughan@gmail.com',
          phone: '(135) 3489 516',
          location: 'Phoenix, United States',
          ownerName: 'Vaughan Lewis',
          ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          probability: '95%',
          createdDate: '10 Jan 2024',
          topBorder: '#10B981'
        }
      ]
    },
    prospect: {
      title: 'Prospect',
      color: '#0284C7',
      summary: '30 Leads - ₹19,84,938',
      deals: [
        {
          id: 'DL-04',
          code: 'BR',
          title: 'Byron, Roman and Bailey',
          projectTitle: 'Enterprise CRM Suite',
          value: '₹2,45,000',
          email: 'darlee@gmail.com',
          phone: '(163) 2459 315',
          location: 'Newyork, United States',
          ownerName: 'Darlee Robertson',
          ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          probability: '85%',
          createdDate: '10 Jan 2024',
          topBorder: '#8B5CF6'
        },
        {
          id: 'DL-05',
          code: 'RJ',
          title: 'Robert, John and Carlos',
          projectTitle: 'AI Analytics Engine',
          value: '₹2,10,000',
          email: 'sheron@gmail.com',
          phone: '(146) 1249 296',
          location: 'Exeter, United States',
          ownerName: 'Sharon Roy',
          ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          probability: '15%',
          createdDate: '12 Jan 2024',
          topBorder: '#F59E0B'
        },
        {
          id: 'DL-06',
          code: 'WS',
          title: 'Wendy, Star and David',
          projectTitle: 'DevOps Automation',
          value: '₹4,22,000',
          email: 'vaughan@gmail.com',
          phone: '(135) 3489 516',
          location: 'Phoenix, United States',
          ownerName: 'Vaughan Lewis',
          ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          probability: '95%',
          createdDate: '10 Jan 2024',
          topBorder: '#10B981'
        }
      ]
    },
    proposal: {
      title: 'Proposal',
      color: '#EAB308',
      summary: '25 Leads - ₹10,36,390',
      deals: [
        {
          id: 'DL-07',
          code: 'BR',
          title: 'Byron, Roman and Bailey',
          projectTitle: 'Payment Gateway Integration',
          value: '₹2,45,000',
          email: 'darlee@gmail.com',
          phone: '(163) 2459 315',
          location: 'Newyork, United States',
          ownerName: 'Darlee Robertson',
          ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          probability: '85%',
          createdDate: '10 Jan 2024',
          topBorder: '#8B5CF6'
        },
        {
          id: 'DL-08',
          code: 'RJ',
          title: 'Robert, John and Carlos',
          projectTitle: 'Hospital Admin Portal',
          value: '₹2,10,000',
          email: 'sheron@gmail.com',
          phone: '(146) 1249 296',
          location: 'Exeter, United States',
          ownerName: 'Sharon Roy',
          ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          probability: '15%',
          createdDate: '12 Jan 2024',
          topBorder: '#F59E0B'
        },
        {
          id: 'DL-09',
          code: 'WS',
          title: 'Wendy, Star and David',
          projectTitle: 'Microservices Architecture',
          value: '₹4,22,000',
          email: 'vaughan@gmail.com',
          phone: '(135) 3489 516',
          location: 'Phoenix, United States',
          ownerName: 'Vaughan Lewis',
          ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          probability: '95%',
          createdDate: '10 Jan 2024',
          topBorder: '#10B981'
        }
      ]
    },
    won: {
      title: 'Won',
      color: '#EC4899',
      summary: '50 Leads - ₹18,82,450',
      deals: [
        {
          id: 'DL-10',
          code: 'BR',
          title: 'Byron, Roman and Bailey',
          projectTitle: 'Brand Identity Design',
          value: '₹2,45,000',
          email: 'darlee@gmail.com',
          phone: '(163) 2459 315',
          location: 'Newyork, United States',
          ownerName: 'Darlee Robertson',
          ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          probability: '85%',
          createdDate: '10 Jan 2024',
          topBorder: '#8B5CF6'
        },
        {
          id: 'DL-11',
          code: 'RJ',
          title: 'Robert, John and Carlos',
          projectTitle: 'E-Commerce Platform',
          value: '₹2,10,000',
          email: 'sheron@gmail.com',
          phone: '(146) 1249 296',
          location: 'Exeter, United States',
          ownerName: 'Sharon Roy',
          ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          probability: '15%',
          createdDate: '12 Jan 2024',
          topBorder: '#F59E0B'
        },
        {
          id: 'DL-12',
          code: 'WS',
          title: 'Wendy, Star and David',
          projectTitle: 'Security Audit & Compliance',
          value: '₹4,22,000',
          email: 'vaughan@gmail.com',
          phone: '(135) 3489 516',
          location: 'Phoenix, United States',
          ownerName: 'Vaughan Lewis',
          ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          probability: '95%',
          createdDate: '10 Jan 2024',
          topBorder: '#10B981'
        }
      ]
    }
  };

  // 10 Activity Items
  const [activityList, setActivityList] = useState([
    { id: 'ACT-01', title: 'We scheduled a meeting for next week', type: 'Meeting', typeColor: '#EC4899', typeBg: '#FDF2F8', dueDate: '16/01/2024', owner: 'Hendry', createdDate: '14/01/2024' },
    { id: 'ACT-02', title: 'Had conversation with Fred regarding task', type: 'Calls', typeColor: '#8B5CF6', typeBg: '#F5F3FF', dueDate: '24/01/2024', owner: 'Guilory', createdDate: '21/01/2024' },
    { id: 'ACT-03', title: 'Analysing latest time estimation for new project', type: 'Tasks', typeColor: '#0284C7', typeBg: '#EFF6FF', dueDate: '23/02/2024', owner: 'Jami', createdDate: '20/02/2024' },
    { id: 'ACT-04', title: 'Store and manage contact data', type: 'Email', typeColor: '#F59E0B', typeBg: '#FEF3C7', dueDate: '18/03/2024', owner: 'Theresa', createdDate: '15/03/2024' },
    { id: 'ACT-05', title: 'Call John and discuss about project', type: 'Calls', typeColor: '#8B5CF6', typeBg: '#F5F3FF', dueDate: '14/04/2024', owner: 'Smith', createdDate: '12/04/2024' },
    { id: 'ACT-06', title: 'Will have a meeting before project start', type: 'Meeting', typeColor: '#EC4899', typeBg: '#FDF2F8', dueDate: '22/05/2024', owner: 'Martin', createdDate: '20/05/2024' },
    { id: 'ACT-07', title: 'Built landing pages', type: 'Email', typeColor: '#F59E0B', typeBg: '#FEF3C7', dueDate: '08/07/2024', owner: 'Newell', createdDate: '06/07/2024' },
    { id: 'ACT-08', title: 'Discussed budget proposal with Edwin', type: 'Calls', typeColor: '#8B5CF6', typeBg: '#F5F3FF', dueDate: '05/09/2024', owner: 'Janet', createdDate: '02/09/2024' },
    { id: 'ACT-09', title: 'Attach final proposal for upcoming project', type: 'Tasks', typeColor: '#0284C7', typeBg: '#EFF6FF', dueDate: '18/11/2024', owner: 'Craig', createdDate: '15/11/2024' },
    { id: 'ACT-10', title: 'Regarding latest updates in project', type: 'Meeting', typeColor: '#EC4899', typeBg: '#FDF2F8', dueDate: '12/12/2024', owner: 'Daniel', createdDate: '10/12/2024' }
  ]);

  // 10 Pipeline Items
  const [pipelineList, setPipelineList] = useState([
    { id: 'PIP-01', name: 'Sales', value: '₹4,50,000', dealsCount: 315, stage: 'Won', stageColor: '#10B981', createdDate: '14/01/2024', status: 'Active' },
    { id: 'PIP-02', name: 'Marketing', value: '₹3,15,000', dealsCount: 447, stage: 'In Pipeline', stageColor: '#8B5CF6', createdDate: '21/01/2024', status: 'Active' },
    { id: 'PIP-03', name: 'Calls', value: '₹8,40,000', dealsCount: 654, stage: 'Won', stageColor: '#10B981', createdDate: '20/02/2024', status: 'Active' },
    { id: 'PIP-04', name: 'Email', value: '₹6,10,000', dealsCount: 545, stage: 'Conversation', stageColor: '#3B82F6', createdDate: '15/03/2024', status: 'Active' },
    { id: 'PIP-05', name: 'Chats', value: '₹4,70,000', dealsCount: 787, stage: 'Won', stageColor: '#10B981', createdDate: '12/04/2024', status: 'Active' },
    { id: 'PIP-06', name: 'Operational', value: '₹5,50,000', dealsCount: 142, stage: 'Follow Up', stageColor: '#F59E0B', createdDate: '20/05/2024', status: 'Active' },
    { id: 'PIP-07', name: 'Collaborative', value: '₹5,00,000', dealsCount: 315, stage: 'Won', stageColor: '#10B981', createdDate: '06/07/2024', status: 'Active' },
    { id: 'PIP-08', name: 'Differentiate', value: '₹4,50,000', dealsCount: 478, stage: 'Schedule service', stageColor: '#EC4899', createdDate: '02/09/2024', status: 'Inactive' },
    { id: 'PIP-09', name: 'Interact', value: '₹6,20,000', dealsCount: 664, stage: 'Won', stageColor: '#10B981', createdDate: '15/11/2024', status: 'Active' },
    { id: 'PIP-10', name: 'Identify', value: '₹7,40,000', dealsCount: 128, stage: 'Won', stageColor: '#EF4444', createdDate: '10/12/2024', status: 'Active' }
  ]);

  /* ------------------------------------------------------------- */
  /* NAVIGATION PILLS SWITCHER                                     */
  /* ------------------------------------------------------------- */
  const renderNavPills = () => (
    <div style={{ display: 'flex', gap: '0.375rem', background: '#F1F5F9', padding: '0.25rem', borderRadius: 'var(--radius-lg)', flexWrap: 'wrap' }}>
      <button
        onClick={() => { setCrmSection('contacts'); setSelectedContact(null); }}
        className={`btn btn-sm ${crmSection === 'contacts' || crmSection === 'clients' || crmSection === 'contact-details' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <Users2 size={14} /> Contacts
      </button>
      <button
        onClick={() => { setCrmSection('companies'); setSelectedCompany(null); }}
        className={`btn btn-sm ${crmSection === 'companies' || crmSection === 'company-details' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <Building2 size={14} /> Companies
      </button>
      <button
        onClick={() => { setCrmSection('deals'); setSelectedDeal(null); }}
        className={`btn btn-sm ${crmSection === 'deals' || crmSection === 'deal-details' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <FolderKanban size={14} /> Deals
      </button>
      <button
        onClick={() => { setCrmSection('pipeline'); }}
        className={`btn btn-sm ${crmSection === 'pipeline' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <TrendingUp size={14} /> Pipeline
      </button>
      <button
        onClick={() => { setCrmSection('activity'); }}
        className={`btn btn-sm ${crmSection === 'activity' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <Activity size={14} /> Activity
      </button>
    </div>
  );

  /* ------------------------------------------------------------- */
  /* VIEW 1: CONTACT DETAILS VIEW                                  */
  /* ------------------------------------------------------------- */
  if (crmSection === 'contact-details') {
    const contact = selectedContact || contactCards[0];

    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => { setCrmSection('contacts'); setSelectedContact(null); }}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', fontWeight: 600 }}
            >
              <ArrowLeft size={16} /> Contacts / {contact.name}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <Button
              variant="primary"
              size="sm"
              style={{ background: '#FF5B37', borderColor: '#FF5B37', fontSize: '0.8125rem' }}
              onClick={() => showToast(`Adding deal for ${contact.name}...`, 'info')}
              iconLeft={<Plus size={14} />}
            >
              Add Deal
            </Button>
            <button
              className="btn btn-sm"
              style={{ background: '#1E293B', color: '#fff', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
              onClick={() => showToast(`Composing email to ${contact.email}...`, 'info')}
            >
              <Mail size={14} /> Send Email
            </button>
          </div>
        </div>

        {/* 2-Column Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '1.25rem', alignItems: 'flex-start' }}>
          {/* Left Profile Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card>
              <div
                style={{
                  background: 'linear-gradient(135deg, #FF7A00 0%, #FF5B37 100%)',
                  height: '85px',
                  borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-36px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    border: '4px solid #FFFFFF',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <img src={contact.avatar} alt={contact.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              <div style={{ padding: '2.75rem 1.25rem 1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>{contact.name}</h3>
                  <div style={{ width: 15, height: 15, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Check size={9} strokeWidth={3} />
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{contact.company}</span>
                <div style={{ marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#EC4899', background: '#FDF2F8', padding: '0.125rem 0.6rem', borderRadius: 'var(--radius-pill)' }}>
                    {contact.role}
                  </span>
                </div>
              </div>
            </Card>

            {/* Basic Information */}
            <Card>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Basic information</strong>
                <div style={{ display: 'flex', gap: '0.25rem', color: '#94A3B8' }}><Edit2 size={12} /><ChevronDown size={13} /></div>
              </div>
              <CardBody style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Phone</span>
                  <strong style={{ color: '#1E293B' }}>{contact.phone}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#94A3B8' }}>Email</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                    <span>{contact.email}</span>
                    <Copy size={11} style={{ cursor: 'pointer' }} onClick={() => showToast('Email copied', 'success')} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Gender</span>
                  <strong style={{ color: '#1E293B' }}>{contact.gender}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Birthday</span>
                  <strong style={{ color: '#1E293B' }}>{contact.dob}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ color: '#94A3B8' }}>Address</span>
                  <strong style={{ color: '#1E293B', textAlign: 'right', maxWidth: '170px' }}>{contact.address}</strong>
                </div>
              </CardBody>
            </Card>

            {/* Other Information */}
            <Card>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Other Information</strong>
                <div style={{ display: 'flex', gap: '0.25rem', color: '#94A3B8' }}><Edit2 size={12} /><ChevronDown size={13} /></div>
              </div>
              <CardBody style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Language</span>
                  <strong style={{ color: '#1E293B' }}>{contact.language}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Currency</span>
                  <strong style={{ color: '#1E293B' }}>{contact.currency}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Last Modified</span>
                  <span style={{ color: '#64748B' }}>{contact.lastModified}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Source</span>
                  <strong style={{ color: '#1E293B' }}>{contact.source}</strong>
                </div>
              </CardBody>
            </Card>

            {/* Tags */}
            <Card>
              <CardBody style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                <span style={{ color: '#94A3B8', fontWeight: 700, fontSize: '0.6875rem' }}>Tags</span>
                <div style={{ display: 'flex', gap: '0.375rem' }}>
                  {contact.tags.map((t: string, i: number) => (
                    <span key={i} style={{ background: i % 2 === 0 ? '#ECFDF5' : '#FEF3C7', color: i % 2 === 0 ? '#10B981' : '#F59E0B', padding: '0.1rem 0.5rem', borderRadius: '4px', fontSize: '0.6875rem', fontWeight: 700 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Company Link */}
            <Card>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Company</strong>
                <span style={{ color: '#FF5B37', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer' }} onClick={() => showToast('Opening company mapping...', 'info')}>+ Add New</span>
              </div>
              <CardBody style={{ padding: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#8B5CF6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  ⬡
                </div>
                <div>
                  <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>{contact.company}</strong>
                  <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>{contact.companyUrl}</div>
                </div>
              </CardBody>
            </Card>

            {/* Social Links */}
            <Card>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Social Links</strong>
                <div style={{ display: 'flex', gap: '0.25rem', color: '#94A3B8' }}><Edit2 size={12} /><ChevronDown size={13} /></div>
              </div>
              <CardBody style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['IG', 'X', 'WA', 'P', 'IN', 'FB'].map((s, idx) => (
                    <div key={idx} style={{ width: 28, height: 28, borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem', fontWeight: 700, color: '#64748B', cursor: 'pointer' }} onClick={() => showToast(`Opening ${s}...`, 'info')}>
                      {s}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button className="btn btn-sm" style={{ background: '#1E293B', color: '#fff', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }} onClick={() => showToast('Sharing contact card...', 'info')}>
                    <Share2 size={12} /> Share
                  </button>
                  <button className="btn btn-sm" style={{ background: '#FF5B37', color: '#fff', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }} onClick={() => showToast('Deleted contact', 'warning')}>
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column Tabbed Activities Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Card>
              <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', gap: '1.5rem' }}>
                {['activities', 'notes', 'calls', 'files', 'email'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFeedTab(tab as any)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0.25rem 0',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      color: activeFeedTab === tab ? 'var(--color-primary)' : '#64748B',
                      borderBottom: activeFeedTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
                      cursor: 'pointer'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1E293B' }}>Activities</h4>
                  <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                    <option>Sort By : Last 7 Days</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#8B5CF6', background: '#F5F3FF', padding: '0.1rem 0.5rem', borderRadius: '4px', alignSelf: 'flex-start' }}>
                    📅 15 Feb 2024
                  </span>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MessageSquare size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>You sent 1 Message to the contact.</div>
                      <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>10:25 pm</span>
                    </div>
                  </div>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Phone size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>Denwar responded to your appointment schedule question by call at 09:30pm.</div>
                      <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>09:25 pm</span>
                    </div>
                  </div>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#FEF3C7', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>Notes added by Antony</div>
                      <p style={{ fontSize: '0.75rem', color: '#475569', margin: '0.25rem 0' }}>Please accept my apologies for the inconvenience caused. It would be much appreciated if it's possible to reschedule to 6:00 PM, or any other day that week.</p>
                      <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>10.00 pm</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#8B5CF6', background: '#F5F3FF', padding: '0.1rem 0.5rem', borderRadius: '4px', alignSelf: 'flex-start' }}>
                    📅 15 Feb 2024
                  </span>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#F3E8FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users2 size={16} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>Meeting With</span>
                      <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" name="Abraham" size="xs" />
                      <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Abraham</strong>
                    </div>
                    <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>Scheduled on 05:00 pm</span>
                  </div>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Phone size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>Drain responded to your appointment schedule question.</div>
                      <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>09:25 pm</span>
                    </div>
                  </div>
                </div>

                {/* Upcoming Activity Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#EC4899', background: '#FDF2F8', padding: '0.1rem 0.5rem', borderRadius: '4px', alignSelf: 'flex-start' }}>
                    📅 Upcoming Activity
                  </span>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F3E8FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Users2 size={16} />
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.875rem', color: '#1E293B' }}>Product Meeting</strong>
                        <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>A product team meeting is a gathering of the cross-functional product team — ideally including team members from product, engineering, marketing, and customer support.</div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#64748B', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem' }}>
                      <span>25 Jul 2023, 05:00 pm</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                      <div>
                        <label style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700 }}>Reminder</label>
                        <select className="form-control" style={{ fontSize: '0.75rem', padding: '0.3rem' }}><option>⏱ Reminder</option></select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700 }}>Task Priority</label>
                        <select className="form-control" style={{ fontSize: '0.75rem', padding: '0.3rem' }}><option>• High</option></select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700 }}>Assigned to</label>
                        <select className="form-control" style={{ fontSize: '0.75rem', padding: '0.3rem' }}><option>👤 John</option></select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 2: COMPANY DETAILS VIEW                                  */
  /* ------------------------------------------------------------- */
  if (crmSection === 'company-details') {
    const comp = selectedCompany || companyCards[0];

    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => { setCrmSection('companies'); setSelectedCompany(null); }}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', fontWeight: 600 }}
            >
              <ArrowLeft size={16} /> Companies / {comp.name}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <Button
              variant="primary"
              size="sm"
              style={{ background: '#FF5B37', borderColor: '#FF5B37', fontSize: '0.8125rem' }}
              onClick={() => showToast(`Adding deal for ${comp.name}...`, 'info')}
              iconLeft={<Plus size={14} />}
            >
              Add Deal
            </Button>
            <button
              className="btn btn-sm"
              style={{ background: '#1E293B', color: '#fff', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
              onClick={() => showToast(`Opening mail composer for ${comp.email}...`, 'info')}
            >
              <Mail size={14} /> Send Email
            </button>
          </div>
        </div>

        {/* 2-Column Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '1.25rem', alignItems: 'flex-start' }}>
          {/* Left Column Profile Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card>
              <div
                style={{
                  background: 'linear-gradient(135deg, #FF7A00 0%, #FF5B37 100%)',
                  height: '85px',
                  borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-36px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    border: '4px solid #FFFFFF',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: comp.logoBg || '#8B5CF6',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 800
                    }}
                  >
                    {comp.logoIcon || '⬡'}
                  </div>
                </div>
              </div>

              <div style={{ padding: '2.75rem 1.25rem 1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>{comp.name}</h3>
                  <div style={{ width: 15, height: 15, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Check size={9} strokeWidth={3} />
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{comp.address}</span>
              </div>
            </Card>

            {/* Basic Information */}
            <Card>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Basic information</strong>
                <div style={{ display: 'flex', gap: '0.25rem', color: '#94A3B8' }}><Edit2 size={12} /><ChevronDown size={13} /></div>
              </div>
              <CardBody style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Phone</span>
                  <strong style={{ color: '#1E293B' }}>{comp.phone}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#94A3B8' }}>Email</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                    <span>{comp.email}</span>
                    <Copy size={11} style={{ cursor: 'pointer' }} onClick={() => showToast('Email copied', 'success')} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Created On</span>
                  <span style={{ color: '#64748B' }}>{comp.createdOn}</span>
                </div>
              </CardBody>
            </Card>

            {/* Other Information */}
            <Card>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Other Information</strong>
                <div style={{ display: 'flex', gap: '0.25rem', color: '#94A3B8' }}><Edit2 size={12} /><ChevronDown size={13} /></div>
              </div>
              <CardBody style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Language</span>
                  <strong style={{ color: '#1E293B' }}>{comp.language}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Currency</span>
                  <strong style={{ color: '#1E293B' }}>{comp.currency}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Last Modified</span>
                  <span style={{ color: '#64748B' }}>{comp.lastModified}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Source</span>
                  <strong style={{ color: '#1E293B' }}>{comp.source}</strong>
                </div>
              </CardBody>
            </Card>

            {/* Tags */}
            <Card>
              <CardBody style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                <span style={{ color: '#94A3B8', fontWeight: 700, fontSize: '0.6875rem' }}>Tags</span>
                <div style={{ display: 'flex', gap: '0.375rem' }}>
                  {comp.tags.map((t: string, i: number) => (
                    <span key={i} style={{ background: i % 2 === 0 ? '#ECFDF5' : '#FEF3C7', color: i % 2 === 0 ? '#10B981' : '#F59E0B', padding: '0.1rem 0.5rem', borderRadius: '4px', fontSize: '0.6875rem', fontWeight: 700 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Associated Contacts */}
            <Card>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Contact</strong>
                <span style={{ color: '#FF5B37', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer' }} onClick={() => showToast('Adding associated contact...', 'info')}>+ Add New</span>
              </div>
              <CardBody style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.75rem' }}>
                {comp.contacts.map((c: any, idx: number) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Avatar src={c.avatar} name={c.name} size="xs" />
                    <strong style={{ color: '#1E293B' }}>{c.name}</strong>
                  </div>
                ))}
              </CardBody>
            </Card>

            {/* Social Links & Action Buttons */}
            <Card>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Social Links</strong>
                <div style={{ display: 'flex', gap: '0.25rem', color: '#94A3B8' }}><Edit2 size={12} /><ChevronDown size={13} /></div>
              </div>
              <CardBody style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['IG', 'X', 'WA', 'P', 'IN', 'FB'].map((s, idx) => (
                    <div key={idx} style={{ width: 28, height: 28, borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem', fontWeight: 700, color: '#64748B', cursor: 'pointer' }} onClick={() => showToast(`Opening ${s}...`, 'info')}>
                      {s}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button className="btn btn-sm" style={{ background: '#1E293B', color: '#fff', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }} onClick={() => showToast('Sharing company card...', 'info')}>
                    <Share2 size={12} /> Share
                  </button>
                  <button className="btn btn-sm" style={{ background: '#FF5B37', color: '#fff', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }} onClick={() => showToast('Deleted company profile', 'warning')}>
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Activities & History Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Card>
              <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', gap: '1.5rem' }}>
                {['activities', 'notes', 'calls', 'files', 'email'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFeedTab(tab as any)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0.25rem 0',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      color: activeFeedTab === tab ? 'var(--color-primary)' : '#64748B',
                      borderBottom: activeFeedTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
                      cursor: 'pointer'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1E293B' }}>Activities</h4>
                  <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                    <option>Sort By : Last 7 Days</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#8B5CF6', background: '#F5F3FF', padding: '0.1rem 0.5rem', borderRadius: '4px', alignSelf: 'flex-start' }}>
                    📅 15 Feb 2024
                  </span>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MessageSquare size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>You sent 1 Message to the contact.</div>
                      <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>10:25 pm</span>
                    </div>
                  </div>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Phone size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>Denwar responded to your appointment schedule question by call at 09:30pm.</div>
                      <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>09:25 pm</span>
                    </div>
                  </div>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#FEF3C7', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>Notes added by Antony</div>
                      <p style={{ fontSize: '0.75rem', color: '#475569', margin: '0.25rem 0' }}>Please accept my apologies for the inconvenience caused. It would be much appreciated if it's possible to reschedule to 6:00 PM, or any other day that week.</p>
                      <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>10.00 pm</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#8B5CF6', background: '#F5F3FF', padding: '0.1rem 0.5rem', borderRadius: '4px', alignSelf: 'flex-start' }}>
                    📅 15 Feb 2024
                  </span>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#F3E8FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users2 size={16} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>Meeting With</span>
                      <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" name="Abraham" size="xs" />
                      <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Abraham</strong>
                    </div>
                    <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>Scheduled on 05:00 pm</span>
                  </div>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Phone size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>Drain responded to your appointment schedule question.</div>
                      <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>09:25 pm</span>
                    </div>
                  </div>
                </div>

                {/* Upcoming Activity Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#EC4899', background: '#FDF2F8', padding: '0.1rem 0.5rem', borderRadius: '4px', alignSelf: 'flex-start' }}>
                    📅 Upcoming Activity
                  </span>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F3E8FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Users2 size={16} />
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.875rem', color: '#1E293B' }}>Product Meeting</strong>
                        <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>A product team meeting is a gathering of the cross-functional product team — ideally including team members from product, engineering, marketing, and customer support.</div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#64748B', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem' }}>
                      <span>25 Jul 2023, 05:00 pm</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                      <div>
                        <label style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700 }}>Reminder</label>
                        <select className="form-control" style={{ fontSize: '0.75rem', padding: '0.3rem' }}><option>⏱ Reminder</option></select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700 }}>Task Priority</label>
                        <select className="form-control" style={{ fontSize: '0.75rem', padding: '0.3rem' }}><option>• High</option></select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700 }}>Assigned to</label>
                        <select className="form-control" style={{ fontSize: '0.75rem', padding: '0.3rem' }}><option>👤 John</option></select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 3: DEAL DETAILS VIEW                                     */
  /* ------------------------------------------------------------- */
  if (crmSection === 'deal-details') {
    const deal = selectedDeal || dealsKanbanData.new.deals[0];

    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => { setCrmSection('deals'); setSelectedDeal(null); }}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', fontWeight: 600 }}
            >
              <ArrowLeft size={16} /> Deals / {deal.title || 'Tremblay and Rath'}
            </button>
            <select className="form-control" style={{ width: '180px', fontSize: '0.75rem' }}>
              <option>🏷 Marketing Pipeline</option>
              <option>🏷 Sales Pipeline</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <Button
              variant="primary"
              size="sm"
              style={{ background: '#FF5B37', borderColor: '#FF5B37', fontSize: '0.8125rem' }}
              onClick={() => setIsAddDealModalOpen(true)}
              iconLeft={<Plus size={14} />}
            >
              Add New
            </Button>
          </div>
        </div>

        {/* Chevron Pipeline Status */}
        <Card>
          <CardBody style={{ padding: '1rem 1.25rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.75rem' }}>
              Deal Pipeline Status
            </h4>
            <div style={{ display: 'flex', width: '100%', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '40px' }}>
              <div style={{ flex: 1, background: '#8B5CF6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8125rem', clipPath: 'polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)' }}>
                New
              </div>
              <div style={{ flex: 1, background: '#0284C7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8125rem', clipPath: 'polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)', marginLeft: '-10px' }}>
                Prospect
              </div>
              <div style={{ flex: 1, background: '#EAB308', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8125rem', clipPath: 'polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)', marginLeft: '-10px' }}>
                Proposal
              </div>
              <div style={{ flex: 1, background: '#EC4899', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8125rem', clipPath: 'polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)', marginLeft: '-10px' }}>
                Won
              </div>
              <div style={{ flex: 1, background: '#F1F5F9', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8125rem', marginLeft: '-10px' }}>
                Lost
              </div>
            </div>
          </CardBody>
        </Card>

        {/* 2-Column Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '1.25rem', alignItems: 'flex-start' }}>
          {/* Left Column Profile Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card>
              <div
                style={{
                  background: 'linear-gradient(135deg, #FF7A00 0%, #FF5B37 100%)',
                  height: '85px',
                  borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-36px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    border: '4px solid #FFFFFF',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#F1F5F9', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.125rem', fontWeight: 800 }}>
                    {deal.code || 'WR'}
                  </div>
                </div>
              </div>

              <div style={{ padding: '2.75rem 1.25rem 1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>{deal.projectTitle || 'Website Redesign'}</h3>
                  <Star size={15} color="#F59E0B" fill="#F59E0B" />
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>1861 Bayonne Ave, Manchester, NJ, 08759</span>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.375rem', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '0.6875rem', background: '#F1F5F9', color: '#64748B', padding: '0.125rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>🔒 Private</span>
                  <span style={{ fontSize: '0.6875rem', background: '#ECFDF5', color: '#10B981', padding: '0.125rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>👍 Won ∨</span>
                </div>
              </div>
            </Card>

            {/* Deals Information */}
            <Card>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Deals information</strong>
                <div style={{ display: 'flex', gap: '0.25rem', color: '#94A3B8' }}><Edit2 size={12} /><ChevronDown size={13} /></div>
              </div>
              <CardBody style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Date Created</span>
                  <span style={{ color: '#1E293B' }}>10 Jan 2024, 11:45 pm</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Probability - Win</span>
                  <strong style={{ color: '#1E293B' }}>{deal.probability || '85%'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Deal Value</span>
                  <strong style={{ color: '#10B981', fontSize: '0.8125rem' }}>{deal.value || '₹4,50,000'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Due Date</span>
                  <span style={{ color: '#1E293B' }}>25 Jan 2024, 11:45 pm</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Follow Up</span>
                  <span style={{ color: '#1E293B' }}>25 Jan 2024</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Source</span>
                  <strong style={{ color: '#1E293B' }}>Google</strong>
                </div>
              </CardBody>
            </Card>

            {/* Deal Owner */}
            <Card>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Deal Owner</strong>
                <span style={{ color: '#FF5B37', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer' }} onClick={() => showToast('Assigning owner...', 'info')}>+ Add New</span>
              </div>
              <CardBody style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Avatar src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" name="Sharon Roy" size="xs" />
                  <strong style={{ color: '#1E293B' }}>Sharon Roy</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" name="Vaughan Lewis" size="xs" />
                  <strong style={{ color: '#1E293B' }}>Vaughan Lewis</strong>
                </div>
              </CardBody>
            </Card>

            {/* Tags & Priority */}
            <Card>
              <CardBody style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                <span style={{ color: '#94A3B8', fontWeight: 700, fontSize: '0.6875rem' }}>Tags</span>
                <div style={{ display: 'flex', gap: '0.375rem' }}>
                  <span style={{ background: '#ECFDF5', color: '#10B981', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.6875rem', fontWeight: 700 }}>Collab</span>
                  <span style={{ background: '#FEF3C7', color: '#F59E0B', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.6875rem', fontWeight: 700 }}>Rated</span>
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <span style={{ color: '#94A3B8', fontWeight: 700, fontSize: '0.6875rem' }}>Priority</span>
                  <select className="form-control" style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
                    <option>• High</option>
                    <option>• Medium</option>
                    <option>• Low</option>
                  </select>
                </div>
              </CardBody>
            </Card>

            {/* Contacts list */}
            <Card>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Contacts</strong>
                <span style={{ color: '#FF5B37', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer' }} onClick={() => showToast('Adding associated contact...', 'info')}>+ Add New</span>
              </div>
              <CardBody style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Avatar src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" name="Sharon Roy" size="xs" />
                  <strong style={{ color: '#1E293B' }}>Sharon Roy</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" name="Vaughan Lewis" size="xs" />
                  <strong style={{ color: '#1E293B' }}>Vaughan Lewis</strong>
                </div>
              </CardBody>
            </Card>

            {/* Other Information */}
            <Card>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Other information</strong>
                <div style={{ display: 'flex', gap: '0.25rem', color: '#94A3B8' }}><Edit2 size={12} /><ChevronDown size={13} /></div>
              </div>
              <CardBody style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Last Modified</span>
                  <span style={{ color: '#64748B' }}>10 Jan 2024, 11:45 pm</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#94A3B8' }}>Modified By</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" name="Darlee Robertson" size="xs" />
                    <strong style={{ color: '#1E293B' }}>Darlee Robertson</strong>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column Tabbed Activities Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Card>
              <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', gap: '1.5rem' }}>
                {['activities', 'notes', 'calls', 'files', 'email'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFeedTab(tab as any)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0.25rem 0',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      color: activeFeedTab === tab ? 'var(--color-primary)' : '#64748B',
                      borderBottom: activeFeedTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
                      cursor: 'pointer'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1E293B' }}>Activities</h4>
                  <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                    <option>Sort By : Last 7 Days</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#8B5CF6', background: '#F5F3FF', padding: '0.1rem 0.5rem', borderRadius: '4px', alignSelf: 'flex-start' }}>
                    📅 15 Feb 2024
                  </span>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MessageSquare size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>You sent 1 Message to the contact.</div>
                      <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>10:25 pm</span>
                    </div>
                  </div>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Phone size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>Denwar responded to your appointment schedule question by call at 09:30pm.</div>
                      <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>09:25 pm</span>
                    </div>
                  </div>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#FEF3C7', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>Notes added by Antony</div>
                      <p style={{ fontSize: '0.75rem', color: '#475569', margin: '0.25rem 0' }}>Please accept my apologies for the inconvenience caused. It would be much appreciated if it's possible to reschedule to 6:00 PM, or any other day that week.</p>
                      <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>10.00 pm</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#8B5CF6', background: '#F5F3FF', padding: '0.1rem 0.5rem', borderRadius: '4px', alignSelf: 'flex-start' }}>
                    📅 15 Feb 2024
                  </span>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#F3E8FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users2 size={16} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>Meeting With</span>
                      <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" name="Abraham" size="xs" />
                      <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Abraham</strong>
                    </div>
                    <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>Scheduled on 05:00 pm</span>
                  </div>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Phone size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>Drain responded to your appointment schedule question.</div>
                      <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>09:25 pm</span>
                    </div>
                  </div>
                </div>

                {/* Upcoming Activity Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#EC4899', background: '#FDF2F8', padding: '0.1rem 0.5rem', borderRadius: '4px', alignSelf: 'flex-start' }}>
                    📅 Upcoming Activity
                  </span>

                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F3E8FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Users2 size={16} />
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.875rem', color: '#1E293B' }}>Product Meeting</strong>
                        <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>A product team meeting is a gathering of the cross-functional product team — ideally including team members from product, engineering, marketing, and customer support.</div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#64748B', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem' }}>
                      <span>25 Jul 2023, 05:00 pm</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                      <div>
                        <label style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700 }}>Reminder</label>
                        <select className="form-control" style={{ fontSize: '0.75rem', padding: '0.3rem' }}><option>⏱ Reminder</option></select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700 }}>Task Priority</label>
                        <select className="form-control" style={{ fontSize: '0.75rem', padding: '0.3rem' }}><option>• High</option></select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700 }}>Assigned to</label>
                        <select className="form-control" style={{ fontSize: '0.75rem', padding: '0.3rem' }}><option>👤 John</option></select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 4: COMPANIES GRID VIEW                                   */
  /* ------------------------------------------------------------- */
  if (crmSection === 'companies') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Companies</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>CRM</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Companies Grid</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#FFFFFF' }}>
              <button className="btn-icon-only btn-ghost" style={{ padding: '0.4rem', borderRight: '1px solid var(--color-border-subtle)' }}>
                <List size={15} color="#94A3B8" />
              </button>
              <button className="btn-icon-only btn-ghost" style={{ padding: '0.4rem' }}>
                <LayoutGrid size={15} color="#FF5B37" />
              </button>
            </div>

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting companies...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>

            <Button
              variant="primary"
              size="sm"
              style={{ fontSize: '0.8125rem', background: '#FF5B37', borderColor: '#FF5B37' }}
              onClick={() => setIsAddCompanyModalOpen(true)}
              iconLeft={<Plus size={16} />}
            >
              Add New Company
            </Button>
          </div>
        </div>

        {/* Filter Card */}
        <Card>
          <CardBody style={{ padding: '0.875rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Companies Grid</h3>
              <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                <option>Sort By : Last 7 Days</option>
              </select>
            </div>
          </CardBody>
        </Card>

        {/* 12 Companies Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {companyCards.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setSelectedCompany(c);
                setCrmSection('company-details');
              }}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.25rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Top row: Checkbox & 3-dots */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                <button
                  className="btn-icon-only btn-ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast(`Options for ${c.name}`, 'info');
                  }}
                  style={{ padding: '0.2rem', color: '#94A3B8' }}
                >
                  <MoreVertical size={14} />
                </button>
              </div>

              {/* Logo & Company Name */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.375rem' }}>
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: '50%',
                    background: c.logoBg,
                    color: c.logoColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.375rem',
                    fontWeight: 800,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                  }}
                >
                  {c.logoIcon}
                </div>

                <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>
                  {c.name}
                </h4>

                {/* Overlapping Team Avatars */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.1rem' }}>
                  <div style={{ display: 'flex', marginLeft: '0.5rem' }}>
                    {c.teamAvatars.map((av, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          overflow: 'hidden',
                          border: '2px solid #FFFFFF',
                          marginLeft: idx > 0 ? '-6px' : '0'
                        }}
                      >
                        <img src={av} alt="team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: '#EA580C',
                        color: '#FFFFFF',
                        border: '2px solid #FFFFFF',
                        fontSize: '0.5625rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '-6px'
                      }}
                    >
                      {c.extraCount}
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.625rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', color: '#64748B' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={13} color="#94A3B8" />
                  <span style={{ color: '#1E293B', fontWeight: 600 }}>{c.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={13} color="#94A3B8" />
                  <span>{c.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={13} color="#94A3B8" />
                  <span>{c.location}</span>
                </div>
              </div>

              {/* Bottom Row */}
              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.625rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '0.35rem', color: '#94A3B8' }}>
                  <Mail size={12} />
                  <Phone size={12} />
                  <MessageSquare size={12} />
                  <Globe size={12} />
                  <Share2 size={12} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', fontWeight: 700, color: '#1E293B' }}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <span>{c.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
          <button
            className="btn btn-sm"
            style={{ background: '#FF5B37', color: '#FFFFFF', fontWeight: 700, fontSize: '0.8125rem', borderRadius: 'var(--radius-md)', padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
            onClick={() => showToast('All 12 companies loaded.', 'info')}
          >
            <RotateCw size={14} /> Load More
          </button>
        </div>

        {/* Add Company Modal */}
        <Modal
          isOpen={isAddCompanyModalOpen}
          onClose={() => setIsAddCompanyModalOpen(false)}
          title="Add New Company"
          subtitle="Register an enterprise client in CRM"
        >
          <form onSubmit={(e) => { e.preventDefault(); showToast('New company registered!', 'success'); setIsAddCompanyModalOpen(false); }}>
            <div className="form-group">
              <label className="form-label">Company Name <span className="required">*</span></label>
              <input type="text" className="form-control" placeholder="e.g. Apex Global Innovations" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="contact@apex.in" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" placeholder="+91 98200 12345" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input type="text" className="form-control" placeholder="Office location" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <Button type="button" variant="secondary" onClick={() => setIsAddCompanyModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Save Company</Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 5: DEALS KANBAN GRID VIEW                                */
  /* ------------------------------------------------------------- */
  if (crmSection === 'deals') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Deals</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>CRM</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Deals List</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#FFFFFF' }}>
              <button className="btn-icon-only btn-ghost" style={{ padding: '0.4rem', borderRight: '1px solid var(--color-border-subtle)' }}>
                <List size={15} color="#94A3B8" />
              </button>
              <button className="btn-icon-only btn-ghost" style={{ padding: '0.4rem' }}>
                <LayoutGrid size={15} color="#FF5B37" />
              </button>
            </div>

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting deals...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>

            <Button
              variant="primary"
              size="sm"
              style={{ fontSize: '0.8125rem', background: '#FF5B37', borderColor: '#FF5B37' }}
              onClick={() => setIsAddDealModalOpen(true)}
              iconLeft={<Plus size={16} />}
            >
              Add New Deal
            </Button>
          </div>
        </div>

        {/* Filter Card */}
        <Card>
          <CardBody style={{ padding: '0.875rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Deals Grid</h3>
              <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                <option>Sort By : Last 7 Days</option>
              </select>
            </div>
          </CardBody>
        </Card>

        {/* 4 Kanban Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', alignItems: 'flex-start' }}>
          {Object.entries(dealsKanbanData).map(([key, col]) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Column Header Card */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '0.875rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color }} />
                    <strong style={{ fontSize: '0.875rem', color: '#1E293B' }}>{col.title}</strong>
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: '#64748B', fontWeight: 600 }}>{col.summary}</span>
                </div>

                <div style={{ display: 'flex', gap: '0.25rem', color: '#94A3B8' }}>
                  <button className="btn-icon-only btn-ghost" style={{ padding: '0.2rem' }} onClick={() => setIsAddDealModalOpen(true)}><Plus size={13} /></button>
                  <button className="btn-icon-only btn-ghost" style={{ padding: '0.2rem' }} onClick={() => showToast('Editing stage...', 'info')}><Edit2 size={13} /></button>
                  <button className="btn-icon-only btn-ghost" style={{ padding: '0.2rem' }} onClick={() => showToast('Deleted column', 'warning')}><Trash2 size={13} /></button>
                </div>
              </div>

              {/* Deal Cards in Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {col.deals.map((deal) => (
                  <div
                    key={deal.id}
                    onClick={() => {
                      setSelectedDeal(deal);
                      setCrmSection('deal-details');
                    }}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid var(--color-border)',
                      borderTop: `3px solid ${deal.topBorder}`,
                      borderRadius: 'var(--radius-lg)',
                      padding: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.625rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                      e.currentTarget.style.borderTopColor = deal.topBorder;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.borderTopColor = deal.topBorder;
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Top Initials & Title */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '8px',
                          background: '#F8FAFC',
                          border: '1px solid var(--color-border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          color: '#1E293B'
                        }}
                      >
                        {deal.code}
                      </div>
                      <div style={{ flex: 1 }}>
                        <strong style={{ fontSize: '0.8125rem', color: '#1E293B', lineHeight: '1.2' }}>{deal.title}</strong>
                        <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>{deal.value}</div>
                      </div>
                    </div>

                    {/* Contact Rows */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.6875rem', color: '#64748B', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Mail size={12} color="#94A3B8" />
                        <span style={{ color: '#1E293B', fontWeight: 600 }}>{deal.email}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Phone size={12} color="#94A3B8" />
                        <span>{deal.phone}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <MapPin size={12} color="#94A3B8" />
                        <span>{deal.location}</span>
                      </div>
                    </div>

                    {/* Owner & Percentage badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Avatar src={deal.ownerAvatar} name={deal.ownerName} size="xs" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E293B' }}>{deal.ownerName}</span>
                      </div>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#0284C7', background: '#E0F2FE', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                        {deal.probability}
                      </span>
                    </div>

                    {/* Bottom Date & Action icons */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#94A3B8', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.4rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={11} />
                        <span>{deal.createdDate}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <Phone size={11} style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); showToast(`Calling ${deal.ownerName}`, 'info'); }} />
                        <MessageSquare size={11} style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); showToast(`Chatting with ${deal.ownerName}`, 'info'); }} />
                        <FileText size={11} style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); showToast(`Viewing deal attachments`, 'info'); }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add Deal Modal */}
        <Modal
          isOpen={isAddDealModalOpen}
          onClose={() => setIsAddDealModalOpen(false)}
          title="Add New Deal"
          subtitle="Create an enterprise deal lead in pipeline"
        >
          <form onSubmit={(e) => { e.preventDefault(); showToast('New deal registered successfully!', 'success'); setIsAddDealModalOpen(false); }}>
            <div className="form-group">
              <label className="form-label">Deal Title <span className="required">*</span></label>
              <input type="text" className="form-control" placeholder="e.g. Website Redesign & Mobile App" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Deal Value (₹)</label>
                <input type="text" className="form-control" defaultValue="₹4,50,000" />
              </div>
              <div className="form-group">
                <label className="form-label">Stage</label>
                <select className="form-control">
                  <option>New</option>
                  <option>Prospect</option>
                  <option>Proposal</option>
                  <option>Won</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Deal Owner</label>
              <input type="text" className="form-control" defaultValue="Darlee Robertson" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <Button type="button" variant="secondary" onClick={() => setIsAddDealModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Create Deal</Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 6: PIPELINE LIST VIEW                                    */
  /* ------------------------------------------------------------- */
  if (crmSection === 'pipeline') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Pipeline</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>CRM</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Pipeline List</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting pipelines...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>

            <Button
              variant="primary"
              size="sm"
              style={{ background: '#FF5B37', borderColor: '#FF5B37', fontSize: '0.8125rem' }}
              onClick={() => setIsAddPipelineOpen(true)}
              iconLeft={<Plus size={16} />}
            >
              Add New Pipeline
            </Button>
          </div>
        </div>

        {/* Filter Card */}
        <Card>
          <CardBody style={{ padding: '0.875rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Pipeline List</h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="dd/mm/yyyy - dd/mm/yyyy"
                  style={{ width: '180px', fontSize: '0.75rem' }}
                />
                <select className="form-control" style={{ width: '120px', fontSize: '0.75rem' }}>
                  <option>Pipelines</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                </select>
                <select className="form-control" style={{ width: '110px', fontSize: '0.75rem' }}>
                  <option>Stage</option>
                  <option>Won</option>
                  <option>In Pipeline</option>
                </select>
                <select className="form-control" style={{ width: '110px', fontSize: '0.75rem' }}>
                  <option>Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                  <option>Sort By : Last 7 Days</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Table Card */}
        <Card>
          <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#64748B' }}>
              <span>Row Per Page</span>
              <select className="form-control" style={{ width: '60px', padding: '0.2rem 0.4rem', fontSize: '0.75rem' }}>
                <option>10</option>
                <option>20</option>
              </select>
              <span>Entries</span>
            </div>

            <div style={{ position: 'relative', width: '220px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                style={{ paddingLeft: '2rem', fontSize: '0.75rem' }}
              />
              <Search size={13} style={{ position: 'absolute', left: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            </div>
          </div>

          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table" style={{ fontSize: '0.8125rem' }}>
              <thead>
                <tr>
                  <th style={{ width: '40px' }}><input type="checkbox" /></th>
                  <th>Pipeline Name</th>
                  <th>Total Deal Value</th>
                  <th>No of Deals</th>
                  <th>Stages</th>
                  <th>Created Date ▾</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pipelineList.map((pip) => (
                  <tr key={pip.id}>
                    <td><input type="checkbox" /></td>
                    <td><strong>{pip.name}</strong></td>
                    <td><strong style={{ color: '#1E293B' }}>{pip.value}</strong></td>
                    <td>{pip.dealsCount}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '40px', height: '4px', background: pip.stageColor, borderRadius: '2px' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>{pip.stage}</span>
                      </div>
                    </td>
                    <td>{pip.createdDate}</td>
                    <td>
                      <span style={{ background: pip.status === 'Active' ? '#ECFDF5' : '#FEF2F2', color: pip.status === 'Active' ? '#10B981' : '#EF4444', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)', fontWeight: 700, fontSize: '0.6875rem' }}>
                        • {pip.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.375rem' }}>
                        <button className="btn-icon-only btn-ghost" onClick={() => showToast(`Editing pipeline ${pip.name}`, 'info')}>
                          <Edit2 size={14} />
                        </button>
                        <button className="btn-icon-only btn-ghost" style={{ color: '#EF4444' }} onClick={() => showToast(`Deleted pipeline`, 'warning')}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ padding: '0.875rem 1.25rem', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B' }}>
            <span>Showing 1 to 10 of 16 entries</span>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>&lt;</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>1</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>2</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>3</button>
              <button className="btn btn-sm" style={{ background: '#FF5B37', color: '#FFFFFF', padding: '0.2rem 0.5rem', fontWeight: 700 }}>4</button>
              <span style={{ padding: '0.2rem 0.3rem' }}>...</span>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>15</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>&gt;</button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 7: ACTIVITY LIST VIEW                                    */
  /* ------------------------------------------------------------- */
  if (crmSection === 'activity') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Activity</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>CRM</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Activity List</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting activities...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>

            <Button
              variant="primary"
              size="sm"
              style={{ background: '#FF5B37', borderColor: '#FF5B37', fontSize: '0.8125rem' }}
              onClick={() => setIsAddActivityOpen(true)}
              iconLeft={<Plus size={16} />}
            >
              Add New Activity
            </Button>
          </div>
        </div>

        {/* Filter Card */}
        <Card>
          <CardBody style={{ padding: '0.875rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Activity List</h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="dd/mm/yyyy - dd/mm/yyyy"
                  style={{ width: '180px', fontSize: '0.75rem' }}
                />
                <select className="form-control" style={{ width: '130px', fontSize: '0.75rem' }}>
                  <option>Activity Type</option>
                  <option>Meeting</option>
                  <option>Calls</option>
                  <option>Tasks</option>
                  <option>Email</option>
                </select>
                <select className="form-control" style={{ width: '110px', fontSize: '0.75rem' }}>
                  <option>Owner</option>
                  <option>Hendry</option>
                  <option>Guilory</option>
                  <option>Jami</option>
                </select>
                <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                  <option>Sort By : Last 7 Days</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Table Container */}
        <Card>
          <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#64748B' }}>
              <span>Row Per Page</span>
              <select className="form-control" style={{ width: '60px', padding: '0.2rem 0.4rem', fontSize: '0.75rem' }} value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <span>Entries</span>
            </div>

            <div style={{ position: 'relative', width: '220px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '2rem', fontSize: '0.75rem' }}
              />
              <Search size={13} style={{ position: 'absolute', left: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            </div>
          </div>

          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table" style={{ fontSize: '0.8125rem' }}>
              <thead>
                <tr>
                  <th style={{ width: '40px' }}><input type="checkbox" /></th>
                  <th>Title</th>
                  <th>Activity Type</th>
                  <th>Due Date ▾</th>
                  <th>Owner</th>
                  <th>Created Date ▾</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activityList.map((act) => (
                  <tr key={act.id}>
                    <td><input type="checkbox" /></td>
                    <td><strong>{act.title}</strong></td>
                    <td>
                      <span style={{ background: act.typeBg, color: act.typeColor, border: `1px solid ${act.typeColor}30`, padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)', fontWeight: 700, fontSize: '0.6875rem' }}>
                        {act.type === 'Meeting' ? '📅 Meeting' : act.type === 'Calls' ? '📞 Calls' : act.type === 'Tasks' ? '📋 Tasks' : '✉ Email'}
                      </span>
                    </td>
                    <td>{act.dueDate}</td>
                    <td><strong style={{ color: '#1E293B' }}>{act.owner}</strong></td>
                    <td>{act.createdDate}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.375rem' }}>
                        <button className="btn-icon-only btn-ghost" onClick={() => showToast(`Editing activity ${act.title}`, 'info')}>
                          <Edit2 size={14} />
                        </button>
                        <button className="btn-icon-only btn-ghost" style={{ color: '#EF4444' }} onClick={() => showToast(`Deleted activity`, 'warning')}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div style={{ padding: '0.875rem 1.25rem', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B' }}>
            <span>Showing 1 to 10 of 16 entries</span>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>&lt;</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>1</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>2</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>3</button>
              <button className="btn btn-sm" style={{ background: '#FF5B37', color: '#FFFFFF', padding: '0.2rem 0.5rem', fontWeight: 700 }}>4</button>
              <span style={{ padding: '0.2rem 0.3rem' }}>...</span>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>15</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>&gt;</button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 8: DEFAULT: CONTACTS GRID VIEW                           */
  /* ------------------------------------------------------------- */
  return (
    <div className="page-container" style={{ gap: '1.25rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Contacts</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
            <span>⌂</span>
            <span>/</span>
            <span>CRM</span>
            <span>/</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Contacts Grid</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {renderNavPills()}

          <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#FFFFFF' }}>
            <button className="btn-icon-only btn-ghost" style={{ padding: '0.4rem', borderRight: '1px solid var(--color-border-subtle)' }}>
              <List size={15} color="#94A3B8" />
            </button>
            <button className="btn-icon-only btn-ghost" style={{ padding: '0.4rem' }}>
              <LayoutGrid size={15} color="#FF5B37" />
            </button>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting contacts...', 'info')}>
            <Download size={14} /> Export <ChevronDown size={12} />
          </button>

          <Button
            variant="primary"
            size="sm"
            style={{ fontSize: '0.8125rem', background: '#FF5B37', borderColor: '#FF5B37' }}
            onClick={() => setIsAddContactModalOpen(true)}
            iconLeft={<Plus size={16} />}
          >
            Add New Contact
          </Button>
        </div>
      </div>

      {/* Filter Row */}
      <Card>
        <CardBody style={{ padding: '0.875rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Contact Grid</h3>
            <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
              <option>Sort By : Last 7 Days</option>
            </select>
          </div>
        </CardBody>
      </Card>

      {/* 12 Contact Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {contactCards.map((c) => (
          <div
            key={c.id}
            onClick={() => {
              setSelectedContact(c);
              setCrmSection('contact-details');
            }}
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.25rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <input type="checkbox" onClick={(e) => e.stopPropagation()} />
              <button
                className="btn-icon-only btn-ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  showToast(`Options for ${c.name}`, 'info');
                }}
                style={{ padding: '0.2rem', color: '#94A3B8' }}
              >
                <MoreVertical size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.25rem' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${c.avatarBorder}`, position: 'relative' }}>
                <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', bottom: '2px', right: '2px', width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', border: '2px solid #fff' }} />
              </div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>{c.name}</h4>
              <span style={{ fontSize: '0.625rem', fontWeight: 700, color: '#EC4899', background: '#FDF2F8', padding: '0.1rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>
                {c.role}
              </span>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.625rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', color: '#64748B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={13} color="#94A3B8" />
                <span style={{ color: '#1E293B', fontWeight: 600 }}>{c.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={13} color="#94A3B8" />
                <span>{c.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={13} color="#94A3B8" />
                <span>{c.location}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.625rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '0.35rem', color: '#94A3B8' }}>
                <Mail size={12} />
                <Phone size={12} />
                <MessageSquare size={12} />
                <Globe size={12} />
                <Share2 size={12} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', fontWeight: 700, color: '#1E293B' }}>
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <span>{c.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
        <button
          className="btn btn-sm"
          style={{ background: '#FF5B37', color: '#FFFFFF', fontWeight: 700, fontSize: '0.8125rem', borderRadius: 'var(--radius-md)', padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          onClick={() => showToast('All 12 contacts loaded.', 'info')}
        >
          <RotateCw size={14} /> Load More
        </button>
      </div>

      <AddLeadModal
        isOpen={isAddContactModalOpen}
        onClose={() => setIsAddContactModalOpen(false)}
      />
    </div>
  );
};
