import React from "react";
import Layout from "../components/layout/layout";
import "../styles/privacy.css";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="privacy-policy">
        <div className="privacy-img">
          <img src="/images/privacy-policy.avif" alt="privacy" />
        </div>
        <div className="privacy-info">
          <h1 className="privacy-head">Privacy Policy</h1>
          <p className="privacy-p">
            Welcome to our website. Your privacy is important to us. This
            Privacy Policy explains how we collect, use, and safeguard your
            personal information when you submit complaints and use our
            services.
          </p>
          <strong>Information We Collect</strong>
          <br />
          <p className="privacy-p">
            When you submit a complaint or use our services, we may collect
            information such as your name, email address, contact details, and
            the details of your complaint. This information is essential for us
            to provide you with our complaint handling services.
          </p>
          <strong>How We Use Your Information</strong>
          <br />
          <p className="privacy-p">
            We may use the information you provide to:
          </p>
          <ul className="list">
            <li>Process and address your complaints.</li>
            <li>Improve our services based on your feedback.</li>
            <li>Contact you for additional information if needed.</li>
            <li>
              Send you updates or notifications related to your complaints.
            </li>
          </ul>
          <strong>Data Protection</strong>
          <br />
          <p className="privacy-p">
            We take your privacy seriously and do not share your personal
            information with third parties unless it is required to fulfill our
            service commitments or as required by law.
          </p>
          {/* <p className="privacy-p">
            For a comprehensive understanding of how your personal information
            is collected, used, and protected, please review our full Privacy
            Policy.
          </p> */}
          {/* Add more content as needed */}
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
