export const fmtDate = value => value ? new Date(value).toLocaleDateString(undefined, {year:'numeric',month:'short',day:'numeric'}) : '—';
export const fmtDateTime = value => value ? new Date(value).toLocaleString(undefined, {month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '—';
export const fmtSize = bytes => bytes < 1024 ? `${bytes} B` : bytes < 1048576 ? `${(bytes/1024).toFixed(1)} KB` : `${(bytes/1048576).toFixed(1)} MB`;
export const fileType = name => (name.split('.').pop() || 'FILE').toUpperCase();
export const newId = prefix => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
export const csvEscape = value => `"${String(value ?? '').replaceAll('"','""')}"`;
export const downloadText = (name, content, type='text/plain') => {
  const blob = new Blob([content], {type});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
};
