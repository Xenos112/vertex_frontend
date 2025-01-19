'use client'
import cn from '@/utils/cn'
import React, { useRef, useEffect, TextareaHTMLAttributes } from 'react'

interface AdaptiveTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: number
}

// FIX: fix the height and the style of the textarea
// TODO: make use of the component
export default function AdaptiveTextarea({
  className,
  maxHeight = 200,
  ...props
}: AdaptiveTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`
    }
  }

  useEffect(() => {
    adjustHeight()
  }, [props.value])

  return (
    <div
      className={cn(
        "relative w-full max-w-md",
        className
      )}
      style={{ maxHeight: `${maxHeight}px` }}
    >
      <textarea
        {...props}
        ref={textareaRef}
        onChange={(e) => {
          adjustHeight()
          props.onChange?.(e)
        }}
        className={cn(
          "w-full min-h-[30px] p-3 text-sm rounded-md border border-input bg-background",
          "resize-none overflow-y-auto",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-input",
          className
        )}
        style={{ maxHeight: `${maxHeight}px` }}
      />
    </div>
  )
}

