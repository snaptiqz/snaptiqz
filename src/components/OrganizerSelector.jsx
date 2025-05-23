import React, { useEffect, useRef, useState } from 'react';
import { ScanFace, ChevronDown, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

const OrganizerSelector = ({
  selectedOrganizer,
  setSelectedOrganizer,
  organizationId,
  setOrganizationId,
  organizations,
  isLoading,
  createOrganization,
}) => {
  const dropdownRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreate = async () => {
    if (!newOrgName.trim()) {
      toast.error('Please enter a valid organization name.');
      return;
    }

    try {
      const res = await createOrganization(newOrgName.trim());
      const { id } = res;
      setSelectedOrganizer(newOrgName.trim());
      setOrganizationId(id);
      setNewOrgName('');
      setShowAddPopup(false);
    } catch (err) {
      console.error('Org creation failed', err);
      toast.error('Could not create organization.');
    }
  };

  return (
    <div className="flex-1 relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full h-[64px] px-4 py-2 bg-[#2b2b2b] border border-white/20 rounded-xl flex items-center justify-between text-sm text-white"
      >
        <div className="flex items-center gap-3">
          <ScanFace size={20} />
          <div className="leading-tight text-left">
            <div className="text-sm font-medium">Organizer</div>
            <div className="text-xs opacity-70">({selectedOrganizer})</div>
          </div>
        </div>
        <ChevronDown size={16} />
      </button>

      {/* Dropdown List */}
      {showDropdown && (
        <div className="absolute left-0 mt-2 w-full bg-[#2b2b2b] border border-white/20 rounded-xl shadow-xl z-30 text-sm">
          <button
            onClick={() => {
              setSelectedOrganizer('Organizer (Me)');
              setOrganizationId('');
              setShowDropdown(false);
            }}
            className={`w-full flex items-center gap-2 px-4 py-3 hover:bg-white/10 ${
              selectedOrganizer === 'Organizer (Me)' ? 'bg-white/10' : ''
            }`}
          >
            <ScanFace size={18} />
            Organizer (Me)
          </button>

          <div className="border-t border-white/30" />

          {isLoading ? (
            <div className="px-4 py-3 text-white/60">Loading organizations...</div>
          ) : organizations.length > 0 ? (
            organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => {
                  setSelectedOrganizer(org.name);
                  setOrganizationId(org.id);
                  setShowDropdown(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-3 hover:bg-white/10 ${
                  selectedOrganizer === org.name ? 'bg-white/10 text-blue-400' : 'text-white'
                }`}
              >
                <ScanFace size={18} />
                {org.name}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-white/60">No organizations found</div>
          )}

          <div className="border-t border-white/30" />

          <button
            onClick={() => {
              setShowDropdown(false);
              setShowAddPopup(true);
            }}
            className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/10"
          >
            <Plus size={18} />
            Add New Organization
          </button>
        </div>
      )}

      {/* Add Org Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-[#1e1e1e] border border-white/20 rounded-xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-white text-lg font-semibold">Create New Organization</h2>
            <input
              type="text"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
              placeholder="Organization Name"
              className="w-full px-4 py-2 bg-transparent border border-white/20 text-white rounded-lg placeholder-white/40"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddPopup(false)}
                className="px-4 py-2 text-sm text-white bg-white/10 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 text-sm bg-white text-black rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerSelector;
