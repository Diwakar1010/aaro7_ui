import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function ClientDetailsForm({ clientData, onClientDataChange, onAddClient }) {
  const handleInputChange = (index, e) => {
    onClientDataChange(index, e.target.name, e.target.value);
  };

  const handleFileChange = (index, e) => {
    onClientDataChange(index, e.target.name, e.target.files[0]);
  };

  return (
    <>
      <div className='d-flex justify-content-end' style={{ marginRight: '110px' }} >
        <Button style={{ backgroundColor: "#167C80" }} onClick={onAddClient}>Add Client </Button>
      </div>
      {clientData.map((client, index) => (
        <Container className="my-2 p-4 rounded" style={{ backgroundColor: '#E6f1f2' }} key={index}>
          <h2 className="mb-4" style={{ color: '#167C80' }}>Client {index + 1}</h2>
          {/* Client Name */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formClientName${index}`}>
                <Form.Label>Client Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="clientName"
                  value={client.clientName}
                  onChange={e => handleInputChange(index, e)}
                  placeholder="Enter client name"
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Client Type */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formClientType${index}`}>
                <Form.Label>Client Type:</Form.Label>
                <Form.Control
                  as="select"
                  name="clientType"
                  value={client.clientType}
                  onChange={e => handleInputChange(index, e)}
                >
                  <option value="">Select</option>
                  <option value="centralgovernment">Central Government</option>
                  <option value="telanganastategovernment">Telangana State Government</option>
                  <option value="privatecompany">(AAA) Private Company</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          {/* Invoice Size (INR) */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formInvoiceSize${index}`}>
                <Form.Label>Last Invoice Amount (INR):</Form.Label>
                <Form.Control
                  type="number"
                  name="invoiceSize"
                  value={client.invoiceSize}
                  onChange={e => handleInputChange(index, e)}
                  placeholder="Enter invoice size"
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Payment Cycle */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formPaymentCycle${index}`}>
                <Form.Label>Payment Cycle:</Form.Label>
                <Form.Control
                  as="select"
                  name="paymentCycle"
                  value={client.paymentCycle}
                  onChange={e => handleInputChange(index, e)}
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
              <Form.Group controlId={`formStartDate${index}`}>
                <Form.Label>Start Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={client.startDate}
                  onChange={e => handleInputChange(index, e)}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* End Date */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formEndDate${index}`}>
                <Form.Label>End Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={client.endDate}
                  onChange={e => handleInputChange(index, e)}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Invoice Upload */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formInvoiceUpload${index}`}>
                <Form.Label>Invoice Upload:</Form.Label>
                <Form.Control
                  type="file"
                  name="invoiceUpload"
                  onChange={e => handleFileChange(index, e)}
                />
                <Form.Text muted>
                  Each file should not exceed 5 MB.
                </Form.Text>
                {client.invoiceUpload && (
                  <Form.Text muted>
                    Selected file: {client.invoiceUpload.name}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          {/* Work Order Upload */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formWorkOrderUpload${index}`}>
                <Form.Label>Work Order Upload:</Form.Label>
                <Form.Control
                  type="file"
                  name="workOrderUpload"
                  onChange={e => handleFileChange(index, e)}
                />
                <Form.Text muted>
                  Each file should not exceed 5 MB.
                </Form.Text>
                {client.workOrderUpload && (
                  <Form.Text muted>
                    Selected file: {client.workOrderUpload.name}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          {/* Upload employees payroll list (xls/xlsx) */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId={`formPayrollListUpload${index}`}>
                <Form.Label>Upload employees payroll list (xls/xlsx):</Form.Label>
                <Button variant="link" href="public\employee_details.xlsx" download>
                  (download format)
                </Button>
                <Form.Control
                  type="file"
                  name="payrollListUpload"
                  onChange={e => handleFileChange(index, e)}
                  accept=".xls,.xlsx"
                />
                <Form.Text muted>
                  Each file should not exceed 5 MB.
                </Form.Text>
                {client.payrollListUpload && (
                  <Form.Text muted>
                    Selected file: {client.payrollListUpload.name}
                  </Form.Text>
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
