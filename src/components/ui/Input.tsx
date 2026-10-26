import { cn } from '../../lib/cn'
import { Search } from 'lucide-react'
import { useId } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface FieldProps {
  label?: string
  hint?: string
}

const fieldBase =
  'type-body-sm w-full rounded-sm border border-border-default bg-bg-default p-2 text-text-primary ' +
  'placeholder:text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-teal-70 ' +
  'disabled:cursor-not-allowed disabled:bg-bg-subtle'

function Field({ id, label, hint, children }: FieldProps & { id: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="type-label-xs text-gray-800">
          {label}
        </label>
      )}
      {children}
      {hint && <p className="type-body-xs h-4 text-text-secondary">{hint}</p>}
    </div>
  )
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, FieldProps {}

export function Input({ label, hint, className, id, ...props }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <Field id={inputId} label={label} hint={hint}>
      <input id={inputId} className={cn(fieldBase, 'min-h-13', className)} {...props} />
    </Field>
  )
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldProps {}

export function Textarea({ label, hint, className, id, ...props }: TextareaProps) {
  const autoId = useId()
  const textareaId = id ?? autoId
  return (
    <Field id={textareaId} label={label} hint={hint}>
      <textarea id={textareaId} className={cn(fieldBase, 'h-32 resize-y', className)} {...props} />
    </Field>
  )
}

export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function SearchInput({ className, placeholder = 'Search', ...props }: SearchInputProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center gap-2 rounded-full border border-border-default bg-bg-default px-2 py-4',
        'focus-within:outline-2 focus-within:outline-teal-70',
        className,
      )}
    >
      <Search className="size-4 shrink-0 text-icon-secondary" aria-hidden />
      <input
        type="search"
        placeholder={placeholder}
        className="type-body-xs min-w-0 flex-1 bg-transparent text-text-primary outline-none placeholder:text-gray-500"
        {...props}
      />
    </div>
  )
}
