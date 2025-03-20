import React from 'react';
import { useBudget } from '../context/BudgetContext';
import {
  BsGithub,
  BsTwitter,
  BsLinkedin,
  BsFacebook,
  BsInstagram,
  BsEnvelope,
} from 'react-icons/bs';

function Footer() {
  const { state } = useBudget();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <BsGithub size={20} />,
      url: 'https://github.com',
      label: 'GitHub',
      color: '#333'
    },
    {
      icon: <BsTwitter size={20} />,
      url: 'https://twitter.com',
      label: 'Twitter',
      color: '#1DA1F2'
    },
    {
      icon: <BsLinkedin size={20} />,
      url: 'https://linkedin.com',
      label: 'LinkedIn',
      color: '#0077B5'
    },
    {
      icon: <BsFacebook size={20} />,
      url: 'https://facebook.com',
      label: 'Facebook',
      color: '#1877F2'
    },
    {
      icon: <BsInstagram size={20} />,
      url: 'https://instagram.com',
      label: 'Instagram',
      color: '#E4405F'
    },
    {
      icon: <BsEnvelope size={20} />,
      url: 'mailto:contact@budgetcalculator.com',
      label: 'Email',
      color: '#EA4335'
    },
  ];

  return (
    <footer className={`footer mt-auto py-4 ${state.darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="mb-3">Budget Calculator</h5>
            <p className="text-muted mb-0">
              Take control of your finances with our intuitive budget management tool.
              Track expenses, monitor spending, and achieve your financial goals.
            </p>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/about" className="text-decoration-none text-muted hover-link">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-decoration-none text-muted hover-link">Contact</a>
              </li>
              <li className="mb-2">
                <a href="/privacy" className="text-decoration-none text-muted hover-link">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a href="/terms" className="text-decoration-none text-muted hover-link">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3">Connect With Us</h5>
            <div className="d-flex gap-3 social-icons">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label={social.label}
                  style={{ '--hover-color': social.color }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted">
              © {currentYear} Budget Calculator. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <small className="text-muted">
              Made with ❤️ for better financial management
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
