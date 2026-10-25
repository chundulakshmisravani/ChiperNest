import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { seedDocuments, seedShares, seedAudit, seedUsers } from './data/seed';
import AppLayout from './layouts/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import Share from './pages/Share';
import Access from './pages/Access';
import Audit from './pages/Audit';
import UsersPage from './pages/Users';
import Settings from './pages/Settings';
import DocumentModal from './components/DocumentModal';
import { newId } from './utils/helpers';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

function Toasts({items,onRemove}) {
 return <div className="toast-stack" aria-live="polite">{items.map(t=><div key={t.id} className={`toast toast-${t.type}`}><span>{t.type==='error'?<AlertCircle size={18}/>:t.type==='info'?<Info size={18}/>:<CheckCircle2 size={18}/>}</span><p>{t.message}</p><button className="icon-btn" onClick={()=>onRemove(t.id)} aria-label="Dismiss notification"><X size={15}/></button></div>)}</div>;
}
export default function App() {
 const [user,setUser]=useLocalStorage('cn_user',null);
 const [role,setRole]=useLocalStorage('cn_role','Admin');
 const [documents,setDocuments]=useLocalStorage('cn_documents',seedDocuments);
 const [shares,setShares]=useLocalStorage('cn_shares',seedShares);
 const [audit,setAudit]=useLocalStorage('cn_audit',seedAudit);
 const [users,setUsers]=useLocalStorage('cn_users',seedUsers);
 const [theme,setTheme]=useLocalStorage('cn_theme','dark');
 const [notifications,setNotifications]=useLocalStorage('cn_notifications',{security:true,shares:true,product:false});
 const [toasts,setToasts]=React.useState([]);
 const [openedDoc,setOpenedDoc]=React.useState(null);
 const navigate=useNavigate();
 const toast=React.useCallback((message,type='success')=>{const id=newId('toast');setToasts(p=>[...p,{id,message,type}]);window.setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),3800)},[]);
 const removeToast=id=>setToasts(p=>p.filter(t=>t.id!==id));
 const addAudit=React.useCallback((action,doc,actor,outcome='Success',detail='')=>{setAudit(p=>[{id:newId('aud'),at:new Date().toISOString(),action,documentId:doc?.id||'',document:doc?.name||'—',actor:actor||user?.name||'Maya Chen',outcome,detail},...p])},[setAudit,user]);
 const login=info=>{setUser(info);const known=users.find(u=>u.email.toLowerCase()===info.email.toLowerCase());setRole(known?.role||'Admin');addAudit('Login',null,info.name,'Success','Demo session started.')};
 const logout=()=>{addAudit('Logout',null,user?.name||'Maya Chen','Success','Demo session ended.');setUser(null);navigate('/login');toast('You have signed out.','info')};
 const can=action=>{if(role==='Admin')return true;if(role==='Editor')return ['upload','share','editAccess'].includes(action);return false};
 const changeRoleUser=next=>{setUser(next);const known=users.find(u=>u.email===next.email);setRole(known?.role||'Viewer');};
 const guarded=(element,allowed=true)=>user?(allowed?element:<Navigate to="/" replace/>):<Navigate to="/login" replace/>;
 return <div className={`app-root theme-${theme}`}><Routes>
  <Route path="/login" element={user?<Navigate to="/" replace/>:<Login onLogin={login} toast={toast}/>}/>
  <Route element={user?<AppLayout user={user} role={role} setRole={setRole} onLogout={logout} theme={theme} setTheme={setTheme} toast={toast}/>:<Navigate to="/login" replace/>}>
   <Route index element={<Dashboard documents={documents} shares={shares} audit={audit} openDoc={setOpenedDoc} can={can} toast={toast}/>}/>
   <Route path="documents" element={<Documents documents={documents} setDocuments={setDocuments} shares={shares} setShares={setShares} addAudit={addAudit} openDoc={setOpenedDoc} can={can} toast={toast}/>}/>
   <Route path="share" element={<Share documents={documents} shares={shares} setShares={setShares} addAudit={addAudit} can={can} toast={toast}/>}/>
   <Route path="access" element={<Access documents={documents} shares={shares} setShares={setShares} addAudit={addAudit} can={can} toast={toast}/>}/>
   <Route path="audit" element={<Audit audit={audit} documents={documents} toast={toast}/>}/>
   <Route path="users" element={<UsersPage users={users} setUsers={setUsers} currentUser={user} setCurrentUser={changeRoleUser} can={can} toast={toast} addAudit={addAudit}/>}/>
   <Route path="settings" element={<Settings user={user} setUser={setUser} theme={theme} setTheme={setTheme} notifications={notifications} setNotifications={setNotifications} onLogout={logout} toast={toast}/>}/>
   <Route path="*" element={<Navigate to="/" replace/>}/>
  </Route>
 </Routes>{openedDoc&&user&&<DocumentModal document={openedDoc} shares={shares} onClose={()=>setOpenedDoc(null)} onShare={id=>{setOpenedDoc(null);navigate(`/share?document=${id}`)}}/>}<Toasts items={toasts} onRemove={removeToast}/></div>;
}
