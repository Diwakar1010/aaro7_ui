import React, { useState } from 'react'
import FinancialSnapshotForm from './FinancialSnapshotForm'
import ClientDetailsForm from './ClientDetailsForm'
import { Button, Form } from 'react-bootstrap'

const OnboardingForms = () => {
  const [financialFiles, setFinancialFiles] = useState({
    itReturns: [],
    auditedBalanceSheet: [],
    bankStatement: [],
    gstReturns: [],
    esiProof: [],
    pfProof: [],
  })

  const [clientData, setClientData] = useState({
    clientName: '',
    clientType: '',
    invoiceSize: '',
    paymentCycle: '',
    startDate: '',
    endDate: '',
    invoiceUpload: null,
    workOrderUpload: null,
    payrollListUpload: null,
  })

  const handleFinancialFilesChange = (fieldName, files) => {
    setFinancialFiles(prev => ({
      ...prev,
      [fieldName]: files,
    }))
  }

  const handleClientDataChange = (name, value) => {
    setClientData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64 = reader.result.split(',')[1]
        resolve({ name: file.name, type: file.type, data: base64 })
      }
      reader.onerror = error => reject(error)
    })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const financialFilesBase64 = {}
    for (const key in financialFiles) {
      financialFilesBase64[key] = []
      for (const file of financialFiles[key]) {
        const base64 = await toBase64(file)
        financialFilesBase64[key].push(base64)
      }
    }

    const clientFilesBase64 = {}
    for (const key of ['invoiceUpload', 'workOrderUpload', 'payrollListUpload']) {
      const file = clientData[key]
      if (file) {
        const base64 = await toBase64(file)
        clientFilesBase64[key] = base64
      }
    }

    const payload = {
      financialFiles: financialFilesBase64,
      clientData: {
        ...clientData,
        ...clientFilesBase64,
      },
    }

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzoMfvQaPjseNZFidbWo0yPONihqzCDY-hdApIWLbBLTHjfcmnihuPnPsIIDnnkJE2i5A/exec', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      const result = await response.text()
      console.log(result)
    } catch (error) {
      console.error('Submission error:', error)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FinancialSnapshotForm files={financialFiles} onFilesChange={handleFinancialFilesChange} />
      <ClientDetailsForm formData={clientData} onFormDataChange={handleClientDataChange} />
      <div className='mt-2 mb-5 text-center'>
        <Button style={{ backgroundColor: '#167C80' }} type='submit'>
          Submit Application
        </Button>
      </div>
    </Form>
  )
}

export default OnboardingForms
