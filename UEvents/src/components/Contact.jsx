import React, { useState } from 'react';
import './Refferal.css';
import contactImage from '../assets/images/contactu.png';

const Contact = () => {
  const [result, setResult] = useState(""); // Result message after form submission
  const [isSubmitting, setIsSubmitting] = useState(false); // To track if the form is being submitted

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Disable button and show "Sending..." state
    setResult("Sending...");

    // Collect form data
    const formData = new FormData(event.target);
    formData.append('access_key', '2cb8eca8-e466-4876-9151-f32fdad97da0'); // Web3 Forms access key

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json(); // Parse JSON response

      // Handle response from Web3 Forms API
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset(); // Reset the form on success
      } else {
        setResult(data.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error('Form submission error:', error); // Log errors
      setResult("An error occurred during form submission.");
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  return (
    <div className="contact-us-section">
      <div className="colorcon">
        <h2 className="contact-us-title">Contact Us</h2>
        <div className="contact-us-content">
          <form className="contact-us-form" onSubmit={onSubmit}>
            <input
              type="text"
              className="contact-us-input"
              name="name"
              placeholder="Name"
              required
            />
            <input
              type="email"
              className="contact-us-input"
              name="email"
              placeholder="Email"
              required
            />
            <input
              type="tel"
              className="contact-us-input"
              name="phone number"
              placeholder="Phone Number"
              required
            />
            <textarea
              className="contact-us-textarea"
              name="message"
              placeholder="Message"
              required
            ></textarea>

            {/* Submit button */}
            <button
              className="contact-us-button"
              type="submit"
              disabled={isSubmitting} // Disable the button when submitting
            >
              {isSubmitting ? "Sending..." : "Contact Us"}
            </button>
          </form>

          {/* Contact image */}
          <div className="contact-us-image">
            <img src={contactImage} alt="Contact Us" />
          </div>
        </div>

        {/* Result message */}
        {result && <p className="result-message">{result}</p>}
      </div>
    </div>
  );
};

export default Contact;
