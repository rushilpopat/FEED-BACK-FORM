import React, { useState } from 'react';
import './FeedBackForm.css';

const FeedbackForm = () => {
  // Define state variables for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  
  // Define state for error messages and form submission status
  const [error, setError] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  // Validate the form
  const validateForm = () => {
    if (!name.trim() || !email.trim() || !feedback.trim()) {
      setError('All fields are required.');
      return false;
    }
    // Add email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate server delay
      setTimeout(() => {
        setSubmittedData({ name, email, feedback });
        // Reset form fields after submission
        setName('');
        setEmail('');
        setFeedback('');
        setIsSubmitting(false);
      }, 600);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-form">
        <h2>Share Your Feedback</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              aria-required="true"
              aria-invalid={!name && error ? "true" : "false"}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              aria-required="true"
              aria-invalid={!email && error ? "true" : "false"}
            />
          </div>

          <div className="form-group">
            <label htmlFor="feedback">Feedback</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Tell us what you think..."
              rows="4"
              aria-required="true"
              aria-invalid={!feedback && error ? "true" : "false"}
            />
          </div>

          {error && <div className="error-message" role="alert">{error}</div>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>

      {submittedData && (
        <div className="submitted-feedback" role="region" aria-label="Submitted feedback">
          <h3>Thank You For Your Feedback</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Feedback:</strong> {submittedData.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm; 