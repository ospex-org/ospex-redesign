'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface PreloadLinkProps {
  href: string;
  children: React.ReactNode;
  [key: string]: any;
}

const PreloadLink = ({ href, children, ...props }: PreloadLinkProps) => {
  const router = useRouter()

  const handleMouseEnter = () => {
    router.prefetch(href)
  }

  return (
    <Link 
      href={href} 
      onMouseEnter={handleMouseEnter}
      style={{ display: 'block', height: '100%' }}
      {...props}
    >
      {children}
    </Link>
  )
}

export default PreloadLink