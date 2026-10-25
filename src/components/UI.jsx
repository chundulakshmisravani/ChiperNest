import React from 'react';
import { X, ShieldCheck, FileText, FileImage, FileSpreadsheet, File, Search, ChevronDown } from 'lucide-react';
import { fileType } from '../utils/helpers';

export function Logo({small=false}) {
  return <div className={`brand ${small?'brand-small':''}`}><span className="brand-mark"><ShieldCheck size={20}/></span>{!small && <span>Cipher<span className="brand-light">Nest</span></span>}</div>;
}
export function IconForFile({name=''}) {
  const ext = fileType(name);
  const Icon = ['PNG','JPG','JPEG','WEBP','SVG'].includes(ext) ? FileImage : ['XLS','XLSX','CSV'].includes(ext) ? FileSpreadsheet : ['PDF','DOC','DOCX','TXT'].includes(ext) ? FileText : File;
  return <span className={`file-icon file-${ext.toLowerCase()}`}><Icon size={18}/></span>;
}
export function Badge({children, tone='neutral'}) { return <span className={`badge badge-${tone}`}>{children}</span>; }
export function PageHeader({eyebrow,title,description,actions}) {
  return <div className="page-header"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description && <p>{description}</p>}</div>{actions && <div className="header-actions">{actions}</div>}</div>;
}
export function Button({children,variant='primary',size='',...props}) { return <button className={`btn btn-${variant} ${size?`btn-${size}`:''}`} {...props}>{children}</button>; }
export function SearchBox({value,onChange,placeholder='Search...'}) {
  return <label className="search-box"><Search size={17}/><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>{value && <button type="button" className="icon-btn" onClick={()=>onChange('')} aria-label="Clear search"><X size={15}/></button>}</label>;
}
export function Modal({title,children,onClose,wide=false}) {
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><section className={`modal ${wide?'modal-wide':''}`} role="dialog" aria-modal="true" aria-label={title}><div className="modal-head"><h2>{title}</h2><button className="icon-btn" onClick={onClose} aria-label="Close dialog"><X size={19}/></button></div>{children}</section></div>;
}
export function EmptyState({title,description,action}) { return <div className="empty-state"><div className="empty-icon"><FileText size={24}/></div><h3>{title}</h3><p>{description}</p>{action}</div>; }
export function SelectField({label,value,onChange,children,...props}) { return <label className="field"><span>{label}</span><div className="select-wrap"><select value={value} onChange={e=>onChange(e.target.value)} {...props}>{children}</select><ChevronDown size={15}/></div></label>; }
export function Field({label, ...props}) { return <label className="field"><span>{label}</span><input {...props}/></label>; }
