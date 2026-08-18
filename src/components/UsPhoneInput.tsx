"use client";

import React, { useState } from "react";

export function formatUsPhone(input: string) {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("1")) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  const area = digits.slice(0, 3);
  const mid = digits.slice(3, 6);
  const last = digits.slice(6, 10);
  if (digits.length === 0) return "+1 ";
  if (digits.length < 4) return `+1 (${area}`;
  if (digits.length < 7) return `+1 (${area}) ${mid}`;
  return `+1 (${area}) ${mid}-${last}`;
}

export function isCompleteUsPhone(value: string) {
  return /^\+1 \(\d{3}\) \d{3}-\d{4}$/.test(value);
}

type UsPhoneInputProps = {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  className?: string;
  id?: string;
};

export default function UsPhoneInput({
  name,
  value,
  onChange,
  required,
  className,
  id,
}: UsPhoneInputProps) {
  const [inner, setInner] = useState(value ?? "+1 ");
  const display = value !== undefined ? value || "+1 " : inner;

  const handleChange = (raw: string) => {
    const next = formatUsPhone(raw);
    if (value === undefined) setInner(next);
    onChange?.(next);
  };

  return (
    <input
      id={id}
      name={name}
      type="tel"
      inputMode="tel"
      autoComplete="tel-national"
      required={required}
      value={display}
      placeholder="+1 (919) 555-0123"
      pattern="^\+1 \(\d{3}\) \d{3}-\d{4}$"
      title="Enter a US phone number, for example +1 (919) 555-0123"
      onChange={(e) => handleChange(e.target.value)}
      className={className}
    />
  );
}
