import React, { useState } from 'react';
import FinancialSnapshotForm from './FinancialSnapshotForm';
import ClientDetailsForm from './ClientDetailsForm';
import { Button, Form } from 'react-bootstrap';
import BusinessDashboard from './BusinessDashboard.jsx';
import KycRegistration from './KycRegistration.jsx';

const OnboardingForms = () => {
  const [businessData, setBusinessData] = useState({
    businessName: '',
    entity: '',
    industry: 'Man-power Staffing',
    businessAge: '',
    registeredOffice: '',
    headOffice: '',
    certificateOfIncorporation: null,
    moa: null,
  });

  const [kycData, setKycData] = useState({
    psaraLicense: null,
    panCopy: null,
    gstCertificate: null,
    udyamCertificate: null,
  });

  const [financialFiles, setFinancialFiles] = useState({
    itReturns: [],
    auditedBalanceSheet: [],
    bankStatement: [],
    gstReturns: [],
    esiProof: [],
    pfProof: [],
  });

  const [clientData, setClientData] = useState({
    clientName: '',
    clientType: '',
    invoiceSize: '',
    paymentCycle: '',
    startDate: '',
    endDate: '',
    invoiceUpload: null,
    workOrderUpload: null,
    payrollListUpload: null,
  });

  const handleFormDataChange = (field, value) => {
    setKycData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBusinessChange = (name, value) => {
    setBusinessData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFinancialFilesChange = (fieldName, files) => {
    setFinancialFiles(prev => ({
      ...prev,
      [fieldName]: files,
    }));
  };

  const handleClientDataChange = (name, value) => {
    setClientData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve({ name: file.name, type: file.type, data: base64 });
      };
      reader.onerror = error => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const financialFilesBase64 = {};
    for (const key in financialFiles) {
      financialFilesBase64[key] = [];
      for (const file of financialFiles[key]) {
        const base64 = await toBase64(file);
        financialFilesBase64[key].push(base64);
      }
    }

    const clientFilesBase64 = {};
    for (const key of ['invoiceUpload', 'workOrderUpload', 'payrollListUpload']) {
      const file = clientData[key];
      if (file) {
        const base64 = await toBase64(file);
        clientFilesBase64[key] = base64;
      }
    }

    const businessFilesBase64 = {};
    for (const key of ['certificateOfIncorporation', 'moa']) {
      const file = businessData[key];
      if (file) {
        const base64 = await toBase64(file);
        businessFilesBase64[key] = base64;
      }
    }

    const kycFilesBase64 = {};
    for (const key in kycData) {
      const file = kycData[key];
      if (file) {
        const base64 = await toBase64(file);
        kycFilesBase64[key] = base64;
      }
    }

    const payload = {
      businessData: {
        ...businessData,
        ...businessFilesBase64,
        certificateOfIncorporation: undefined,
        moa: undefined,
      },
      kycData: kycFilesBase64,
      financialFiles: financialFilesBase64,
      clientData: {
        ...clientData,
        ...clientFilesBase64,
      },
    };

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbzoMfvQaPjseNZFidbWo0yPONihqzCDY-hdApIWLbBLTHjfcmnihuPnPsIIDnnkJE2i5A/exec',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('Submission error:', error);
    }

  };

  return (
    <Form onSubmit={handleSubmit}>
      <BusinessDashboard formData={businessData} onFormDataChange={handleBusinessChange} />
      <KycRegistration formData={kycData} onFormDataChange={handleFormDataChange} />
      <FinancialSnapshotForm files={financialFiles} onFilesChange={handleFinancialFilesChange} />
      <ClientDetailsForm formData={clientData} onFormDataChange={handleClientDataChange} />

      <div className="mt-2 mb-5 text-center">
        <Button style={{ backgroundColor: '#167C80' }} type="submit">
          Submit Application
        </Button>
      </div>
    </Form>
  );
};

export default OnboardingForms;
