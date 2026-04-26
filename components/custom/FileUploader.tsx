'use client';
import { parseCSV } from '@/lib/csvParser';
import { Button } from '@/components/ui/button';
import type { ParseResult } from '@/lib/types';
import { useRef, useState } from 'react';

interface Props {
  onParsed: (result: ParseResult) => void;
}

export function FileUploader({ onParsed }: Props) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onParsed(parseCSV(text));
    };
    reader.readAsText(file, 'UTF-8');
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
      }}
      className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors
  ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
      <p>Перетягніть CSV файл сюди або</p>
      <Button onClick={() => inputRef.current?.click()}>Обрати файл</Button>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
