'use client';

import { useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface UseRecaptchaReturn {
  executeRecaptcha: () => Promise<string>;
}

function useRecaptcha(): UseRecaptchaReturn {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (document.querySelector('#recaptcha-script'))
      return;

    // Create and load the reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`;
    script.async = true;
    script.onload = () => setIsReady(true);

    document.head.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const executeRecaptcha = useCallback(async () => {
    if (!isReady)
      throw new Error('reCAPTCHA not ready');

    return new Promise<string>((resolve, reject) => {
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_KEY!, { action: 'submit' })
          .then((token: string) => {
            resolve(token);
          })
          .catch((error: unknown) => {
            console.error('[Recaptcha Error]', error);

            reject(error);
          });
      });
    });
  }, [isReady]);

  return { executeRecaptcha };
}

export default useRecaptcha