import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Files, Share2, KeyRound, ScrollText, Users, Settings, Menu, PanelLeftClose, Bell, ChevronDown, LogOut, ShieldCheck } from 'lucide-react';
import { Logo } from '../components/UI';

const nav = [
  {to:'/',label:'Overview',icon:LayoutDashboard},
  {to:'/documents',label:'Document Vault',icon:Files},
  {to:'/share',label:'Share Document',icon:Share2},
  {to:'/access',label:'Access Management',icon:KeyRound},
  {to:'/audit',label:'Audit Trail',icon:ScrollText},
  {to:'/users',label:'User & Roles',icon:Users},
  {to:'/settings',label:'Settings',icon:Settings}
];
export default function AppLayout({user,role,setRole,onLogout,theme,setTheme,toast}) {
  const [collapsed,setCollapsed]=React.useState(false);
  const [mobileOpen,setMobileOpen]=React.useState(false);
  const location=useLocation(); const navigate=useNavigate();
  const title=nav.find(n=>n.to===location.pathname)?.label || 'Overview';
  return <div className={`app-shell ${collapsed?'sidebar-collapsed':''} ${theme==='light'?'theme-light':''}`}>
    {mobileOpen && <button className="mobile-scrim" onClick={()=>setMobileOpen(false)} aria-label="Close navigation"/>}
    <aside className={`sidebar ${mobileOpen?'mobile-open':''}`}>
      <div className="sidebar-brand"><Logo/><button className="collapse-btn" onClick={()=>setCollapsed(!collapsed)} aria-label="Toggle sidebar"><PanelLeftClose size={18}/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="side-nav">{nav.map(item=>{const Icon=item.icon;return <NavLink key={item.to} to={item.to} end={item.to==='/'} onClick={()=>setMobileOpen(false)} className={({isActive})=>`nav-link ${isActive?'active':''}`}><Icon size={19}/><span>{item.label}</span>{item.to==='/audit' && <i className="nav-dot"/>}</NavLink>})}</nav>
      <div className="sidebar-bottom"><div className="secure-card"><div className="secure-icon"><ShieldCheck size={17}/></div><div><b>Vault protected</b><small>Demo environment</small></div></div><button className="nav-link logout-link" onClick={onLogout}><LogOut size={18}/><span>Sign out</span></button></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="topbar-left"><button className="mobile-menu icon-btn" onClick={()=>setMobileOpen(true)} aria-label="Open navigation"><Menu size={21}/></button><span className="crumb">Workspace</span><span className="crumb-sep">/</span><b>{title}</b></div><div className="topbar-right"><span className="environment"><span/> Demo environment</span><button className="icon-btn notification-btn" onClick={()=>toast('You are all caught up.','info')} aria-label="Notifications"><Bell size={19}/><i/></button><div className="top-user"><div className="avatar">{(user?.name||'M').split(' ').map(n=>n[0]).join('').slice(0,2)}</div><div className="top-user-info"><b>{user?.name||'Maya Chen'}</b><small>{role}</small></div><button className="icon-btn" onClick={()=>navigate('/settings')} aria-label="Open profile settings"><ChevronDown size={16}/></button></div></div></header>
      <div className="content-area"><Outlet/></div>
      <footer className="app-footer"><span>© 2026 CipherNest</span><span><ShieldCheck size={14}/> Local demo · Not production security</span></footer>
    </main>
  </div>;
}
