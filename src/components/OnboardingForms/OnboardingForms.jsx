import React, { useState } from 'react';
import FinancialSnapshotForm from './FinancialSnapshotForm';
import ClientDetailsForm from './ClientDetailsForm';
import { Button, Form, Alert, Container } from 'react-bootstrap';
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
<<<<<<< HEAD

=======
  
>>>>>>> cfd49c39e202dd964038dba7fb16b004e183d95b
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      alert("Client cannot be more than 3");
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
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Convert financial files to base64
      const financialFilesBase64 = {}
        for (const key in financialFiles) {
            financialFilesBase64[key] = [];
            for (const file of financialFiles[key]) {
                const base64 = await toBase64(file);
                financialFilesBase64[key].push(base64);
            }
        }


<<<<<<< HEAD

=======
>>>>>>> cfd49c39e202dd964038dba7fb16b004e183d95b
      // Convert client files to base64
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
<<<<<<< HEAD
=======

>>>>>>> cfd49c39e202dd964038dba7fb16b004e183d95b

      // Convert business files to base64
      const businessFilesBase64 = {};
      for (const key of ['certificateOfIncorporation', 'moa']) {
        const file = businessData[key];
        if (file) {
          const base64 = await toBase64(file);
          businessFilesBase64[key] = base64;
        }
      }

      // Convert KYC files to base64
      const kycFilesBase64 = {};
      for (const key in kycData) {
        const file = kycData[key];
        if (file) {
          const base64 = await toBase64(file);
          kycFilesBase64[key] = base64;
        }
      }

<<<<<<< HEAD
=======

>>>>>>> cfd49c39e202dd964038dba7fb16b004e183d95b
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

      const response = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.text();
        console.log(result);
        setSuccessMessage('Application submitted successfully.');
      } else {
        throw new Error('Failed to submit');
<<<<<<< HEAD

    const payload = {
      businessData: {
        ...businessData,
        ...businessFilesBase64,
      },
      kycData: kycFilesBase64,
      financialFiles: financialFilesBase64,
        clientData: {
          ...clientData,
          ...clientFilesBase64,
        },
    };

      const response = await fetch('http://13.203.196.168:3001/submit', {
          method: 'POST',
        headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(payload),
      });
    try {
      if (response.ok) {
        setSuccessMessage('Application submitted successfully!');
      } else {
        const errorText = await response.text();
        setErrorMessage(`Submission failed: ${errorText}`);
=======

>>>>>>> cfd49c39e202dd964038dba7fb16b004e183d95b
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('An error occurred during submission. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <BusinessDashboard formData={businessData} onFormDataChange={handleBusinessChange} />
      <KycRegistration formData={kycData} onFormDataChange={handleFormDataChange} />
      <FinancialSnapshotForm files={financialFiles} onFilesChange={handleFinancialFilesChange} />
<<<<<<< HEAD
      <ClientDetailsForm clientData={clientData} onClientDataChange={handleClientDataChange} onAddClient={handleAddClient}/>
      <ClientDetailsForm formData={clientData} onFormDataChange={handleClientDataChange} />
=======

      <ClientDetailsForm
        clientData={clientData}
        onClientDataChange={handleClientDataChange}
        onAddClient={handleAddClient}
      />

>>>>>>> cfd49c39e202dd964038dba7fb16b004e183d95b

      <div className="mt-2 mb-5 text-center">
        <Button style={{ backgroundColor: '#167C80' }} type="submit">
          Submit Application
        </Button>
        <Container className="my-4">
          {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger" className="text-center">{errorMessage}</Alert>}
        </Container>
      </div>
    </Form>
  );
};

export default OnboardingForms;
