import React, { useState } from 'react';
import FinancialSnapshotForm from './FinancialSnapshotForm';
import ClientDetailsForm from './ClientDetailsForm';
import { Button, Form, Container, Spinner } from 'react-bootstrap';
import BusinessDashboard from './BusinessDashboard.jsx';
import KycRegistration from './KycRegistration.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OnboardingForms = () => {
  const [formKey, setFormKey] = useState(Date.now());
  const [loader , setLoader] = useState(false);
  const [businessData, setBusinessData] = useState({
    businessName: '',
    entity: '',
    industry: 'Man-power Staffing',
    businessAge: '',
    registeredOffice: '',
    headOffice: '',
    certificate_of_incorporation: null,
    moa: null,
  });

  const [kycData, setKycData] = useState({
    psara_license: null,
    pan_copy: null,
    gst_certificate: null,
    udyam_certificate: null,
  });

  const [financialFiles, setFinancialFiles] = useState({
    it_returns: [],
    audited_balance_sheet: [],
    bank_statement: [],
    gst_returns: [],
    esi_proof: [],
    pf_proof: [],
    all_existing_sanction_loan_letters: [],
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
    setLoader(true);
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
      for (const key of ['certificate_of_incorporation', 'moa']) {
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

      const response = await fetch('https://aaro7-backend.onrender.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      

      if (response.ok) {
        setLoader(false);
        setFormKey(Date.now());
        toast.success('Application submitted successfully!');

        setBusinessData({
          businessName: '',
          entity: '',
          industry: 'Man-power Staffing',
          businessAge: '',
          registeredOffice: '',
          headOffice: '',
          certificate_of_incorporation: null,
          moa: null,
        });

        setKycData({
          psara_license: null,
          pan_copy: null,
          gst_certificate: null,
          udyam_certificate: null,
        });

        setFinancialFiles({
          it_returns: [],
          audited_balance_sheet: [],
          bank_statement: [],
          gst_returns: [],
          esi_proof: [],
          pf_proof: [],
          all_existing_sanction_loan_letters: [],
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
        setLoader(false);
        const errorText = await response.text();
        toast.error(`Submission failed: ${errorText}`);
      }
    } catch (error) {
      setLoader(false);
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
        <BusinessDashboard fileKey={formKey} formData={businessData} onFormDataChange={handleBusinessChange} />
        <KycRegistration fileKey={formKey} formData={kycData} onFormDataChange={handleFormDataChange} />
        <FinancialSnapshotForm fileKey={formKey} files={financialFiles} onFilesChange={handleFinancialFilesChange} />
        <ClientDetailsForm
          fileKey={formKey}
          clientData={clientData}
          onClientDataChange={handleClientDataChange}
          onAddClient={handleAddClient}
        />

        <div className="mt-2 mb-5 text-center">
          {loader ? <Button style={{ backgroundColor: '#167C80' }} disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button> :
          <Button style={{ backgroundColor: '#167C80' }} type="submit">
            Submit Application
          </Button> }
        </div>
      </Form>
    </>
  );
};

export default OnboardingForms;
