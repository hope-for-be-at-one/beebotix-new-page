
import React from 'react';
import { X, Mail, Calculator, AlertTriangle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

interface QuotePopupProps {
  isOpen: boolean;
  onClose: () => void;
  quoteData: {
    material: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    estimatedCost: number;
    estimatedTime: string;
    quoteCode: string;
  };
  onSendEmail: () => void;
  projectDescription?: string;
}

const QuotePopup: React.FC<QuotePopupProps> = ({ isOpen, onClose, quoteData, onSendEmail, projectDescription = "" }) => {
  // Initialize EmailJS
  emailjs.init("K9PmDAw2eoItuAJgX");

  const handleSendEmail = async () => {
    const templateParams = {
      quote_code: quoteData.quoteCode,
      material: quoteData.material,
      dimensions: `${quoteData.length} × ${quoteData.width} × ${quoteData.height} cm`,
      estimated_weight: `${quoteData.weight}g`,
      project_description: projectDescription || "Not provided",
      subject: `3D Printing Quote Request - ${quoteData.quoteCode}`,
      message: `
3D Printing Quote Request Details:

Quote Code: ${quoteData.quoteCode}
Material: ${quoteData.material}
Dimensions: ${quoteData.length} × ${quoteData.width} × ${quoteData.height} cm
Estimated Weight: ${quoteData.weight}g
Project Description: ${projectDescription || "Not provided"}
      `,
      to_name: "BeeBotix Team",
      from_name: "3D Printing Quote System"
    };

    const serviceID = "service_rwc5cf5";
    const templateID = "template_tkr2wgr";

    try {
      await emailjs.send(serviceID, templateID, templateParams);
      
      toast({
        title: "Quote Sent Successfully! 🎉",
        description: "Your 3D printing quote has been sent to our team. We'll review it and get back to you with a detailed proposal soon!",
      });
      
      onSendEmail();
      onClose();
    } catch (error) {
      console.error("Email.js error:", error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again in a few minutes or reach out to us on social media. We're here to help!",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      ></div>
      
      {/* Popup */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-scale-in transform transition-all duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-beebotix-navy to-beebotix-navy/90 rounded-t-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-beebotix-yellow/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-beebotix-orange/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-beebotix-yellow/20 rounded-lg">
              <Calculator className="h-6 w-6 text-beebotix-yellow" />
            </div>
            <h2 className="text-2xl font-bold">Instant Quote</h2>
          </div>
          
          <div className="flex items-center gap-2 text-beebotix-yellow">
            <span className="text-sm font-medium">Quote Code:</span>
            <span className="text-lg font-bold tracking-wider">{quoteData.quoteCode}</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Warning Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800 mb-1">Estimated Quote</p>
                <p className="text-xs text-amber-700">
                  This is a basic formula-based calculation. Actual pricing may vary based on 
                  complexity, design requirements, and current material costs.
                </p>
              </div>
            </div>
          </div>
          
          {/* Quote Details */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Material</label>
                <p className="text-lg font-semibold text-beebotix-navy">{quoteData.material}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Dimensions</label>
                <p className="text-lg font-semibold text-beebotix-navy">
                  {quoteData.length} × {quoteData.width} × {quoteData.height} cm
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Est. Weight</label>
                <p className="text-lg font-semibold text-beebotix-navy">{quoteData.weight}g</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Est. Time</label>
                <p className="text-lg font-semibold text-beebotix-navy">{quoteData.estimatedTime}</p>
              </div>
            </div>
            
            {/* Price Highlight */}
            <div className="bg-gradient-to-r from-beebotix-yellow/10 to-beebotix-orange/10 rounded-xl p-4 border border-beebotix-yellow/20">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-1">Estimated Cost</p>
                <p className="text-3xl font-bold text-beebotix-navy">₹{quoteData.estimatedCost}</p>
                <p className="text-xs text-gray-500 mt-1">+ taxes & shipping</p>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSendEmail}
              className="flex-1 bg-beebotix-navy hover:bg-beebotix-navy/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Email Quote
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePopup;
