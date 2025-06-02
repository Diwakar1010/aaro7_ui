import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';

const KycRegistration = ({ formData, onFormDataChange }) => {
  const [errors, setErrors] = useState({
    psaraLicense: '',
    panCopy: '',
    gstCertificate: '',
    udyamCertificate: '',
  });

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  const MAX_SIZE_MB = 5;

  const handleFileChange = (event, fieldName) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: 'Invalid file type. Please upload PDF, JPG, or PNG files.'
      }));
      onFormDataChange(fieldName, null);
      event.target.value = '';
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: 'Only PDF, JPG, PNG files under 5MB are allowed.'
      }));
      onFormDataChange(fieldName, null);
      event.target.value = '';
      return;
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: ''
    }));
    onFormDataChange(fieldName, file);
  };

  return (
    <Container className="my-5 p-4 rounded" style={{ backgroundColor: '#E6f1f2' }}>
      <div className="mb-4">
        <h4 className="fw-semibold text-start" style={{ color: '#167C80' }}>
          KYC & Registration
        </h4>
      </div>

      <Form>
        {[
          { label: 'PSARA License', field: 'psaraLicense' },
          { label: 'PAN Copy', field: 'panCopy' },
          { label: 'GST Certificate', field: 'gstCertificate' },
          { label: 'Udyam Certificate', field: 'udyamCertificate' }
        ].map(({ label, field }) => (
          <Form.Group key={field} className="mb-3 text-start" controlId={field}>
            <Form.Label>
              {label}: <small className="text-muted">(PDF/JPG/PNG, Max 5MB)</small>
            </Form.Label>
            <Form.Control type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileChange(e, field)}
            />
            {formData[field] && (
              <Form.Text muted>
                <br />{formData[field].name} Uploaded file
              </Form.Text>
            )}
            {errors[field] && (
              <div className="text-danger mt-1">{errors[field]}</div>
            )}
          </Form.Group>
        ))}
      </Form>
    </Container>
  );
};

export default KycRegistration;
