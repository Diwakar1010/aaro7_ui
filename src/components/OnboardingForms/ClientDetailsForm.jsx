import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function ClientDetailsForm({ formData, onFormDataChange }) {
    const [addClient, setAddClient] = useState([1])
    
    const handleInputChange = (e) => {
    onFormDataChange(e.target.name, e.target.value)
  }

  const handleFileChange = (e) => {
    onFormDataChange(e.target.name, e.target.files[0])
  }
  
    const handleAddDetails = () => {
        if (addClient.length < 3) {
            setAddClient([...addClient, 1])
        } else {
            alert("client cannot be more than 3")
        }

    }

    return (
        <>
            <div className='d-flex justify-content-end' style={{ marginRight: '110px' }} >
                <Button style={{ backgroundColor: "#167C80" }} onClick={handleAddDetails}>Add Client </Button>
            </div>
            {addClient.map((item, index) => {
                return (
                    <Container className="my-2 p-4 rounded" style={{ backgroundColor: '#E6f1f2' }} key={index}>
                        <h2 className="mb-4" style={{ color: '#167C80' }}>Client {index + 1}</h2>
                        
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
                                    <Form.Group controlId="formInvoiceSize">
                                        <Form.Label>Last Invoice Amount (INR):</Form.Label>
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
                                        <Form.Text muted>
                                            Each file should not exceed 5 MB.
                                        </Form.Text>
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
                                        <Form.Text muted>
                                            Each file should not exceed 5 MB.
                                        </Form.Text>
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
                                        <Button variant="link" href="public\employee_details.xlsx" download>
                                            (download format)
                                        </Button>
                                        <Form.Control
                                            type="file"
                                            name="payrollListUpload"
                                            onChange={handleFileChange}
                                            accept=".xls,.xlsx" // Suggests accepted file types
                                        />
                                        <Form.Text muted>
                                            Each file should not exceed 5 MB.
                                        </Form.Text>

                                        {formData.payrollListUpload && (
                                            <Form.Text muted>
                                                Selected file: {formData.payrollListUpload.name}
                                            </Form.Text>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                        
                    </Container>
                )
            })}

        </>

    );
}

export default ClientDetailsForm;
