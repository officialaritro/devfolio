import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { differenceInYears, parseISO } from "date-fns";

import { pathNames } from "./constants/path-names";

import { serverEnv } from "./env/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function matchPath(pathname: string, isFirstLoad: boolean) {
  if (pathname === '/') {
    return isFirstLoad ? "Shivam Taneja" : "<Home />";
  }

  if (pathname in pathNames.common) {
    return isFirstLoad ?
      pathNames.common[pathname as keyof typeof pathNames.common]
      :
      `<${pathNames.common[pathname as keyof typeof pathNames.common]} />`
  }

  if (pathname.startsWith('/project')) {
    const slug = pathname.split('/project/')[1];

    if (slug && pathNames.projects[slug as keyof typeof pathNames.projects]) {
      return isFirstLoad ?
        pathNames.projects[slug as keyof typeof pathNames.projects]
        :
        `<${pathNames.projects[slug as keyof typeof pathNames.projects]} />`
    }
  }

  return 'Not Found';
}

export async function verifyRecaptchaToken(token: string) {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      secret: serverEnv().RECAPTCHA_SECRET_KEY,
      response: token
    })
  });

  const data = await response.json();

  return {
    success: data.success as boolean,
    score: data.score as number | undefined,
    action: data.action as string | undefined,
    challengeTs: data.challenge_ts as string | undefined,
    hostname: data.hostname as string | undefined,
    errorCodes: data['error-codes'] as string[] | undefined
  };
}

export function calculateAge(dob: string) {
  const birthday = parseISO(dob);
  const today = new Date();

  return differenceInYears(today, birthday);
}