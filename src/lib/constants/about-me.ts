export interface AboutChip {
  name: string;
  href: string;
  /** GitHub owner whose avatar is shown as the chip logo. */
  avatar?: string;
}

export const aboutIntro = "Hey! I'm Aritro, a backend and AI engineer.";

export const aboutRoles: { label: string; chips: AboutChip[] }[] = [
  {
    label: 'Working at',
    chips: [{ name: 'Whatbytes Technologies', href: 'https://whatbytes.com' }],
  },
  {
    label: 'Contributing to',
    chips: [
      { name: 'pnpm', href: 'https://github.com/pnpm/pnpm/pulls?q=author%3Aofficialaritro', avatar: 'pnpm' },
      { name: 'Plane', href: 'https://github.com/makeplane/plane/pulls?q=author%3Aofficialaritro', avatar: 'makeplane' },
      { name: 'Patchwork', href: 'https://github.com/patched-codes/patchwork/pulls?q=author%3Aofficialaritro', avatar: 'patched-codes' },
    ],
  },
  {
    label: 'Building',
    chips: [{ name: 'reqlite', href: 'https://github.com/officialaritro/reqlite', avatar: 'officialaritro' }],
  },
];

const link = (href: string, label: string, external = true) =>
  `<a href="${href}"${external ? ' target="_blank"' : ''} class="hover-animation relative">${label}</a>`;

export const aboutParagraphs = [
  `I like turning messy data into systems people can rely on, and I'm happiest when the work is a pipeline, an API or a search problem. Right now I'm going deeper into Rust, AI systems and system design. Everything I've shipped and contributed is on the ${link('/projects', 'projects page', false)}.`,
  `Outside of programming, I play games, perform music live and lift weights, usually with too much caffeine. I'm based in Asansol, India. In case you're curious, here is the ${link('/uses', 'hardware and software I use', false)}, and what I'm up to ${link('/now', 'right now', false)}. You can also find me on ${link('https://x.com/dopefaith1', 'X')}, ${link('https://github.com/officialaritro', 'GitHub')} and ${link('https://www.linkedin.com/in/aritroroy404', 'LinkedIn')}.`,
];


export const RESUME_LINK = "/resume/Aritro_Resume_SDE.pdf"