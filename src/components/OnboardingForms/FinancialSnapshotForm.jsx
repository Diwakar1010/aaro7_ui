import React, { useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

function FinancialSnapshotForm({ fileKey, files, onFilesChange }) {
  const [errors, setErrors] = useState({
    it_returns: '',
    audited_balance_sheet: '',
    bank_statement: '',
    gst_returns: '',
    esi_proof: '',
    pf_proof: '',
    all_existing_sanction_loan_letters: '',
  });

  const allowedTypes = [
    'application/pdf', 'image/jpeg', 'image/png', 'application/zip', 'application/x-zip-compressed', // to cover variations
  ];

  const handleFileChange = (event, fieldName, maxSizeMB) => {
    const selectedFiles = Array.from(event.target.files);

    const invalidFiles = selectedFiles.filter(file => {
      const isZip = file.name.toLowerCase().endsWith('.zip');
      const fileTypeValid = allowedTypes.includes(file.type);
      const sizeValid = isZip
          ? file.size <= 50 * 1024 * 1024
          : file.size <= maxSizeMB * 1024 * 1024; // limit for other types
      return !fileTypeValid || !sizeValid;
    });

    if (invalidFiles.length > 0) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: `Only PDF, JPG, PNG (Max ${maxSizeMB}MB) and ZIP (Max 50MB) files are allowed.`,
      }));
      onFilesChange(fieldName, []);
      event.target.value = '';
      return;
    }

    setErrors(prev => ({ ...prev, [fieldName]: '' }));
    onFilesChange(fieldName, selectedFiles);
  };

  const fields = [
    { label: 'IT Returns (Last 1 Year)', field: 'it_returns', maxSizeMB: 5 },
    { label: 'Audited Balance Sheet (Last 1 Year)', field: 'audited_balance_sheet', maxSizeMB: 5 },
    { label: 'Bank Statement (Last 1 Year)', field: 'bank_statement', maxSizeMB: 10 },
    { label: 'All Existing Loan Sanction Letters', field: 'all_existing_sanction_loan_letters', maxSizeMB: 5 },
    { label: 'GST Returns (Last 3 Months)', field: 'gst_returns', maxSizeMB: 5 },
    { label: 'ESI Proof (Last 6 Months)', field: 'esi_proof', maxSizeMB: 5 },
    { label: 'PF Proof (Last 6 Months)', field: 'pf_proof', maxSizeMB: 5 },
  ];

  return (
    <Container className="my-5 p-4 rounded" style={{ backgroundColor: '#E6f1f2' }}>
      <h2 className="mb-4" style={{ color: '#167C80' }}>Financial Snapshot</h2>

      {fields.map(({ label, field, maxSizeMB }) => (
        <Row className="mb-3" key={field}>
          <Col md={12}>
            <Form.Group controlId={`form-${field}`}>
              <Form.Label>
                {label}:{' '}
                <small className="text-muted">(PDF/JPG/PNG upto {maxSizeMB}MB, ZIP upto 50MB)</small>
              </Form.Label>
              <Form.Control type="file" key={`${fileKey}-${field}`} multiple accept=".pdf,.jpg,.jpeg,.png,.zip"
                            onChange={(e) => handleFileChange(e, field, maxSizeMB)}
              />
              {files[field] && files[field].length > 0 && (
                <Form.Text muted>
                  <br />
                  {files[field].map(file => file.name).join(', ')}{' '}
                  File{files[field].length > 1 ? 's' : ''} Uploaded
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
