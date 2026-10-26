import clsx from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Joins class names and resolves Tailwind conflicts so a `className` prop can override a component's defaults. */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
