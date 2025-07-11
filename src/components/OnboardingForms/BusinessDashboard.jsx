import { Container, Form } from 'react-bootstrap';
import { useState } from 'react';

const BusinessDashboard = ({ fileKey, formData, onFormDataChange }) => {
  const [errors, setErrors] = useState({
    certificateOfIncorporation: '',
    moa: ''
  });

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  const MAX_FILE_SIZE_MB = 5;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const handleFileChange = (event, fieldName) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: 'Invalid file type. Please upload PDF, JPG, or PNG files.'
      }));
      onFormDataChange(fieldName, null);
      event.target.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: `File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`
      }));
      onFormDataChange(fieldName, null);
      event.target.value = '';
      return;
    }

    onFormDataChange(fieldName, file);
    setErrors(prev => ({
      ...prev,
      [fieldName]: ''
    }));
  };

  return (
    <Container className="my-5 p-4 rounded" style={{ backgroundColor: '#E6f1f2' }}>
      <div className="mb-4">
        <h4 className="fw-semibold text-start" style={{ color: '#167C80' }}>Business Details</h4>
      </div>

      <Form>
        <Form.Group className="mb-3 text-start" controlId="businessName">
          <Form.Label>Business Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter your business name" value={formData.businessName}
                        onChange={(e) => onFormDataChange('businessName', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="entityType">
          <Form.Label>Type of Entity:</Form.Label>
          <Form.Select value={formData.entity} onChange={(e) => onFormDataChange('entity', e.target.value)}>
            <option value="">Select</option>
            <option value="Proprietorship">Proprietorship</option>
            <option value="Partnership">Partnership</option>
            <option value="LLP">LLP</option>
            <option value="Pvt.Ltd">Pvt.Ltd</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="industry">
          <Form.Label>Industry/Sector:</Form.Label>
          <Form.Control type="text" placeholder="Enter industry or sector" value={formData.industry} readOnly />
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="businessAge">
          <Form.Label>Business Age: (in years)</Form.Label>
          <Form.Control type="text" placeholder="e.g., 5" value={formData.businessAge}
                        onChange={(e) => onFormDataChange('businessAge', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="regAddress">
          <Form.Label>Registered Office Address:</Form.Label>
          <Form.Control as="textarea" rows={2} placeholder="Enter registered office address" value={formData.registeredOffice}
                        onChange={(e) => onFormDataChange('registeredOffice', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="headAddress">
          <Form.Label>Head Office Address:</Form.Label>
          <Form.Control as="textarea" rows={2} placeholder="Enter head office address" value={formData.headOffice}
                        onChange={(e) => onFormDataChange('headOffice', e.target.value)}
          />
        </Form.Group>

        {/* Certificate of Incorporation */}
        <Form.Group className="mb-3 text-start" controlId="incorporation">
          <Form.Label>
            Certificate of Incorporation: <small className="text-muted">(PDF/JPG/PNG upto 5MB)</small>
          </Form.Label>
          <Form.Control key={fileKey + 'certificateOfIncorporation'} type="file" accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'certificate_of_incorporation')}
          />
          {formData.certificate_of_incorporation && (
            <Form.Text muted>
              {formData.certificate_of_incorporation.name} File Uploaded
            </Form.Text>
          )}
          {errors.certificateOfIncorporation && (
            <div className="text-danger mt-1">{errors.certificateOfIncorporation}</div>
          )}
        </Form.Group>

        {/* MoA */}
        <Form.Group className="mb-4 text-start" controlId="moa">
          <Form.Label>
            MoA/AoA: <small className="text-muted">(PDF/JPG/PNG upto 5MB)</small>
          </Form.Label>
          <Form.Control key={fileKey + 'moa'} type="file" accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'moa')}
          />
          {formData.moa && (
            <Form.Text muted>
              {formData.moa.name} File Uploaded
            </Form.Text>
          )}
          {errors.moa && (
            <div className="text-danger mt-1">{errors.moa}</div>
          )}
        </Form.Group>
      </Form>
    </Container>
  );
};

export default BusinessDashboard;
