import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function ClientDetailsForm({ formData, onFormDataChange }) {
  const [addClient, setAddClient] = useState([1]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    onFormDataChange(e.target.name, e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fieldName = e.target.name;

    if (file && file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: 'File size must not exceed 5MB.',
      }));
      onFormDataChange(fieldName, null);
      e.target.value = '';
      return;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    onFormDataChange(fieldName, file);
  };

  const handleAddDetails = () => {
    if (addClient.length < 3) {
      setAddClient([...addClient, 1]);
    } else {
      alert('Client cannot be more than 3');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end" style={{ marginRight: '110px' }}>
        <Button style={{ backgroundColor: '#167C80' }} onClick={handleAddDetails}>
          Add Client
        </Button>
      </div>

      {addClient.map((item, index) => (
        <Container className="my-2 p-4 rounded" style={{ backgroundColor: '#E6f1f2' }} key={index}>
          <div className="d-flex align-items-center justify-content-start mb-4">
            <h2 className="mb-0 me-2" style={{ color: '#167C80' }}>
              Client {index + 1}
            </h2>
            <h4 className="mb-0 fw-semibold text-muted" style={{ fontSize: '1.1rem' }}>
              (Client Projects for Invoice Discounting)
            </h4>
          </div>

          {/* Client Name */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formClientName">
                <Form.Label>Client Name:</Form.Label>
                <Form.Control type="text" name="clientName" value={formData.clientName} onChange={handleInputChange} placeholder="Enter client name"/>
              </Form.Group>
            </Col>
          </Row>

          {/* Client Type */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formClientType">
                <Form.Label>Client Type:</Form.Label>
                <Form.Control as="select" name="clientType" value={formData.clientType} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="centralgovernment">Central Government</option>
                  <option value="telanganastategovernment">State Government</option>
                  <option value="privatecompany">(AAA) Private Company</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Invoice Size */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formInvoiceSize">
                <Form.Label>Last Invoice Amount (INR):</Form.Label>
                <Form.Control type="number" name="invoiceSize" value={formData.invoiceSize} onChange={handleInputChange} placeholder="Enter Invoice size"/>
              </Form.Group>
            </Col>
          </Row>

          {/* Payment Cycle */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formPaymentCycle">
                <Form.Label>Payment Cycle: (Days)</Form.Label>
                <Form.Control as="select" name="paymentCycle" value={formData.paymentCycle} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="15">15 days</option>
                  <option value="30">30 days</option>
                  <option value="45">45 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Start Date */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formStartDate">
                <Form.Label>Project Start Date:</Form.Label>
                <Form.Control type="date" name="startDate" value={formData.startDate} onChange={handleInputChange}/>
              </Form.Group>
            </Col>
          </Row>

          {/* End Date */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formEndDate">
                <Form.Label>Work order valid till:</Form.Label>
                <Form.Control type="date" name="endDate" value={formData.endDate} onChange={handleInputChange}/>
              </Form.Group>
            </Col>
          </Row>

          {/* Invoice Upload */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formInvoiceUpload">
                <Form.Label>Upload a recent Invoice: <small className="text-muted">(PDF/JPG/PNG), Max 5MB</small></Form.Label>
                <Form.Control type="file" name="invoiceUpload" onChange={handleFileChange} />
                {formData.invoiceUpload && (
                  <Form.Text muted>{formData.invoiceUpload.name} Uploaded file</Form.Text>
                )}
                {errors.invoiceUpload && (
                  <div className="text-danger mt-1">{errors.invoiceUpload}</div>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Work Order Upload */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formWorkOrderUpload">
                <Form.Label>Work Order Upload: <small className="text-muted">(.xls, .xlsx), Max 5MB</small></Form.Label>
                <Form.Control type="file" name="workOrderUpload" onChange={handleFileChange} />
                {formData.workOrderUpload &&
                    (<Form.Text muted>{formData.workOrderUpload.name} Uploaded file</Form.Text>)
                }
                {errors.workOrderUpload && (
                  <div className="text-danger mt-1">{errors.workOrderUpload}</div>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Payroll List Upload */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formPayrollListUpload">
                <Form.Label>Upload employees payroll list: <small className="text-muted">(.xls, .xlsx), Max 5MB</small></Form.Label>
                <Button variant="link" href="public/employee_details.xlsx" download>
                  (download format)
                </Button>
                <Form.Control type="file" name="payrollListUpload" onChange={handleFileChange} accept=".xls,.xlsx"/>

                {formData.payrollListUpload && (
                  <Form.Text muted>{formData.payrollListUpload.name} Uploaded file</Form.Text>
                )}
                {errors.payrollListUpload && (
                  <div className="text-danger mt-1">{errors.payrollListUpload}</div>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Container>
      ))}
    </>
  );
}

export default ClientDetailsForm;
