import React from 'react';
import { Ticket, ChevronRight, LogIn, Users } from 'lucide-react';

const TicketDetails = ({
  ticketPrice,
  setTicketPrice,
  approval,
  setApproval,
  capacity,
  setCapacity,
  showPriceModal,
  setShowPriceModal,
  showCapacityModal,
  setShowCapacityModal,
  isSubmitting,
  isSubmittingDraft,
  handleSubmit,
}) => {
  return (
    <div className="space-y-4">
      <label className="text-sm text-white/80 block">Ticket Details</label>

      <div className="rounded-xl bg-[#2b2b2b] p-2 divide-y divide-white/10">
        {/* Ticket Price */}
        <div
          onClick={() => setShowPriceModal(true)}
          className="flex items-center justify-between px-3 py-3 cursor-pointer"
        >
          <div className="flex items-center gap-3 text-white">
            <Ticket size={16} />
            <span className="text-sm">Tickets</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/70">
            {ticketPrice ? `₹${ticketPrice}` : 'Free'}
            <ChevronRight size={14} />
          </div>
        </div>

        {/* Approval Toggle */}
        <div
          onClick={() => setApproval(!approval)}
          className="flex items-center justify-between px-3 py-3 cursor-pointer"
        >
          <div className="flex items-center gap-3 text-white">
            <LogIn size={16} />
            <span className="text-sm">Approval for Entry</span>
          </div>
          <div
            className={`w-14 h-6 rounded-full flex items-center justify-between px-1 text-xs font-semibold ${
              approval ? 'bg-white text-black' : 'bg-white/30 text-white/70'
            } relative transition-all`}
          >
            <span>{approval ? 'ON' : ''}</span>
            <span>{!approval ? 'OFF' : ''}</span>
            <div
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-black transition-transform ${
                approval ? 'translate-x-8' : 'translate-x-0'
              }`}
            />
          </div>
        </div>

        {/* Capacity */}
        <div
          onClick={() => setShowCapacityModal(true)}
          className="flex items-center justify-between px-3 py-3 cursor-pointer"
        >
          <div className="flex items-center gap-3 text-white">
            <Users size={16} />
            <span className="text-sm">Total Capacity</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/70">
            {capacity || 'Unlimited'}
            <ChevronRight size={14} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          className={`w-full py-3 rounded-xl font-semibold transition ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
          disabled={isSubmitting}
          onClick={() => handleSubmit('PUBLISHED')}
        >
          {isSubmitting ? 'Creating...' : 'Create and Publish'}
        </button>

        <button
          className={`w-full py-3 rounded-xl font-medium transition ${
            isSubmittingDraft
              ? 'bg-gray-400 text-white/50 cursor-not-allowed'
              : 'bg-[#2b2b2b] text-white border border-white/20 hover:bg-white/10'
          }`}
          disabled={isSubmittingDraft}
          onClick={() => handleSubmit('DRAFT')}
        >
          {isSubmittingDraft ? 'Saving...' : 'Save as Draft'}
        </button>
      </div>

      {/* Price Modal */}
      {showPriceModal && (
        <div className="fixed p-4 inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#111] border border-white/20 rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-white text-lg font-semibold mb-4">Set Ticket Price</h3>
            <input
              type="number"
              placeholder="₹ Enter Price"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white text-sm mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPriceModal(false)}
                className="px-4 py-2 text-sm rounded-md bg-white text-black hover:bg-gray-200"
              >
                Save
              </button>
              <button
                onClick={() => setShowPriceModal(false)}
                className="px-4 py-2 text-sm text-white/60 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Capacity Modal */}
      {showCapacityModal && (
        <div className="fixed p-4 inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#111] border border-white/20 rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-white text-lg font-semibold mb-4">Set Capacity</h3>
            <input
              type="number"
              placeholder="Enter max attendees"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white text-sm mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCapacityModal(false)}
                className="px-4 py-2 text-sm rounded-md bg-white text-black hover:bg-gray-200"
              >
                Save
              </button>
              <button
                onClick={() => setShowCapacityModal(false)}
                className="px-4 py-2 text-sm text-white/60 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
