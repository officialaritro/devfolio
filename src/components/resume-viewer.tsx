'use client';

import { useState } from 'react';

import { Download, ExternalLink, FileText, Loader2 } from 'lucide-react';

import { RESUME_LINK } from '@/lib/constants/about-me';

import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import TrafficLights from './ui/traffic-lights';

const ResumeViewer = ({ className }: { className?: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog onOpenChange={(open) => open && setIsLoading(true)}>
      <DialogTrigger asChild>
        <Button
          className={className}
          variant="outline"
        >
          <FileText size={20} />
          <span>Resume</span>
        </Button>
      </DialogTrigger>

      <DialogContent hideDefaultClose className="max-w-4xl w-[95vw] h-[85vh] flex flex-col p-4 sm:p-6">
        <DialogHeader className="flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-4 min-w-0">
            <TrafficLights />
            <DialogTitle className="truncate">Aritro Roy - Resume</DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            Inline preview of Aritro Roy&apos;s resume PDF
          </DialogDescription>

          <div className="flex items-center gap-2 shrink-0">
            <Button asChild size="sm" variant="outline" className="bg-zinc-800 border-none">
              <a href={RESUME_LINK} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} />
                <span className="hidden sm:inline">Open in new tab</span>
              </a>
            </Button>
            <Button asChild size="sm" variant="outline" className="bg-zinc-800 border-none">
              <a href={RESUME_LINK} download="Aritro_Roy_Resume.pdf">
                <Download size={16} />
                <span className="hidden sm:inline">Download</span>
              </a>
            </Button>
          </div>
        </DialogHeader>

        <div className="relative flex-1 rounded-md overflow-hidden bg-zinc-950">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 text-neutral-500">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading resume...</span>
            </div>
          )}
          <object
            data={`${RESUME_LINK}#view=FitH`}
            type="application/pdf"
            className="w-full h-full"
            onLoad={() => setIsLoading(false)}
          >
            <div className="flex flex-col items-center justify-center h-full gap-3 text-neutral-400 p-6 text-center">
              <p>Your browser can&apos;t preview PDFs inline.</p>
              <Button asChild variant="outline" className="bg-zinc-800 border-none">
                <a href={RESUME_LINK} target="_blank" rel="noopener noreferrer">
                  Open resume in a new tab
                </a>
              </Button>
            </div>
          </object>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeViewer;
