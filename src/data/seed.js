const ago = (days, hours = 10) => new Date(Date.now() - days * 86400000 - hours * 3600000).toISOString();

export const seedDocuments = [
  { id:'doc-1001', name:'Q4 Financial Overview.pdf', type:'PDF', size:2480000, owner:'Maya Chen', uploadedAt:ago(0,2), status:'Shared', description:'Quarterly financial performance and forecasts.', preview:'Q4 Financial Overview\n\nRevenue increased 18% quarter over quarter. Operating margin: 24%.\n\nThis is a demo preview.' },
  { id:'doc-1002', name:'Product Roadmap 2027.docx', type:'DOCX', size:860000, owner:'Jordan Lee', uploadedAt:ago(1,4), status:'Shared', description:'Product milestones and delivery plans.', preview:'Product Roadmap 2027\n\nQ1: Discovery and research\nQ2: Private beta\nQ3: General availability' },
  { id:'doc-1003', name:'Security Review.txt', type:'TXT', size:18000, owner:'Maya Chen', uploadedAt:ago(2,1), status:'Private', description:'Internal security review notes.', preview:'Security Review\n\n- Rotate credentials quarterly\n- Review access grants monthly\n- Document incident response owners' },
  { id:'doc-1004', name:'Brand Guidelines.png', type:'PNG', size:1240000, owner:'Avery Patel', uploadedAt:ago(4,7), status:'Shared', description:'Brand palette and usage guidance.', preview:'' },
  { id:'doc-1005', name:'Vendor Agreement.pdf', type:'PDF', size:392000, owner:'Jordan Lee', uploadedAt:ago(6,5), status:'Private', description:'Vendor contract and renewal terms.', preview:'Vendor Agreement\n\nDemo document placeholder. Refer to the source file for full terms.' },
  { id:'doc-1006', name:'Incident Response Plan.docx', type:'DOCX', size:540000, owner:'Maya Chen', uploadedAt:ago(9,3), status:'Shared', description:'Incident response procedures and escalation contacts.', preview:'Incident Response Plan\n\n1. Identify\n2. Contain\n3. Eradicate\n4. Recover\n5. Review' }
];

export const seedUsers = [
  { id:'usr-1', name:'Maya Chen', email:'maya@ciphernest.demo', role:'Admin', team:'Security' },
  { id:'usr-2', name:'Jordan Lee', email:'jordan@ciphernest.demo', role:'Editor', team:'Product' },
  { id:'usr-3', name:'Avery Patel', email:'avery@ciphernest.demo', role:'Editor', team:'Design' },
  { id:'usr-4', name:'Noah Williams', email:'noah@ciphernest.demo', role:'Viewer', team:'Finance' },
  { id:'usr-5', name:'Olivia Garcia', email:'olivia@ciphernest.demo', role:'Viewer', team:'Operations' }
];

export const seedShares = [
  { id:'shr-1', documentId:'doc-1001', recipientName:'Noah Williams', email:'noah@ciphernest.demo', role:'Viewer', grantedAt:ago(4), status:'Active', expiresAt:'', permissions:{download:true, print:false, reshare:false} },
  { id:'shr-2', documentId:'doc-1002', recipientName:'Avery Patel', email:'avery@ciphernest.demo', role:'Editor', grantedAt:ago(3), status:'Active', expiresAt:'', permissions:{download:true, print:true, reshare:false} },
  { id:'shr-3', documentId:'doc-1004', recipientName:'Olivia Garcia', email:'olivia@ciphernest.demo', role:'Viewer', grantedAt:ago(2), status:'Active', expiresAt:'', permissions:{download:false, print:false, reshare:false} },
  { id:'shr-4', documentId:'doc-1005', recipientName:'Noah Williams', email:'noah@ciphernest.demo', role:'Viewer', grantedAt:ago(8), status:'Revoked', expiresAt:'', permissions:{download:false, print:false, reshare:false} }
];

export const seedAudit = [
  { id:'aud-1', at:ago(0,1), action:'Document viewed', documentId:'doc-1001', document:'Q4 Financial Overview.pdf', actor:'Maya Chen', outcome:'Success', detail:'Opened document details.' },
  { id:'aud-2', at:ago(0,2), action:'Permission granted', documentId:'doc-1001', document:'Q4 Financial Overview.pdf', actor:'Noah Williams', outcome:'Success', detail:'Viewer access granted.' },
  { id:'aud-3', at:ago(1,3), action:'Document uploaded', documentId:'doc-1002', document:'Product Roadmap 2027.docx', actor:'Jordan Lee', outcome:'Success', detail:'Document added to the vault.' },
  { id:'aud-4', at:ago(2,4), action:'Access revoked', documentId:'doc-1005', document:'Vendor Agreement.pdf', actor:'Noah Williams', outcome:'Success', detail:'Existing access revoked by admin.' },
  { id:'aud-5', at:ago(3,2), action:'Login', documentId:'', document:'—', actor:'Maya Chen', outcome:'Success', detail:'Demo session started.' },
  { id:'aud-6', at:ago(4,6), action:'Permission changed', documentId:'doc-1002', document:'Product Roadmap 2027.docx', actor:'Avery Patel', outcome:'Success', detail:'Role updated to Editor.' },
  { id:'aud-7', at:ago(5,3), action:'Access attempt', documentId:'doc-1005', document:'Vendor Agreement.pdf', actor:'Noah Williams', outcome:'Blocked', detail:'Attempt after revocation recorded in demo.' },
  { id:'aud-8', at:ago(7,4), action:'Document shared', documentId:'doc-1004', document:'Brand Guidelines.png', actor:'Olivia Garcia', outcome:'Success', detail:'Viewer access created.' }
];
