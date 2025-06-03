import React, { useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

function FinancialSnapshotForm({fileKey, files, onFilesChange }) {
  const [errors, setErrors] = useState({
    itReturns: '',
    auditedBalanceSheet: '',
    bankStatement: '',
    gstReturns: '',
    esiProof: '',
    pfProof: '',
    existingLoanLetters: '',
  });

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

  const handleFileChange = (event, fieldName, maxSizeMB) => {
    const selectedFiles = Array.from(event.target.files);

    const invalidFiles = selectedFiles.filter(
      file => !allowedTypes.includes(file.type) || file.size > maxSizeMB * 1024 * 1024
    );

    if (invalidFiles.length > 0) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: `Only PDF, JPG, PNG files under ${maxSizeMB}MB are allowed.`,
      }));
      onFilesChange(fieldName, []);
      event.target.value = '';
      return;
    }

    setErrors(prev => ({ ...prev, [fieldName]: '' }));
    onFilesChange(fieldName, selectedFiles);
  };

  const fields = [
    { label: 'IT Returns (Last 1 Year)', field: 'itReturns', maxSizeMB: 5 },
    { label: 'Audited Balance Sheet (Last 1 Year)', field: 'auditedBalanceSheet', maxSizeMB: 5 },
    { label: 'Bank Statement (Last 1 Year)', field: 'bankStatement', maxSizeMB: 10 },
    { label: 'All Existing Loan Sanction Letters', field: 'existingSanctionLoanLetters', maxSizeMB: 5 },
    { label: 'GST Returns (Last 3 Months)', field: 'gstReturns', maxSizeMB: 5 },
    { label: 'ESI Proof (Last 6 Months)', field: 'esiProof', maxSizeMB: 5 },
    { label: 'PF Proof (Last 6 Months)', field: 'pfProof', maxSizeMB: 5 },

  ];

  return (
    <Container className="my-5 p-4 rounded" style={{ backgroundColor: '#E6f1f2' }}>
      <h2 className="mb-4" style={{ color: '#167C80' }}>Financial Snapshot</h2>

      {fields.map(({ label, field, maxSizeMB }) => (
        <Row className="mb-3" key={field}>
          <Col md={12}>
            <Form.Group controlId={`form-${field}`}>
              <Form.Label>
                {label}: <small className="text-muted">(PDF/JPG/PNG, Max {maxSizeMB}MB)</small>
              </Form.Label>
              <Form.Control type="file" key={`${fileKey}-${field}`} multiple accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, field, maxSizeMB)}
              />
              {files[field] && files[field].length > 0 && (
                <Form.Text muted>
                  <br />
                  {files[field].map(file => file.name).join(', ')} Files Uploaded{files[field].length > 1 ? 's' : ''}
                </Form.Text>
              )}
              {errors[field] && (
                <div className="text-danger mt-1">{errors[field]}</div>
              )}
            </Form.Group>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default FinancialSnapshotForm;
