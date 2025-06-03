import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function ClientDetailsForm({ fileKey, clientData, onClientDataChange, onAddClient }) {
  const [errors, setErrors] = useState({});

  const allowedTypes = {
    invoiceUpload: ['application/pdf', 'image/jpeg', 'image/png'],
    workOrderUpload: ['application/pdf', 'image/jpeg', 'image/png'],
    payrollListUpload: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    // Update the current field
    onClientDataChange(index, name, value);

    const client = { ...clientData[index], [name]: value };
    const start = new Date(client.startDate);
    const end = new Date(client.endDate);

    // Validate start date < end date
    if (client.startDate && client.endDate) {
      if (start >= end) {
        setErrors((prev) => ({
          ...prev,
          [`date-${index}`]: 'Project Start date must be earlier than Work Order.',
        }));
      } else {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[`date-${index}`];
          return updated;
        });
      }
    }
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const fieldName = e.target.name;

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [`${fieldName}-${index}`]: 'File size must not exceed 5MB.',
      }));
      onClientDataChange(index, fieldName, null);
      e.target.value = '';
      return;
    }

    if (allowedTypes[fieldName] && !allowedTypes[fieldName].includes(file.type)) {
      let errorMsg = 'Invalid file type.';
      if (fieldName === 'payrollListUpload') {
        errorMsg = 'Invalid file type. Please upload .xls or .xlsx Excel files.';
      } else if (fieldName === 'invoiceUpload' || fieldName === 'workOrderUpload') {
        errorMsg = 'Invalid file type. Please upload PDF, JPG, or PNG files.';
      }

      setErrors((prev) => ({
        ...prev,
        [`${fieldName}-${index}`]: errorMsg,
      }));

      onClientDataChange(index, fieldName, null);
      e.target.value = '';
      return;
    }

    setErrors((prev) => ({ ...prev, [`${fieldName}-${index}`]: '' }));
    onClientDataChange(index, fieldName, file);
  };

  return (
    <>
      <Container className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold m-0" style={{ color: '#167C80' }}>
            Client Projects for Invoice Discounting <span className="text-muted" style={{ fontSize: '0.95rem' }} >(Add Atleast 3 Clients)</span>  
          </h2>
          <p className="m-0 text-muted" style={{ fontSize: '0.95rem' }}>
            (These are the client projects Aaro7 will consider for invoice discounting.)
          </p>
        </div>
        <Button style={{ backgroundColor: '#167C80' }} onClick={onAddClient}>
          Add Client
        </Button>
      </Container>

      {clientData?.map((item, index) => (
        <Container className="my-2 p-4 rounded" style={{ backgroundColor: '#E6f1f2' }} key={index}>
          <div className="mb-4">
            <h4 className="fw-semibold text-muted" style={{ fontSize: '1.1rem' }}>
              Client {index + 1}
            </h4>
          </div>

          {/* Client Name */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formClientName-${index}`}>
                <Form.Label>Client Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="clientName"
                  value={item.clientName}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Enter client name"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Client Type */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formClientType-${index}`}>
                <Form.Label>Client Type:</Form.Label>
                <Form.Control
                  as="select"
                  name="clientType"
                  value={item.clientType}
                  onChange={(e) => handleInputChange(e, index)}
                >
                  <option value="">Select</option>
                  <option value="Central Government">Central Government</option>
                  <option value="State Government">State Government</option>
                  <option value="Private Company(AAA)">Private Company(AAA)</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Invoice Size */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formInvoiceSize-${index}`}>
                <Form.Label>Last Invoice Amount (INR):</Form.Label>
                <Form.Control
                  type="number"
                  name="invoiceSize"
                  value={item.invoiceSize}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Enter invoice size"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Payment Cycle */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formPaymentCycle-${index}`}>
                <Form.Label>Payment Cycle: (Days)</Form.Label>
                <Form.Control
                  as="select"
                  name="paymentCycle"
                  value={item.paymentCycle}
                  onChange={(e) => handleInputChange(e, index)}
                >
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
              <Form.Group controlId={`formStartDate-${index}`}>
                <Form.Label>Project Start Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={item.startDate}
                  onChange={(e) => handleInputChange(e, index)}
                />
                {errors[`date-${index}`] && (
                  <div className="text-danger mt-1">{errors[`date-${index}`]}</div>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* End Date */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formEndDate-${index}`}>
                <Form.Label>Work order valid till:</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={item.endDate}
                  onChange={(e) => handleInputChange(e, index)}
                />
                {errors[`date-${index}`] && (
                  <div className="text-danger mt-1">{errors[`date-${index}`]}</div>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Invoice Upload */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formInvoiceUpload-${index}`}>
                <Form.Label>
                  Upload a recent Invoice: <small className="text-muted">(PDF/JPG/PNG, Max 5MB)</small>
                </Form.Label>
                <Form.Control
                  type="file"
                  key={`${fileKey}-invoiceUpload-${index}`}
                  name="invoiceUpload"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, index)}
                />
                {item.invoiceUpload && (
                  <Form.Text muted>{item.invoiceUpload.name} Uploaded file</Form.Text>
                )}
                {errors[`invoiceUpload-${index}`] && (
                  <div className="text-danger mt-1">{errors[`invoiceUpload-${index}`]}</div>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Work Order Upload */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formWorkOrderUpload-${index}`}>
                <Form.Label>
                  Work Order Upload: <small className="text-muted">(PDF/JPG/PNG, Max 5MB)</small>
                </Form.Label>
                <Form.Control
                  type="file"
                  key={`${fileKey}-workOrderUpload-${index}`}
                  name="workOrderUpload"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, index)}
                />
                {item.workOrderUpload && (
                  <Form.Text muted>{item.workOrderUpload.name} Uploaded file</Form.Text>
                )}
                {errors[`workOrderUpload-${index}`] && (
                  <div className="text-danger mt-1">{errors[`workOrderUpload-${index}`]}</div>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Payroll List Upload */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formPayrollListUpload-${index}`}>
                <Form.Label>
                  Upload Employees Payroll List: <small className="text-muted">(.xls, .xlsx, Max 5MB)</small>
                </Form.Label>
                <Button variant="link" href="/public/employee_details.xlsx" download>
                  (download format)
                </Button>
                <Form.Control
                  type="file"
                  key={`${fileKey}-payrollListUpload-${index}`}
                  name="payrollListUpload"
                  accept=".xls,.xlsx"
                  onChange={(e) => handleFileChange(e, index)}
                />
                {item.payrollListUpload && (
                  <Form.Text muted>{item.payrollListUpload.name} Uploaded file</Form.Text>
                )}
                {errors[`payrollListUpload-${index}`] && (
                  <div className="text-danger mt-1">{errors[`payrollListUpload-${index}`]}</div>
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
