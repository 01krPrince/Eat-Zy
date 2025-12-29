import React, { useState } from "react";
import {
    Store, MapPin, User, Mail, Phone, UploadCloud, FileText,
    CreditCard, ShieldCheck, CheckCircle, AlertCircle, ArrowRight, X, Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// IMPORT YOUR HELPER FUNCTIONS
import { registerProvider } from "../service/publicServices/providerService";
import { uploadToCloudinary } from "../utils/uploadImage";

const AddKitchenPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // 1. STATE
    // const [formData, setFormData] = useState({
    //     name: "",
    //     email: "",
    //     phone: "",
    //     kitchenName: "",
    //     address: {
    //         streetAddress: "",
    //         city: "",
    //         state: "",
    //         postalCode: "",
    //         country: "India",
    //         landmark: "",
    //         additionalDetails: ""
    //     },
    //     bank: {
    //         accountNumber: "",
    //         ifscCode: "",
    //         bankName: "",
    //     },
    //     kyc: {
    //         panNumber: "",
    //         aadharNumber: "",
    //     }
    // });

    const [formData, setFormData] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "9876543210", // Indian phone number format
        kitchenName: "Tasty Kitchen",
        address: {
            streetAddress: "123 Main Street",
            city: "Mumbai",
            state: "Maharashtra",
            postalCode: "400001",
            country: "India",
            landmark: "Near Gateway of India",
            additionalDetails: "Apartment 405, 4th Floor"
        },
        bank: {
            accountNumber: "1234567890123456", // 16-digit account number
            ifscCode: "SBIN0000123", // Valid IFSC Code format (example: State Bank of India)
            bankName: "State Bank of India"
        },
        kyc: {
            panNumber: "ABCDE1234F", // Valid PAN number
            aadharNumber: "123456789012", // Valid Aadhaar number format
        }
    });


    const [files, setFiles] = useState({
        panDoc: null,
        aadharDoc: null
    });

    const [errors, setErrors] = useState({});

    // 2. HANDLERS
    const handleChange = (section, field, value) => {
        if (section === "root") {
            setFormData(prev => ({ ...prev, [field]: value }));
        } else {
            setFormData(prev => ({
                ...prev,
                [section]: { ...prev[section], [field]: value }
            }));
        }
        const errorKey = section === "root" ? field : `${section}.${field}`;
        if (errors[errorKey]) setErrors(prev => ({ ...prev, [errorKey]: null }));
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("File size must be less than 2MB");
                return;
            }
            setFiles(prev => ({ ...prev, [fieldName]: file }));
            if (errors[`files.${fieldName}`]) {
                setErrors(prev => ({ ...prev, [`files.${fieldName}`]: null }));
            }
        }
    };

    const removeFile = (fieldName) => {
        setFiles(prev => ({ ...prev, [fieldName]: null }));
    };

    // 3. VALIDATION
    const validate = () => {
        const newErrors = {};
        const phoneRegex = /^[6-9]\d{9}$/;
        const pincodeRegex = /^[1-9][0-9]{5}$/;
        const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
        const aadharRegex = /^\d{12}$/;

        if (!formData.name) newErrors.name = "Required";
        if (!formData.email) newErrors.email = "Required";
        if (!formData.phone || !phoneRegex.test(formData.phone)) newErrors.phone = "Invalid Phone";
        if (!formData.kitchenName) newErrors.kitchenName = "Required";

        if (!formData.address.streetAddress) newErrors["address.streetAddress"] = "Required";
        if (!formData.address.city) newErrors["address.city"] = "Required";
        if (!formData.address.state) newErrors["address.state"] = "Required";
        if (!formData.address.postalCode || !pincodeRegex.test(formData.address.postalCode)) newErrors["address.postalCode"] = "Invalid Pincode";

        if (!formData.bank.accountNumber) newErrors["bank.accountNumber"] = "Required";
        if (!formData.bank.ifscCode) newErrors["bank.ifscCode"] = "Required";

        if (!formData.kyc.panNumber || !panRegex.test(formData.kyc.panNumber)) newErrors["kyc.panNumber"] = "Invalid PAN format";
        if (!formData.kyc.aadharNumber || !aadharRegex.test(formData.kyc.aadharNumber)) newErrors["kyc.aadharNumber"] = "Invalid Aadhar (12 digits)";

        if (!files.panDoc) newErrors["files.panDoc"] = "Upload PAN Document";
        if (!files.aadharDoc) newErrors["files.aadharDoc"] = "Upload Aadhar Document";

        if (!agreedToTerms) newErrors["terms"] = "You must agree to terms";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 4. MAIN SUBMISSION LOGIC (Cloudinary Integration)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        try {
            // STEP 1: Upload Files to Cloudinary
            // We use a specific folder name 'kitchen_providers' to keep things organized
            let panUrl = null;
            let aadharUrl = null;

            if (files.panDoc) {
                panUrl = await uploadToCloudinary(files.panDoc, "kitchen_providers");
                if (!panUrl) throw new Error("Failed to upload PAN card.");
            }

            if (files.aadharDoc) {
                aadharUrl = await uploadToCloudinary(files.aadharDoc, "kitchen_providers");
                if (!aadharUrl) throw new Error("Failed to upload Aadhar card.");
            }

            // STEP 2: Construct the JSON Payload
            // Now we map the Cloudinary URLs to the DTO fields
            const providerPayload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                kitchenName: formData.kitchenName,
                address: formData.address,
                legalAndFinancialDetails: {
                    accountNumber: formData.bank.accountNumber,
                    ifscCode: formData.bank.ifscCode,
                    bankName: formData.bank.bankName,
                    panNumber: formData.kyc.panNumber,
                    aadharNumber: formData.kyc.aadharNumber,
                    // Attach the URLs here
                    panDocumentUrl: panUrl,
                    aadharDocumentUrl: aadharUrl
                }
            };

            // STEP 3: Send JSON to Backend
            console.log("Submitting Payload:", providerPayload);
            const result = await registerProvider(providerPayload);

            console.log("Registration Success:", result);
            alert("Application Submitted Successfully!");
            navigate('/dashboard');

        } catch (error) {
            console.error("Submission Failed:", error);
            let msg = error.message || "Something went wrong.";
            alert(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-10 text-center mt-10">
                    <h1 className="text-3xl font-bold text-gray-900">Partner Registration</h1>
                    <p className="mt-2 text-gray-500">
                        Join our network. Complete the KYC and Bank details to start receiving payments.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 1. BASIC DETAILS */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <SectionHeader icon={<Store />} title="Basic Details" color="orange" />
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Owner Name" value={formData.name} onChange={(e) => handleChange("root", "name", e.target.value)} error={errors.name} icon={<User size={18} />} />
                            <InputField label="Kitchen Name" value={formData.kitchenName} onChange={(e) => handleChange("root", "kitchenName", e.target.value)} error={errors.kitchenName} icon={<Store size={18} />} />
                            <InputField label="Email" type="email" value={formData.email} onChange={(e) => handleChange("root", "email", e.target.value)} error={errors.email} icon={<Mail size={18} />} />
                            <InputField label="Phone" type="tel" value={formData.phone} onChange={(e) => handleChange("root", "phone", e.target.value)} error={errors.phone} icon={<Phone size={18} />} maxLength={10} />
                        </div>
                    </div>

                    {/* 2. ADDRESS */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <SectionHeader icon={<MapPin />} title="Kitchen Location" color="blue" />
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <InputField label="Street Address" value={formData.address.streetAddress} onChange={(e) => handleChange("address", "streetAddress", e.target.value)} error={errors["address.streetAddress"]} />
                            </div>
                            <InputField label="City" value={formData.address.city} onChange={(e) => handleChange("address", "city", e.target.value)} error={errors["address.city"]} />
                            <InputField label="State" value={formData.address.state} onChange={(e) => handleChange("address", "state", e.target.value)} error={errors["address.state"]} />
                            <InputField label="Pincode" value={formData.address.postalCode} onChange={(e) => handleChange("address", "postalCode", e.target.value)} error={errors["address.postalCode"]} maxLength={6} />
                            <InputField label="Landmark (Optional)" value={formData.address.landmark} onChange={(e) => handleChange("address", "landmark", e.target.value)} />
                        </div>
                        <div className="col-span-full mb-2">
                            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-3 text-xs font-medium rounded-r-lg shadow-sm">
                                <Info size={16} strokeWidth={2.5} />
                                <span>
                                    <strong>Note:</strong> Services are currently restricted to <strong className="uppercase">India 🇮🇳</strong>.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 3. LEGAL & FINANCIAL */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <SectionHeader icon={<ShieldCheck />} title="Legal & Financial Details" color="green" />
                        <div className="p-6 space-y-8">
                            {/* Bank Details */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <CreditCard size={16} className="text-gray-500" /> Bank Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Account Number"
                                        value={formData.bank.accountNumber}
                                        onChange={(e) => handleChange("bank", "accountNumber", e.target.value)}
                                        error={errors["bank.accountNumber"]}
                                        type="password"
                                        placeholder="XXXXXXXXXXXX"
                                    />
                                    <InputField label="Re-enter Account Number" placeholder="Confirm Account Number" />
                                    <InputField
                                        label="IFSC Code"
                                        value={formData.bank.ifscCode}
                                        onChange={(e) => handleChange("bank", "ifscCode", e.target.value.toUpperCase())}
                                        error={errors["bank.ifscCode"]}
                                        placeholder="SBIN000XXXX"
                                        maxLength={11}
                                    />
                                    <InputField
                                        label="Bank Name"
                                        value={formData.bank.bankName}
                                        onChange={(e) => handleChange("bank", "bankName", e.target.value)}
                                        placeholder="e.g. State Bank of India"
                                    />
                                </div>
                            </div>
                            <div className="border-t border-gray-100"></div>

                            {/* KYC Documents */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <FileText size={16} className="text-gray-500" /> Identity Verification
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <InputField
                                            label="PAN Number"
                                            value={formData.kyc.panNumber}
                                            onChange={(e) => handleChange("kyc", "panNumber", e.target.value.toUpperCase())}
                                            error={errors["kyc.panNumber"]}
                                            placeholder="ABCDE1234F"
                                            maxLength={10}
                                        />
                                        <FileUpload
                                            label="Upload PAN Card (Image/PDF)"
                                            file={files.panDoc}
                                            onUpload={(e) => handleFileChange(e, "panDoc")}
                                            onRemove={() => removeFile("panDoc")}
                                            error={errors["files.panDoc"]}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <InputField
                                            label="Aadhar Number"
                                            value={formData.kyc.aadharNumber}
                                            onChange={(e) => handleChange("kyc", "aadharNumber", e.target.value)}
                                            error={errors["kyc.aadharNumber"]}
                                            placeholder="1234 5678 9012"
                                            maxLength={12}
                                        />
                                        <FileUpload
                                            label="Upload Aadhar Card (Front & Back)"
                                            file={files.aadharDoc}
                                            onUpload={(e) => handleFileChange(e, "aadharDoc")}
                                            onRemove={() => removeFile("aadharDoc")}
                                            error={errors["files.aadharDoc"]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. TERMS */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <label className={`flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors ${errors.terms ? "bg-red-50" : ""}`}>
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:border-orange-500 checked:bg-orange-500 hover:border-orange-400"
                                />
                                <CheckCircle size={14} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" />
                            </div>
                            <span className="text-sm text-gray-600">
                                I have read and agree to the <span className="text-orange-600 font-semibold">Terms & Conditions</span>.
                            </span>
                        </label>
                        {errors.terms && <p className="text-red-500 text-xs mt-1 ml-8">{errors.terms}</p>}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex items-center justify-end gap-4 pt-4 pb-10">
                        <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 rounded-xl text-gray-600 font-bold hover:bg-gray-100 transition-colors">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-600/20 hover:bg-orange-700 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Uploading & Submitting...' : 'Submit Application'}
                            {!isSubmitting && <ArrowRight size={18} />}
                        </button>
                    </div>
                </form>
            </div>
            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
      `}</style>
        </div>
    );
};

// --- HELPER COMPONENTS ---
const SectionHeader = ({ icon, title, color }) => {
    const colorClasses = {
        orange: "bg-orange-50/50 text-orange-600 border-orange-100",
        blue: "bg-blue-50/50 text-blue-600 border-blue-100",
        green: "bg-green-50/50 text-green-600 border-green-100",
    };
    return (
        <div className={`px-6 py-4 border-b flex items-center gap-3 ${colorClasses[color] || colorClasses.orange}`}>
            {React.cloneElement(icon, { size: 20 })}
            <h2 className="font-bold text-gray-800">{title}</h2>
        </div>
    );
};

const InputField = ({ label, type = "text", value, onChange, error, icon, placeholder, maxLength, ...props }) => (
    <div className="w-full">
        <label className="block text-xs font-bold text-gray-700 uppercase mb-1 flex justify-between">
            {label}
            {error && <span className="text-red-500 normal-case flex items-center gap-1 text-[10px]"><AlertCircle size={10} /> {error}</span>}
        </label>
        <div className="relative">
            {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</div>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-lg border outline-none transition-all text-sm font-medium
            ${error ? 'border-red-300 bg-red-50 focus:border-red-500' : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 bg-white'}`}
                {...props}
            />
        </div>
    </div>
);

const FileUpload = ({ label, file, onUpload, onRemove, error }) => (
    <div className="w-full">
        <label className="block text-xs font-bold text-gray-700 uppercase mb-1 flex justify-between">
            {label}
            {error && <span className="text-red-500 normal-case flex items-center gap-1 text-[10px]"><AlertCircle size={10} /> {error}</span>}
        </label>
        {!file ? (
            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                ${error ? 'border-red-300 bg-red-50/50' : 'border-gray-300'}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className={`mb-2 ${error ? 'text-red-400' : 'text-gray-400'}`} size={24} />
                    <p className="mb-1 text-xs text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-[10px] text-gray-400">PDF, PNG, JPG (Max 2MB)</p>
                </div>
                <input type="file" className="hidden" onChange={onUpload} accept="image/*,.pdf" />
            </label>
        ) : (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-green-100 p-2 rounded text-green-600">
                        <FileText size={18} />
                    </div>
                    <div className="truncate">
                        <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                        <p className="text-xs text-green-600">Ready to upload</p>
                    </div>
                </div>
                <button type="button" onClick={onRemove} className="p-1 hover:bg-green-200 rounded text-gray-500 hover:text-red-500 transition-colors">
                    <X size={16} />
                </button>
            </div>
        )}
    </div>
);

export default AddKitchenPage;