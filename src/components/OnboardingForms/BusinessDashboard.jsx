import { Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
// import { useNavigate } from "react-router-dom";

const BusinessDashboard = () => {
  const [businessName, setBusinessName] = useState('');
  const [entity, setEntity] = useState('');
  const [industry, setIndustry] = useState('Man-power Staffing');
  const [businessAge, setBusinessAge] = useState('');
  const [registeredOffice, setRegisteredOffice] = useState('');
  const [headOffice, setHeadOffice] = useState('');
  const [certificateOfIncorporation, setCertificateOfIncorporation] = useState(null);
  const [moa, setMoa] = useState(null);

  const [errors, setErrors] = useState({
    certificateOfIncorporation: '',
    moa: '',
  });

  // const navigate = useNavigate();

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

  const handleChange = (e, setFile, field) => {
    const file = e.target.files[0];

    if (file && !allowedTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [field]: 'Invalid file type. Please upload a PDF, JPG, or PNG file.',
      }));
      e.target.value = '';
      setFile(null);
      return;
    }

    setFile(file);
    setErrors(prev => ({
      ...prev,
      [field]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({businessName, entity, industry, businessAge, registeredOffice, headOffice, certificateOfIncorporation, moa});
    // navigate('/kyc');
  };

  return (
    <Container className="my-5 p-4 rounded" style={{ backgroundColor: '#E6f1f2' }}>
      <div className="mb-4">
        <h4 className="fw-semibold text-start" style={{ color: '#167C80' }}>Business Details</h4>
        <p className="text-muted text-start mb-0">Fill in your business information to proceed</p>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 text-start" controlId="businessName">
          <Form.Label>Business Name:</Form.Label>
          <Form.Control type="text" value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Enter your business name"
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="entityType">
          <Form.Label>Type of Entity:</Form.Label>
          <Form.Select value={entity} onChange={(e) => setEntity(e.target.value)}>
            <option value="">Select</option>
            <option value="proprietorship">Proprietorship</option>
            <option value="partnership">Partnership</option>
            <option value="llp">LLP</option>
            <option value="pvtltd">Private Limited</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="industry">
          <Form.Label>Industry/Sector:</Form.Label>
          <Form.Control type="text" value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Enter industry or sector"
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="businessAge">
          <Form.Label>Business Age: (in years)</Form.Label>
          <Form.Control type="text" value={businessAge}
            onChange={(e) => setBusinessAge(e.target.value)}
            placeholder="e.g., 5"
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="regAddress">
          <Form.Label>Registered Office Address:</Form.Label>
          <Form.Control as="textarea" rows={2} value={registeredOffice}
            onChange={(e) => setRegisteredOffice(e.target.value)}
            placeholder="Enter registered office address"
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="headAddress">
          <Form.Label>Head Office Address:</Form.Label>
          <Form.Control as="textarea" rows={2} value={headOffice}
            onChange={(e) => setHeadOffice(e.target.value)}
            placeholder="Enter head office address"
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="incorporation">
          <Form.Label>Certificate of Incorporation: (PDF/JPG/PNG)</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf, .jpg, .jpeg, .png"
            onChange={(e) => handleChange(e, setCertificateOfIncorporation, 'certificateOfIncorporation')}
          />
          {errors.certificateOfIncorporation && (
            <div className="text-danger mt-1">{errors.certificateOfIncorporation}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-4 text-start" controlId="moa">
          <Form.Label>MoA/AoA: (PDF/JPG/PNG)</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf, .jpg, .jpeg, .png"
            onChange={(e) => handleChange(e, setMoa, 'moa')}
          />
          {errors.moa && (
            <div className="text-danger mt-1">{errors.moa}</div>
          )}
        </Form.Group>
      </Form>
    </Container>
  );
};

export default BusinessDashboard;
