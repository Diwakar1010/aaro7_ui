import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function ClientDetailsForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientType: '', // Could be 'corporate', 'individual', etc.
    invoiceSize: '', // Numerical input
    paymentCycle: '', // Could be 'monthly', 'quarterly', etc.
    startDate: '', // Date string
    endDate: '', // Date string
    invoiceUpload: null, // File object
    workOrderUpload: null, // File object
    payrollListUpload: null, // File object (for xls/xlsx)
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Store the selected file object
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Here you would typically send `formData` to your backend.
    // For file uploads, you'd use FormData object as shown in previous examples.
    /*
    const dataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== '') {
        dataToSend.append(key, formData[key]);
      }
    }
    // Example fetch call:
    // fetch('/api/submit-client-details', {
    //   method: 'POST',
    //   body: dataToSend,
    // })
    // .then(response => response.json())
    // .then(data => console.log('Submission success:', data))
    // .catch(error => console.error('Submission error:', error));
    */
  };

  return (
    <Container className="my-5 p-4 rounded" style={{ backgroundColor: '#E6f1f2' }}>
      <h2 className="mb-4" style={{color: '#167C80'}}>Client Details</h2>
      <Form onSubmit={handleSubmit}>
        {/* Client Name */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formClientName">
              <Form.Label>Client Name:</Form.Label>
              <Form.Control
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="Enter client name"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Client Type */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formClientType">
              <Form.Label>Client Type:</Form.Label>
              <Form.Control
                as="select" // Use 'as="select"' for dropdowns
                name="clientType"
                value={formData.clientType}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="corporate">Corporate</option>
                <option value="individual">Individual</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Invoice Size (INR) */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formInvoiceSize">
              <Form.Label>Invoice Size (INR):</Form.Label>
              <Form.Control
                type="number" // Use 'number' for numerical input
                name="invoiceSize"
                value={formData.invoiceSize}
                onChange={handleInputChange}
                placeholder="Enter invoice size"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Payment Cycle */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formPaymentCycle">
              <Form.Label>Payment Cycle:</Form.Label>
              <Form.Control
                as="select" // Use 'as="select"' for dropdowns
                name="paymentCycle"
                value={formData.paymentCycle}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="half-yearly">Half-Yearly</option>
                <option value="annually">Annually</option>
                <option value="one-time">One-Time</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Start Date */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date:</Form.Label>
              <Form.Control
                type="date" // Use 'date' for date input
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                // placeholder="dd-mm-yyyy" // Placeholder isn't typically shown for type="date"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* End Date */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formEndDate">
              <Form.Label>End Date:</Form.Label>
              <Form.Control
                type="date" // Use 'date' for date input
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                // placeholder="dd-mm-yyyy" // Placeholder isn't typically shown for type="date"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Invoice Upload */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formInvoiceUpload">
              <Form.Label>Invoice Upload:</Form.Label>
              <Form.Control
                type="file"
                name="invoiceUpload"
                onChange={handleFileChange}
              />
              {formData.invoiceUpload && (
                <Form.Text muted>
                  Selected file: {formData.invoiceUpload.name}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* Work Order Upload */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formWorkOrderUpload">
              <Form.Label>Work Order Upload:</Form.Label>
              <Form.Control
                type="file"
                name="workOrderUpload"
                onChange={handleFileChange}
              />
              {formData.workOrderUpload && (
                <Form.Text muted>
                  Selected file: {formData.workOrderUpload.name}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* Upload employees payroll list (xls/xlsx) */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formPayrollListUpload">
              <Form.Label>Upload employees payroll list (xls/xlsx):</Form.Label>
              <Form.Control
                type="file"
                name="payrollListUpload"
                onChange={handleFileChange}
                accept=".xls,.xlsx" // Suggests accepted file types
              />
              {formData.payrollListUpload && (
                <Form.Text muted>
                  Selected file: {formData.payrollListUpload.name}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        
      </Form>
    </Container>
  );
}

export default ClientDetailsForm;