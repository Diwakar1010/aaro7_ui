import React, { useState } from 'react';
import FinancialSnapshotForm from './FinancialSnapshotForm';
import ClientDetailsForm from './ClientDetailsForm';
import { Button, Form, Container } from 'react-bootstrap';
import BusinessDashboard from './BusinessDashboard.jsx';
import KycRegistration from './KycRegistration.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    existingSanctionLoanLetters: [],
  });

  const [clientData, setClientData] = useState([
    {
      clientName: '',
      clientType: '',
      invoiceSize: '',
      paymentCycle: '',
      startDate: '',
      endDate: '',
      invoiceUpload: null,
      workOrderUpload: null,
      payrollListUpload: null,
    }
  ]);

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

  const handleClientDataChange = (index, name, value) => {
    setClientData(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const handleAddClient = () => {
    if (clientData.length < 3) {
      setClientData(prev => [
        ...prev,
        {
          clientName: '',
          clientType: '',
          invoiceSize: '',
          paymentCycle: '',
          startDate: '',
          endDate: '',
          invoiceUpload: null,
          workOrderUpload: null,
          payrollListUpload: null,
        }
      ]);
    } else {
      toast.error("Client cannot be more than 3");
    }
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

    try {
      const financialFilesBase64 = {};
      for (const key in financialFiles) {
        financialFilesBase64[key] = [];
        for (const file of financialFiles[key]) {
          const base64 = await toBase64(file);
          financialFilesBase64[key].push(base64);
        }
      }

      const clientFilesBase64 = [];
      for (const client of clientData) {
        const files = {};
        for (const key of ['invoiceUpload', 'workOrderUpload', 'payrollListUpload']) {
          const file = client[key];
          if (file) {
            const base64 = await toBase64(file);
            files[key] = base64;
          }
        }
        clientFilesBase64.push(files);
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
        },
        kycData: kycFilesBase64,
        financialFiles: financialFilesBase64,
        clientData: clientData.map((client, idx) => ({
          ...client,
          ...clientFilesBase64[idx],
        })),
      };

      const response = await fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Application submitted successfully!');

        setBusinessData({
          businessName: '',
          entity: '',
          industry: 'Man-power Staffing',
          businessAge: '',
          registeredOffice: '',
          headOffice: '',
          certificateOfIncorporation: null,
          moa: null,
        });

        setKycData({
          psaraLicense: null,
          panCopy: null,
          gstCertificate: null,
          udyamCertificate: null,
        });

        setFinancialFiles({
          itReturns: [],
          auditedBalanceSheet: [],
          bankStatement: [],
          gstReturns: [],
          esiProof: [],
          pfProof: [],
          existingSanctionLoanLetters: [],
        });

        setClientData([
          {
            clientName: '',
            clientType: '',
            invoiceSize: '',
            paymentCycle: '',
            startDate: '',
            endDate: '',
            invoiceUpload: null,
            workOrderUpload: null,
            payrollListUpload: null,
          }
        ]);
      } else {
        const errorText = await response.text();
        toast.error(`Submission failed: ${errorText}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An error occurred during submission. Please try again.');
    }
  };

  return (
    <>
      <Container className="text-center my-4">
        <h1 className="fw-bold" style={{ color: '#167C80' }}>
          Aaro7 Onboarding Form
        </h1>
      </Container>

      <ToastContainer position="top-center" autoClose={3000} />

      <Form onSubmit={handleSubmit}>
        <BusinessDashboard formData={businessData} onFormDataChange={handleBusinessChange} />
        <KycRegistration formData={kycData} onFormDataChange={handleFormDataChange} />
        <FinancialSnapshotForm files={financialFiles} onFilesChange={handleFinancialFilesChange} />
        <ClientDetailsForm
          clientData={clientData}
          onClientDataChange={handleClientDataChange}
          onAddClient={handleAddClient}
        />

        <div className="mt-2 mb-5 text-center">
          <Button style={{ backgroundColor: '#167C80' }} type="submit">
            Submit Application
          </Button>
        </div>
      </Form>
    </>
  );
};

export default OnboardingForms;
