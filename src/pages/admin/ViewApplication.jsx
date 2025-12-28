import React, { useState } from "react";
import {
    X, CheckCircle, XCircle, AlertCircle, FileText,
    Download, ExternalLink, MapPin, Building2, CreditCard,
    User, Phone, Mail, Clock, Shield
} from "lucide-react";

const ViewApplication = ({ application, onClose, onApprove, onReject }) => {
    const [adminNote, setAdminNote] = useState("");
    const [actionLoading, setActionLoading] = useState(false);

    // If no application selected, don't render
    if (!application) return null;

    // --- HANDLERS ---
    const handleAction = (type) => {
        if (type === 'REJECT' && !adminNote.trim()) {
            alert("Please provide a reason for rejection in the comments.");
            return;
        }

        setActionLoading(true);
        // Simulate API call
        setTimeout(() => {
            setActionLoading(false);
            if (type === 'APPROVE') onApprove(application.id, adminNote);
            if (type === 'REJECT') onReject(application.id, adminNote);
        }, 1500);
    };

    return (
        // OVERLAY BACKGROUND
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

            {/* MODAL CONTAINER */}
            <div className="bg-white w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* --- 1. HEADER (Sticky) --- */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-gray-900">Application Review</h2>
                            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full border border-orange-200 uppercase">
                                Pending
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">ID: #{application.id || "REQ-2025-001"} • Submitted on {application.date || "28 Dec 2025"}</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* --- 2. SCROLLABLE CONTENT --- */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gray-50 space-y-6">

                    {/* SECTION: APPLICANT IDENTITY */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <SectionTitle icon={User} title="Provider Profile" />
                        <div className="flex items-start gap-6 mt-4">
                            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 uppercase border-4 border-white shadow-sm shrink-0">
                                {application.name?.charAt(0) || "U"}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 w-full">
                                <InfoField label="Full Name" value={application.name || "Prince Kumar"} />
                                <InfoField label="Email" value={application.email || "prince@example.com"} icon={Mail} />
                                <InfoField label="Phone" value={application.phone || "+91 98765 43210"} icon={Phone} />
                                <InfoField label="Role Applied" value="Kitchen Partner" />
                            </div>
                        </div>
                    </div>

                    {/* SECTION: KITCHEN & ADDRESS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Kitchen Info */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <SectionTitle icon={Building2} title="Kitchen Details" />
                            <div className="space-y-4 mt-4">
                                <InfoField label="Kitchen Name" value={application.kitchenName || "Prince's Kitchen"} large />
                                <InfoField label="Kitchen Status" value="Under Verification" />
                            </div>
                        </div>

                        {/* Address Info */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <SectionTitle icon={MapPin} title="Registered Address" />
                            <div className="space-y-2 mt-4">
                                <p className="text-sm font-medium text-gray-900 leading-relaxed">
                                    {application.address?.streetAddress || "Flat 101, Galaxy Apartment"}, <br />
                                    {application.address?.landmark && <span className="text-gray-500 text-xs">Landmark: {application.address.landmark}<br /></span>}
                                    {application.address?.city || "Patna"}, {application.address?.state || "Bihar"} - {application.address?.postalCode || "800001"}
                                </p>
                                <div className="pt-2">
                                    <button className="text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline">
                                        <ExternalLink size={12} /> View on Map
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION: BANKING & KYC */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <SectionTitle icon={Shield} title="Legal & Financial Verification" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                            {/* Bank Card Visual */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10"><CreditCard size={100} /></div>
                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Bank Account Details</p>
                                <p className="text-xl font-mono tracking-widest mb-4">XXXX XXXX 4589</p>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase">IFSC Code</p>
                                        <p className="font-bold">SBIN0001234</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-400 uppercase">Bank Name</p>
                                        <p className="font-bold">State Bank of India</p>
                                    </div>
                                </div>
                            </div>

                            {/* Documents Grid */}
                            <div className="space-y-4">
                                <DocumentRow title="PAN Card" id="ABCDE1234F" status="Verified" />
                                <DocumentRow title="Aadhar Card" id="1234 5678 9012" status="Pending Check" />
                                <DocumentRow title="FSSAI License" id="-" status="Not Uploaded" isMissing />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 3. FOOTER ACTIONS (Sticky) --- */}
                <div className="bg-white border-t border-gray-200 p-6 z-10">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">

                        {/* Admin Comment Box */}
                        <div className="w-full md:w-2/3">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                                Admin Remarks / Rejection Reason
                            </label>
                            <textarea
                                value={adminNote}
                                onChange={(e) => setAdminNote(e.target.value)}
                                placeholder="Write a note to the applicant..."
                                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 h-20 resize-none"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="w-full md:w-1/3 flex flex-col gap-3">
                            <button
                                onClick={() => handleAction('APPROVE')}
                                disabled={actionLoading}
                                className="w-full bg-green-600 text-white py-2.5 rounded-lg font-bold shadow-sm hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {actionLoading ? <Clock size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                                Approve Application
                            </button>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleAction('REJECT')}
                                    disabled={actionLoading}
                                    className="flex-1 border border-red-200 text-red-600 bg-red-50 py-2.5 rounded-lg font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <XCircle size={18} /> Reject
                                </button>
                                <button
                                    onClick={onClose}
                                    className="flex-1 border border-gray-200 text-gray-600 bg-white py-2.5 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- HELPER COMPONENTS ---

const SectionTitle = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 text-gray-800 pb-2 border-b border-gray-100">
        <Icon size={18} className="text-orange-600" />
        <h3 className="font-bold text-sm uppercase tracking-wide">{title}</h3>
    </div>
);

const InfoField = ({ label, value, icon: Icon, large }) => (
    <div>
        <p className="text-xs text-gray-400 font-medium mb-0.5 flex items-center gap-1">
            {Icon && <Icon size={10} />} {label}
        </p>
        <p className={`font-bold text-gray-900 ${large ? 'text-lg' : 'text-sm'}`}>{value}</p>
    </div>
);

const DocumentRow = ({ title, id, status, isMissing }) => (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all group">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isMissing ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-600'}`}>
                {isMissing ? <AlertCircle size={16} /> : <FileText size={16} />}
            </div>
            <div>
                <p className="text-sm font-bold text-gray-800">{title}</p>
                <p className="text-xs text-gray-500 font-mono">{id}</p>
            </div>
        </div>

        {!isMissing && (
            <div className="flex items-center gap-2">
                <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Preview">
                    <ExternalLink size={16} />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors" title="Download">
                    <Download size={16} />
                </button>
            </div>
        )}
    </div>
);

export default ViewApplication;