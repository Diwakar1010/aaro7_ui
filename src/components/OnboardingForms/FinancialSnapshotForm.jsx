import React, { useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

function FinancialSnapshotForm({ fileKey, files, onFilesChange }) {
  const [errors, setErrors] = useState({});

  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/zip',
    'application/x-zip-compressed',
  ];

  const handleFileChange = (event, fieldName, maxSizeMB) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length === 0) return;

    // Validate each file
    for (const file of selectedFiles) {
      const isZip =
        file.type === 'application/zip' ||
        file.type === 'application/x-zip-compressed';

      const sizeLimitMB = isZip ? 40 : maxSizeMB;

      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: `Only PDF, JPG, PNG files up to ${maxSizeMB}MB, and ZIP files up to 40MB are allowed.`,
        }));
        event.target.value = '';
        return;
      }
      if (file.size > sizeLimitMB * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: `Only PDF, JPG, PNG files up to ${maxSizeMB}MB, and ZIP files up to 40MB are allowed.`,
        }));
        event.target.value = '';
        return;
      }
    }

    setErrors((prev) => ({ ...prev, [fieldName]: '' }));

    // Append new files to existing ones (if any)
    const updatedFiles = [...(files[fieldName] || []), ...selectedFiles];
    onFilesChange(fieldName, updatedFiles);

    event.target.value = '';
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
        <Row className="mb-4" key={field}>
          <Col md={12}>
            <Form.Group controlId={`form-${field}`}>
              <Form.Label>
                {label}:{' '}
                <small className="text-muted">
                  (PDF/JPG/PNG up to {maxSizeMB}MB, ZIP up to 40MB)
                </small>
              </Form.Label>

              <Form.Control
                type="file"
                multiple
                key={`${fileKey}-${field}-${files[field]?.length || 0}`}
                accept=".pdf,.jpg,.jpeg,.png,.zip"
                onChange={(e) => handleFileChange(e, field, maxSizeMB)}
              />

              {errors[field] && (
                <div className="text-danger mt-1">{errors[field]}</div>
              )}

              {files[field] && files[field].length > 0 && (
                <div>
                  {files[field].map((file, index) => (
                    <div key={index}>{file.name} Uploaded file</div>
                  ))}
                </div>
              )}
            </Form.Group>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default FinancialSnapshotForm;
