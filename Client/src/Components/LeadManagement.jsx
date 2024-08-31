
import { useState, useEffect } from 'react';
import { getLeads, createLead } from '../Services/leadService';

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({ leadName: '', contactInfo: '', source: '' });

  useEffect(() => {
    const fetchLeads = async () => {
      const res = await getLeads();
      setLeads(res.data);
    };
    fetchLeads();
  }, []);

  const handleCreateLead = async () => {
    await createLead(newLead);
    setNewLead({ leadName: '', contactInfo: '', source: '' });
    const res = await getLeads();
    setLeads(res.data);
  };

  return (
    <div>
      <h2>Lead Management</h2>
      <ul>
        {leads.map((lead) => (
          <li key={lead._id}>{lead.leadName} - {lead.status}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Lead Name"
          value={newLead.leadName}
          onChange={(e) => setNewLead({ ...newLead, leadName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={newLead.contactInfo}
          onChange={(e) => setNewLead({ ...newLead, contactInfo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Source"
          value={newLead.source}
          onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
        />
        <button onClick={handleCreateLead}>Create Lead</button>
      </div>
    </div>
  );
};

export default LeadManagement;
