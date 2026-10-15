import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { BOOKS } from '../data/booksData';

interface OrderFormProps {
  selectedBookId: string;
  onSelectBook: (bookId: string) => void;
}

// Submissions go to Netlify Forms; the matching skeleton lives in public/__forms.html.
export const OrderForm: React.FC<OrderFormProps> = ({ selectedBookId, onSelectBook }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString()
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="bg-white border border-stone-200 rounded-lg p-8 text-center">
        <CheckCircle className="w-10 h-10 text-green-600 mx-auto" />
        <p className="mt-3 text-lg font-semibold text-stone-900">Shukriya! Aap ka order mil gaya.</p>
        <p className="text-stone-500 text-sm mt-1">Hum jald aap se phone par rabta karenge.</p>
        <button onClick={() => setStatus('idle')} className="mt-5 text-sm text-[#b5121b] underline">
          Aik aur order karein
        </button>
      </div>
    );
  }

  const inputClass =
    'w-full border border-stone-300 rounded-md px-3 py-2 text-stone-900 focus:outline-none focus:border-[#b5121b]';

  return (
    <form
      name="book-order"
      method="POST"
      onSubmit={handleSubmit}
      className="bg-white border border-stone-200 rounded-lg p-6 grid gap-4 sm:grid-cols-2"
    >
      <input type="hidden" name="form-name" value="book-order" />
      <p className="hidden">
        <label>
          Isay khaali chhorein: <input name="bot-field" />
        </label>
      </p>

      <label className="sm:col-span-2 text-sm text-stone-700">
        Kitaab
        <select
          name="book"
          required
          value={selectedBookId}
          onChange={(e) => onSelectBook(e.target.value)}
          className={`${inputClass} mt-1`}
        >
          <option value="">Kitaab chunein</option>
          {BOOKS.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title} — {b.poet} (Rs. {b.pricePkr})
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm text-stone-700">
        Naam
        <input name="name" required className={`${inputClass} mt-1`} />
      </label>
      <label className="text-sm text-stone-700">
        Phone / WhatsApp
        <input name="phone" type="tel" required className={`${inputClass} mt-1`} />
      </label>
      <label className="text-sm text-stone-700">
        Sheher
        <input name="city" required className={`${inputClass} mt-1`} />
      </label>
      <label className="text-sm text-stone-700">
        Tadaad
        <input name="quantity" type="number" min={1} defaultValue={1} required className={`${inputClass} mt-1`} />
      </label>
      <label className="sm:col-span-2 text-sm text-stone-700">
        Pura pata (address)
        <textarea name="address" rows={3} required className={`${inputClass} mt-1`} />
      </label>

      <div className="sm:col-span-2 flex items-center justify-between gap-4">
        <p className="text-xs text-stone-500">Cash on delivery — poore Pakistan mein.</p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-[#b5121b] hover:bg-[#8f0e15] disabled:opacity-60 text-white font-medium px-6 py-2.5 rounded-md"
        >
          {status === 'sending' ? 'Bhej rahe hain…' : 'Order Bhejein'}
        </button>
      </div>
      {status === 'error' && (
        <p className="sm:col-span-2 text-sm text-red-600">Order nahi gaya, dobara koshish karein.</p>
      )}
    </form>
  );
};
