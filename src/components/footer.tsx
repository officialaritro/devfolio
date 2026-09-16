import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='flex items-center justify-between gap-4 pt-6 mt-2 border-t border-white/10 text-xs text-neutral-500'>
      <p>{"© "}{new Date().getFullYear()}{" Aritro Roy"}</p>

      <nav className='flex items-center gap-4'>
        <Link href='/now' className='hover:text-white transition-colors'>now</Link>
        <Link href='/uses' className='hover:text-white transition-colors'>uses</Link>
      </nav>
    </footer>
  )
}

export default Footer
