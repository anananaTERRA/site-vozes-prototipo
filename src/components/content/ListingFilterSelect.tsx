import { cn } from "cn"
import {
  roundFilterSelectContent,
  roundFilterSelectItem,
  roundFilterSelectTrigger,
} from "@/lib/round-control"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type ListingFilterOption = {
  value: string
  label: string
}

export function ListingFilterSelect({
  value,
  onValueChange,
  ariaLabel,
  prefix,
  placeholder,
  options,
  triggerClassName,
}: {
  value: string
  onValueChange: (value: string) => void
  ariaLabel: string
  prefix?: string
  placeholder?: string
  options: ListingFilterOption[]
  triggerClassName?: string
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger aria-label={ariaLabel} className={cn(roundFilterSelectTrigger(), triggerClassName)}>
        {prefix ? <span className="shrink-0 text-navy">{prefix}</span> : null}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper" align="start" sideOffset={8} className={roundFilterSelectContent}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className={roundFilterSelectItem}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
