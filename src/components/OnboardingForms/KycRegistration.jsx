import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const KycRegistration = () => {
  const [psaraLicense, setPsaraLicense] = useState(null);
  const [panCopy, setPanCopy] = useState(null);
  const [gstCertificate, setGstCertificate] = useState(null);
  const [udyamCertificate, setUdyamCertificate] = useState(null);

  const [errors, setErrors] = useState({
    psaraLicense: '',
    panCopy: '',
    gstCertificate: '',
    udyamCertificate: '',
  });

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

  const handleFileChange = (e, setFile, field) => {
    const file = e.target.files[0];
    if (file && !allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [field]: 'Invalid file type. Please upload a PDF, JPG, or PNG file.',
      }));
      e.target.value = '';
      setFile(null);
      return;
    }

    setFile(file);
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ psaraLicense, panCopy, gstCertificate, udyamCertificate });
  };

  return (
    <Container className="my-5 p-4 rounded" style={{ backgroundColor: '#E6f1f2' }}>
      <div className="mb-4">
        <h4 className="fw-semibold text-start" style={{ color: '#167C80' }}>
          KYC & Registration
        </h4>
        <p className="text-muted text-start mb-0">
          Upload your registration documents to continue
        </p>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 text-start" controlId="psaraLicense">
          <Form.Label>PSARA License: (PDF/JPG/PNG)</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf, .jpg, .jpeg, .png"
            onChange={(e) => handleFileChange(e, setPsaraLicense, 'psaraLicense')}
          />
          {errors.psaraLicense && (
            <div className="text-danger mt-1">{errors.psaraLicense}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="panCopy">
          <Form.Label>PAN Copy: (PDF/JPG/PNG)</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf, .jpg, .jpeg, .png"
            onChange={(e) => handleFileChange(e, setPanCopy, 'panCopy')}
          />
          {errors.panCopy && (
            <div className="text-danger mt-1">{errors.panCopy}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="gstCertificate">
          <Form.Label>GST Certificate: (PDF/JPG/PNG)</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf, .jpg, .jpeg, .png"
            onChange={(e) => handleFileChange(e, setGstCertificate, 'gstCertificate')}
          />
          {errors.gstCertificate && (
            <div className="text-danger mt-1">{errors.gstCertificate}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-4 text-start" controlId="udyamCertificate">
          <Form.Label>Udyam Certificate: (PDF/JPG/PNG)</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf, .jpg, .jpeg, .png"
            onChange={(e) => handleFileChange(e, setUdyamCertificate, 'udyamCertificate')}
          />
          {errors.udyamCertificate && (
            <div className="text-danger mt-1">{errors.udyamCertificate}</div>
          )}
        </Form.Group>
      </Form>
    </Container>
  );
};

export default KycRegistration;
