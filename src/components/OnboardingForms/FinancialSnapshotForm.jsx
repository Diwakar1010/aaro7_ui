import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function FinancialSnapshotForm() {
  const [files, setFiles] = useState({
    itReturns: null,
    auditedBalanceSheet: null,
    bankStatement: null,
    gstReturns: null,
    esiProof: null,
    pfProof: null,
  });

  const handleFileChange = (event, fieldName) => {
    setFiles({
      ...files,
      [fieldName]: event.target.files[0], // Only take the first file if multiple are selected
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Files:', files);
    // Here you would typically send the files to a server, e.g., using FormData and fetch or Axios
    // Example of how to prepare for sending:
    // const formData = new FormData();
    // for (const key in files) {
    //   if (files[key]) {
    //     formData.append(key, files[key]);
    //   }
    // }
    // console.log(formData); // You can't directly inspect formData contents, but it's ready to be sent
    // Example fetch call:
    // fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    // .then(response => response.json())
    // .then(data => console.log('Upload success:', data))
    // .catch(error => console.error('Upload error:', error));
  };

  return (
    <Container className="my-5 p-4 rounded" style={{ backgroundColor: '#E6f1f2' }}>
      <h2 className="mb-4" style={{color: '#167C80'}}>Financial Snapshot </h2>
      <Form onSubmit={handleSubmit}>
        {/* IT Returns */}
        <Row className="mb-3">
          <Col md={12}> {/* Changed to md={12} to take full width */}
            <Form.Group controlId="formITReturns">
              <Form.Label>IT Returns:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFileChange(e, 'itReturns')}
              />
              {files.itReturns && (
                <Form.Text muted>
                  Selected file: {files.itReturns.name}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* Audited Balance Sheet */}
        <Row className="mb-3">
          <Col md={12}> {/* Changed to md={12} to take full width */}
            <Form.Group controlId="formAuditedBalanceSheet">
              <Form.Label>Audited Balance Sheet:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFileChange(e, 'auditedBalanceSheet')}
              />
              {files.auditedBalanceSheet && (
                <Form.Text muted>
                  Selected file: {files.auditedBalanceSheet.name}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* Bank Statement */}
        <Row className="mb-3">
          <Col md={12}> {/* Changed to md={12} to take full width */}
            <Form.Group controlId="formBankStatement">
              <Form.Label>Bank Statement:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFileChange(e, 'bankStatement')}
              />
              {files.bankStatement && (
                <Form.Text muted>
                  Selected file: {files.bankStatement.name}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* GST Returns */}
        <Row className="mb-3">
          <Col md={12}> {/* Changed to md={12} to take full width */}
            <Form.Group controlId="formGSTReturns">
              <Form.Label>GST Returns:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFileChange(e, 'gstReturns')}
              />
              {files.gstReturns && (
                <Form.Text muted>
                  Selected file: {files.gstReturns.name}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* ESI Proof */}
        <Row className="mb-3">
          <Col md={12}> {/* Changed to md={12} to take full width */}
            <Form.Group controlId="formESIProof">
              <Form.Label>ESI Proof:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFileChange(e, 'esiProof')}
              />
              {files.esiProof && (
                <Form.Text muted>
                  Selected file: {files.esiProof.name}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* PF Proof */}
        <Row className="mb-3">
          <Col md={12}> {/* Changed to md={12} to take full width */}
            <Form.Group controlId="formPFProof">
              <Form.Label>PF Proof:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFileChange(e, 'pfProof')}
              />
              {files.pfProof && (
                <Form.Text muted>
                  Selected file: {files.pfProof.name}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* <Button variant="primary" type="submit">
          Upload Documents
        </Button> */}
      </Form>
    </Container>
  );
}

export default FinancialSnapshotForm;