"use client";

import React, { useState } from 'react';

interface DailyCaptchaProps {
  onVerify: () => void;
}

export const DailyCaptcha: React.FC<DailyCaptchaProps> = ({ onVerify }) => {
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const [isVerified, setIsVerified] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaptchaInput(event.target.value);
  };

  const verifyCaptcha = () => {
    if (captchaInput === captchaText) {
      setIsVerified(true);
      onVerify();
    } else {
      setCaptchaInput('');
      setCaptchaText(generateCaptcha());
      setIsVerified(false);
      alert('Incorrect CAPTCHA. Please try again.');
    }
  };

  function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-2">Daily CAPTCHA Verification</h3>
      <p className="text-sm text-muted-foreground mb-4">Please enter the following CAPTCHA to continue:</p>
      <div className="flex items-center mb-4">
        <span className="font-bold text-gray-800 dark:text-gray-200 mr-4">{captchaText}</span>
        <input
          type="text"
          value={captchaInput}
          onChange={handleInputChange}
          className="border rounded-md p-2 w-32 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Enter CAPTCHA"
        />
      </div>
      <button
        onClick={verifyCaptcha}
        className="bg-primary text-primary-foreground rounded-md p-2 hover:bg-primary/80 disabled:opacity-50"
        disabled={isVerified}
      >
        {isVerified ? 'Verified' : 'Verify'}
      </button>
    </div>
  );
};
