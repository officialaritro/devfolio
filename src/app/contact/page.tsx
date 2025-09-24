import { Metadata } from 'next';
import Link from 'next/link';

import { RESUME_LINK } from '@/lib/constants/about-me';
import { defaultMetadata } from '@/lib/constants/metadata';

import ContactForm from '@/components/contact-form';
import Wrapper from '@/components/wrapper';
import { FileText, MailIcon, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Contact Me | Aritro Roy - Full Stack Developer",
  description: "Get in touch with Aritro. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
  openGraph: {
    title: "Contact Me | Aritro Roy - Full Stack Developer",
    description: "Get in touch with Aritro. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    ...defaultMetadata.openGraph,
  },
  twitter: {
    title: "Contact Me | Aritro Roy - Full Stack Developer",
    description: "Get in touch with Aritro. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    ...defaultMetadata.twitter
  },
};

const ContactPage = () => {
  return (
    <Wrapper>
      <section>
        <div className="py-6">
          <div className="grid md:grid-cols-2 md:gap-0 gap-10">
            <div className="space-y-6 md:text-start text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold">Stay Connected.</h1>
                <p className="text-muted-foreground">Bring your ideas to life, together. ✨</p>
              </div>

              <div className="space-y-4">
                <div className="flex md:justify-start justify-center w-full items-center gap-3 text-muted-foreground">
                  <MailIcon className="h-5 w-5 text-white shrink-0" />
                  <a
                    href="mailto:aritroroy404@gmail.com"
                    className="text-white relative overflow-hidden"
                  >
                    <span className="hover-animation">
                      aritroroy404@gmail.com
                    </span>
                  </a>
                </div>

                <div className="flex md:justify-start justify-center w-full items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-white shrink-0" />
                  <span className="text-white">West Bengal, India</span>
                </div>

                <Link href={RESUME_LINK} target='_blank' className="flex md:justify-start justify-center w-full items-center gap-3 text-muted-foreground">
                  <FileText className="h-5 w-5 text-white shrink-0" />
                  <span className="text-white">Download Resume</span>
                </Link>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </Wrapper>
  )
}

export default ContactPage