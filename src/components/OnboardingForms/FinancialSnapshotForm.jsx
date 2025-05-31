import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function FinancialSnapshotForm({ files, onFilesChange }) {
 const handleFileChange = (event, fieldName) => {
    onFilesChange(fieldName, Array.from(event.target.files))
  }

  return (
    <Container className="my-5 p-4 rounded" style={{ backgroundColor: '#E6f1f2' }}>
      <h2 className="mb-4" style={{ color: '#167C80' }}>Financial Snapshot </h2>
        {/* IT Returns */}
        <Row className="mb-3">
          <Col md={12}> {/* Changed to md={12} to take full width */}
            <Form.Group controlId="formITReturns">
              <Form.Label>IT Returns: (PDF/JPG/PNG)</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept=".jpg,.pdf,.png"
                onChange={(e) => handleFileChange(e, 'itReturns')}
              />
              <Form.Text muted>
                Each file should not exceed 5 MB.
              </Form.Text>
              {files.itReturns && files.itReturns.length > 0 && (
                <Form.Text muted>
                  {files.itReturns.map((file) => file.name).join(', ')} Uploaded file
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* Audited Balance Sheet */}
        <Row className="mb-3">
          <Col md={12}> {/* Changed to md={12} to take full width */}
            <Form.Group controlId="formAuditedBalanceSheet">
              <Form.Label>Audited Balance Sheet: (PDF/JPG/PNG)</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept=".jpg,.pdf,.png"
                onChange={(e) => handleFileChange(e, 'auditedBalanceSheet')}
              />
              <Form.Text muted>
                Each file should not exceed 5 MB.
              </Form.Text>
              {files.auditedBalanceSheet && files.auditedBalanceSheet.length > 0 && (
                <Form.Text muted>
                  {files.auditedBalanceSheet.map((file) => file.name).join(', ')} Uploaded file
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* Bank Statement */}
        <Row className="mb-3">
          <Col md={12}> {/* Changed to md={12} to take full width */}
            <Form.Group controlId="formBankStatement">
              <Form.Label>Bank Statement: (PDF/JPG/PNG)</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept=".jpg,.pdf,.png"
                onChange={(e) => handleFileChange(e, 'bankStatement')}
              />
              <Form.Text muted>
                Each file should not exceed 10 MB.
              </Form.Text>
              {files.bankStatement && files.bankStatement.length > 0 && (
                <Form.Text muted>
                  {files.bankStatement.map((file) => file.name).join(', ')} Uploaded file
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* GST Returns */}
        <Row className="mb-3">
          <Col md={12}> {/* Changed to md={12} to take full width */}
            <Form.Group controlId="formGSTReturns">
              <Form.Label>GST Returns: (PDF/JPG/PNG)</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept=".jpg,.pdf,.png"
                onChange={(e) => handleFileChange(e, 'gstReturns')}
              />
              <Form.Text muted>
                Each file should not exceed 5 MB.
              </Form.Text>
              {files.gstReturns && files.gstReturns.length > 0 && (
                <Form.Text muted>
                  {files.gstReturns.map((file) => file.name).join(', ')} Uploaded file
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* ESI Proof */}
        <Row className="mb-3">
          <Col md={12}> {/* Changed to md={12} to take full width */}
            <Form.Group controlId="formESIProof">
              <Form.Label>ESI Proof: (PDF/JPG/PNG)</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept=".jpg,.pdf,.png"
                onChange={(e) => handleFileChange(e, 'esiProof')}
              />
              <Form.Text muted>
                Each file should not exceed 5 MB.
              </Form.Text>
              {files.esiProof && files.esiProof.length > 0 && (
                <Form.Text muted>
                  {files.esiProof.map((file) => file.name).join(', ')} Uploaded file
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* PF Proof */}
        <Row className="mb-3">
          <Col md={12}> {/* Changed to md={12} to take full width */}
            <Form.Group controlId="formPFProof">
              <Form.Label>PF Proof: (PDF/JPG/PNG)</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept=".jpg,.pdf,.png"
                onChange={(e) => handleFileChange(e, 'pfProof')}
              />
              <Form.Text muted>
                Each file should not exceed 5 MB.
              </Form.Text>
              {files.pfProof && files.pfProof.length > 0 && (
                <Form.Text muted>
                  {files.esiProof.map((file) => file.name).join(', ')} Uploaded file
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* <Button variant="primary" type="submit">
          Upload Documents
        </Button> */}
      
    </Container>
  );
}

export default FinancialSnapshotForm;