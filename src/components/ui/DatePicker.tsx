"use client"

import * as React from "react"
import { format } from "date-fns"
import * as Popover from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Button } from "./button"
import { Calendar } from "./calendar"

type DatePickerProps = {
  value?: Date | undefined
  onChange?: (d?: Date) => void
  placeholder?: string
  className?: string
}

function DatePicker({ value, onChange, placeholder, className }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const handleSelect = (d?: Date) => {
    onChange?.(d)
    setOpen(false)
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button variant="outline" className={cn("w-full justify-start", className)}>
          <span className={cn("truncate text-left flex-1")}>{value ? format(value, "PPP") : placeholder || "Select date"}</span>
        </Button>
      </Popover.Trigger>
      <Popover.Content side="bottom" align="start" className="p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          className="bg-transparent"
        />
      </Popover.Content>
    </Popover.Root>
  )
}

export default DatePicker
export { DatePicker }
