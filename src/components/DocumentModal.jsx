import React from 'react';
import { Download, FileText, CalendarDays, UserRound, Shield, ExternalLink } from 'lucide-react';
import { Modal, Badge, IconForFile, Button } from './UI';
import { fmtDate, fmtSize, downloadText } from '../utils/helpers';

export default function DocumentModal({document:doc,onClose,shares=[],onShare}) {
  if(!doc) return null;
  const related = shares.filter(s=>s.documentId===doc.id && s.status==='Active');
  const preview = () => {
    const text = doc.preview || `${doc.name}\n\nNo preview content is available for this file in the demo.`;
    downloadText(`${doc.name.replace(/\.[^.]+$/,'')}-preview.txt`,text);
  };
  return <Modal title="Document details" onClose={onClose} wide>
    <div className="document-detail">
      <div className="detail-file"><IconForFile name={doc.name}/><div><h3>{doc.name}</h3><p>{doc.description || 'No description added.'}</p></div><Badge tone={doc.status==='Shared'?'green':'neutral'}>{doc.status}</Badge></div>
      <div className="detail-grid">
        <div><CalendarDays size={17}/><span><small>Uploaded</small><b>{fmtDate(doc.uploadedAt)}</b></span></div>
        <div><UserRound size={17}/><span><small>Owner</small><b>{doc.owner}</b></span></div>
        <div><FileText size={17}/><span><small>File type / size</small><b>{doc.type} · {fmtSize(doc.size)}</b></span></div>
        <div><Shield size={17}/><span><small>Active recipients</small><b>{related.length} authorized</b></span></div>
      </div>
      <div className="preview-panel"><div className="section-title"><h3>Quick preview</h3><Button variant="secondary" size="sm" onClick={preview}><Download size={15}/> Export preview</Button></div><pre>{doc.preview || 'Preview unavailable for this file type.'}</pre></div>
      <div className="modal-actions"><Button variant="secondary" onClick={onClose}>Close</Button><Button onClick={()=>onShare(doc.id)}><ExternalLink size={16}/> Share document</Button></div>
    </div>
  </Modal>;
}
