import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { Logo } from './Logo'

export interface FooterColumn {
  title: string
  links: { label: string; href: string }[]
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  columns: FooterColumn[]
  copyright?: string
}

export function Footer({ columns, copyright, className, ...props }: FooterProps) {
  return (
    <footer className={cn('flex flex-col gap-25 bg-teal-100 px-10 pt-10 pb-5', className)} {...props}>
      <div className="grid grid-cols-2 gap-x-10 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-20">
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="flex flex-col gap-2">
            <h2 className="type-body-md tracking-[-0.04em] text-green-100">{column.title}</h2>
            <ul className="flex list-none flex-col gap-1">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="type-body-md tracking-[-0.04em] text-green-45 hover:text-green-100 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        {copyright && <p className="type-body-xs tracking-[-0.04em] text-green-100">{copyright}</p>}
      </div>
      <Logo tone="brand" className="h-auto w-full aspect-[179.374/36]" />
    </footer>
  )
}
