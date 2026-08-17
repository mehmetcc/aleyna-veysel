import React, { useState } from 'react';
import { Heart, HeartOff, User, Phone, Hotel, MessageSquare, Loader2, Plus, Minus, Check, AlertCircle } from 'lucide-react';

export default function RSVPForm() {
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [telefon, setTelefon] = useState('');
  const [katilimDurumu, setKatilimDurumu] = useState('Katılıyorum');
  const [kisiSayisi, setKisiSayisi] = useState(1);
  const [konaklama, setKonaklama] = useState('Hayır');
  const [mesaj, setMesaj] = useState('');

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const formatPhoneNumber = (value) => {
    // Basic phone formatter for Turkish numbers e.g. 5xx xxx xx xx
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    if (numbers.length <= 8) return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 8)} ${numbers.slice(8, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setTelefon(formatted);
  };

  const handleIncrement = () => {
    if (kisiSayisi < 10) setKisiSayisi(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (kisiSayisi > 1) setKisiSayisi(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ad.trim() || !soyad.trim() || !telefon.trim()) {
      setStatus('error');
      setErrorMessage('Lütfen zorunlu alanları (Ad, Soyad, Telefon) doldurun.');
      return;
    }

    const endpoint = import.meta.env.VITE_RSVP_SHEET_URL || 'https://script.google.com/macros/s/AKfycbz_fallback_placeholder/exec';

    const payload = {
      tarih: new Date().toLocaleString('tr-TR'),
      ad: ad.trim(),
      soyad: soyad.trim(),
      telefon: telefon.trim(),
      katilimDurumu,
      kisiSayisi: katilimDurumu === 'Katılıyorum' ? kisiSayisi : 0,
      konaklama: katilimDurumu === 'Katılıyorum' ? konaklama : 'Hayır',
      mesaj: mesaj.trim()
    };

    try {
      setStatus('submitting');
      
      // Standard fetch using mode: 'no-cors' as requested
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // With 'no-cors', we cannot read the response but if fetch succeeds without an error,
      // it means the request was successfully dispatched.
      setStatus('success');
    } catch (err) {
      console.error('RSVP submission error:', err);
      setStatus('error');
      setErrorMessage('Bağlantı kurulurken bir hata oluştu. Lütfen internetinizi kontrol edip tekrar deneyin.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-cream-50 border border-forest-700/20 rounded-2xl p-8 md:p-12 text-center shadow-xl animate-fade-in max-w-xl mx-auto">
        <div className="w-20 h-20 bg-forest-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-10 h-10 text-forest-700 fill-forest-700 animate-pulse-slow" />
        </div>
        <h3 className="font-serif text-3xl md:text-4xl text-forest-700 mb-4">Teşekkür Ederiz!</h3>
        <p className="font-sans text-stone-700 text-lg leading-relaxed mb-6">
          Katılım yanıtınız sevgiyle kaydedilmiştir. Aleyna & Veysel çiftinin en mutlu gününde birlikte olmak dileğiyle.
        </p>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-forest-700/20 to-transparent my-6"></div>
        <button
          onClick={() => {
            setAd('');
            setSoyad('');
            setTelefon('');
            setKatilimDurumu('Katılıyorum');
            setKisiSayisi(1);
            setKonaklama('Hayır');
            setMesaj('');
            setStatus('idle');
          }}
          className="text-forest-700 hover:text-forest-900 font-medium text-sm transition-colors underline underline-offset-4 cursor-pointer"
        >
          Yeni bir yanıt gönder
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-md border border-forest-700/10 rounded-2xl p-6 md:p-10 shadow-xl max-w-2xl mx-auto transition-all">
      <h3 className="font-serif text-3xl text-forest-700 text-center mb-2">Lütfen Katılım Durumunuzu Bildirin</h3>
      <p className="font-sans text-stone-600 text-center text-sm md:text-base mb-8">
        Planlamalarımızı eksiksiz yapabilmemiz için en geç 1 Eylül 2026 tarihine kadar yanıt vermenizi rica ederiz.
      </p>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3 text-red-800 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
          <div>
            <p className="font-semibold">Hata oluştu</p>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Surname */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-forest-900 uppercase tracking-wider mb-2">
              Ad <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                disabled={status === 'submitting'}
                value={ad}
                onChange={(e) => setAd(e.target.value)}
                placeholder="Örn. Ahmet"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-200 bg-cream-50/50 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none text-stone-800 text-sm transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-forest-900 uppercase tracking-wider mb-2">
              Soyad <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                disabled={status === 'submitting'}
                value={soyad}
                onChange={(e) => setSoyad(e.target.value)}
                placeholder="Örn. Yılmaz"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-200 bg-cream-50/50 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none text-stone-800 text-sm transition-all disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-forest-900 uppercase tracking-wider mb-2">
            Telefon Numarası <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
              <Phone className="w-4 h-4" />
            </span>
            <input
              type="tel"
              required
              disabled={status === 'submitting'}
              value={telefon}
              onChange={handlePhoneChange}
              placeholder="5XX XXX XX XX"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-200 bg-cream-50/50 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none text-stone-800 text-sm transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* RSVP Status */}
        <div>
          <label className="block text-xs font-semibold text-forest-900 uppercase tracking-wider mb-3">
            Katılım Durumu <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              disabled={status === 'submitting'}
              onClick={() => setKatilimDurumu('Katılıyorum')}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left cursor-pointer ${
                katilimDurumu === 'Katılıyorum'
                  ? 'border-forest-700 bg-forest-50/50 ring-1 ring-forest-700'
                  : 'border-stone-200 hover:bg-stone-50 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${katilimDurumu === 'Katılıyorum' ? 'bg-forest-700 text-white' : 'bg-stone-100 text-stone-500'}`}>
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800 text-sm">Katılıyorum</p>
                  <p className="text-xs text-stone-500">Orada olmaktan mutluluk duyacağım.</p>
                </div>
              </div>
              {katilimDurumu === 'Katılıyorum' && <Check className="w-5 h-5 text-forest-700 shrink-0" />}
            </button>

            <button
              type="button"
              disabled={status === 'submitting'}
              onClick={() => setKatilimDurumu('Katılamıyorum')}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left cursor-pointer ${
                katilimDurumu === 'Katılamıyorum'
                  ? 'border-forest-700 bg-forest-50/50 ring-1 ring-forest-700'
                  : 'border-stone-200 hover:bg-stone-50 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${katilimDurumu === 'Katılamıyorum' ? 'bg-stone-600 text-white' : 'bg-stone-100 text-stone-500'}`}>
                  <HeartOff className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800 text-sm">Katılamıyorum</p>
                  <p className="text-xs text-stone-500">Gelemiyorum ama mutluluklar dilerim.</p>
                </div>
              </div>
              {katilimDurumu === 'Katılamıyorum' && <Check className="w-5 h-5 text-forest-700 shrink-0" />}
            </button>
          </div>
        </div>



        {/* Conditional Attendance Fields */}
        {katilimDurumu === 'Katılıyorum' && (
          <div className="p-4 bg-forest-50/30 border border-forest-700/10 rounded-xl animate-fade-in flex items-center justify-between gap-4">
            {/* Person Count Label and Description */}
            <div className="text-left">
              <label className="block text-sm font-semibold text-forest-900">
                Kişi Sayısı
              </label>
              <p className="text-[11px] text-stone-500 mt-0.5">Kendiniz dahil katılacak kişi sayısını belirtiniz.</p>
            </div>
            {/* Control Buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                disabled={status === 'submitting'}
                onClick={handleDecrement}
                className="w-9 h-9 rounded-lg border border-stone-200 flex items-center justify-center bg-white text-stone-600 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="w-10 h-9 border border-stone-200 rounded-lg flex items-center justify-center bg-white font-semibold text-stone-800 text-sm select-none">
                {kisiSayisi}
              </div>
              <button
                type="button"
                disabled={status === 'submitting'}
                onClick={handleIncrement}
                className="w-9 h-9 rounded-lg border border-stone-200 flex items-center justify-center bg-white text-stone-600 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Accommodation Preference */}
        {katilimDurumu === 'Katılıyorum' && (
          <div>
            <label className="block text-xs font-semibold text-forest-900 uppercase tracking-wider mb-3">
              Otelde Konaklayacak mısınız?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                disabled={status === 'submitting'}
                onClick={() => setKonaklama('Evet')}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left cursor-pointer ${
                  konaklama === 'Evet'
                    ? 'border-forest-700 bg-forest-50/50 ring-1 ring-forest-700'
                    : 'border-stone-200 hover:bg-stone-50 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Hotel className="w-4 h-4 text-stone-500" />
                  <span className="font-semibold text-stone-800 text-sm">Evet</span>
                </div>
                {konaklama === 'Evet' && <Check className="w-4 h-4 text-forest-700 shrink-0" />}
              </button>

              <button
                type="button"
                disabled={status === 'submitting'}
                onClick={() => setKonaklama('Hayır')}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left cursor-pointer ${
                  konaklama === 'Hayır'
                    ? 'border-forest-700 bg-forest-50/50 ring-1 ring-forest-700'
                    : 'border-stone-200 hover:bg-stone-50 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Hotel className="w-4 h-4 text-stone-500" />
                  <span className="font-semibold text-stone-800 text-sm">Hayır</span>
                </div>
                {konaklama === 'Hayır' && <Check className="w-4 h-4 text-forest-700 shrink-0" />}
              </button>
            </div>
          </div>
        )}

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-forest-900 uppercase tracking-wider mb-2">
            Çiftimize Mesajınız (İsteğe Bağlı)
          </label>
          <div className="relative">
            <span className="absolute top-3 left-3 text-stone-400">
              <MessageSquare className="w-4 h-4" />
            </span>
            <textarea
              disabled={status === 'submitting'}
              value={mesaj}
              onChange={(e) => setMesaj(e.target.value)}
              placeholder="Güzel dileklerinizi buraya yazabilirsiniz..."
              rows="3"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-200 bg-cream-50/50 focus:border-forest-700 focus:ring-1 focus:ring-forest-700 outline-none text-stone-800 text-sm transition-all disabled:opacity-50"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-4 rounded-xl bg-forest-700 text-white font-semibold tracking-wide text-base shadow-lg shadow-forest-700/20 hover:bg-forest-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Yanıtınız İletiliyor...</span>
            </>
          ) : (
            <span>Katılım Durumunu Bildir</span>
          )}
        </button>
      </form>
    </div>
  );
}
