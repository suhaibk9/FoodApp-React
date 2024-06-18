import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for the "toBeInTheDocument" matcher
import Contact from '../Contact';


describe('Contact Component', () => {
  test('renders the Contact Us header', () => {
    render(<Contact />);
    const headerElement = screen.getByRole('heading', {
      name: /contact us/i,
      level: 1,
    });
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the email link', () => {
    render(<Contact />);
    const emailElement = screen.getByRole('link', {
      name: /support@foodapp.com/i,
    });
    expect(emailElement).toBeInTheDocument();
  });

  test('renders the phone link', () => {
    render(<Contact />);
    const phoneElement = screen.getByRole('link', {
      name: /\+1 \(234\) 567-890/i,
    });
    expect(phoneElement).toBeInTheDocument();
  });

  test('renders the address', () => {
    render(<Contact />);
    const addressElement = screen.getByText(
      /123 Food Street, Culinary City, FL 56789/i
    );
    expect(addressElement).toBeInTheDocument();
  });

  test('renders the business hours', () => {
    render(<Contact />);
    const businessHoursElement = screen.getByText(
      /We are open from Monday to Saturday, 9 AM to 9 PM/i
    );
    expect(businessHoursElement).toBeInTheDocument();
  });

  test('renders the social media links', () => {
    render(<Contact />);
    const facebookLink = screen.getByRole('link', { name: /facebook/i });
    const twitterLink = screen.getByRole('link', { name: /twitter/i });
    const instagramLink = screen.getByRole('link', { name: /instagram/i });
    expect(facebookLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
  });
});
