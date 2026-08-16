import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Music, GlassWater, Sparkles, Navigation, Hotel, Heart, ChevronDown } from 'lucide-react';
import RSVPForm from './components/RSVPForm';

export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    completed: false
  });

  useEffect(() => {
    const weddingTime = new Date('2026-09-19T19:00:00+03:00').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = weddingTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, completed: false });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col selection:bg-forest-200 selection:text-forest-900">
      
      {/* Background audio/decoration placeholder if needed, otherwise clean layout */}

      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden bg-cream-200">
        
        {/* Soft decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-forest-50/40 rounded-full blur-3xl -translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-forest-50/30 rounded-full blur-3xl translate-x-24 translate-y-24"></div>

        {/* Elegant Invitation Card Frame */}
        <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-forest-700/5 transition-all hover:shadow-forest-700/5 duration-700">
          
          {/* Botanical Background Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-95 mix-blend-multiply pointer-events-none"
            style={{ backgroundImage: 'url("/botanical_bg.jpg")' }}
          ></div>
          
          {/* Invitation Content Wrapper */}
          <div className="relative z-10 p-6 sm:p-12 md:p-20 flex flex-col items-center text-center justify-between min-h-[70vh] md:min-h-[80vh]">
            
            {/* Top Header */}
            <div className="space-y-2 animate-fade-in pt-4 sm:pt-6">
              <div className="bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-gold-500/30 shadow-sm inline-block">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-forest-700 block">
                  DÜĞÜN DAVETİYESİ
                </span>
              </div>
            </div>

            {/* Names */}
            <div className="my-8 md:my-12 animate-fade-in-up">
              <h1 className="font-script text-7xl sm:text-8xl md:text-9xl text-forest-700 leading-tight">
                Aleyna <br />
                <span className="block my-2 text-5xl sm:text-6xl md:text-7xl">&</span>
                Veysel
              </h1>
              <p className="font-serif italic text-base md:text-xl text-stone-600 tracking-wide mt-2">
                "En anlamlı anımızı sizinle paylaşmaktan mutluluk duyarız."
              </p>
            </div>

            {/* Countdown / Details Container */}
            <div className="w-full max-w-lg space-y-6 md:space-y-8 animate-fade-in">
              
              {/* Countdown Clock */}
              {!timeLeft.completed ? (
                <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
                  {[
                    { label: 'GÜN', val: timeLeft.days },
                    { label: 'SAAT', val: timeLeft.hours },
                    { label: 'DAKİKA', val: timeLeft.minutes },
                    { label: 'SANİYE', val: timeLeft.seconds },
                  ].map((t, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white/95 border border-forest-700/10 rounded-xl p-2.5 sm:p-4 shadow-sm flex flex-col items-center justify-center transition-all hover:border-gold-500/50"
                    >
                      <span className="font-serif text-2xl sm:text-4xl font-semibold text-forest-700 tabular-nums">
                        {String(t.val).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-stone-500 mt-1">
                        {t.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-forest-50 border border-forest-700/10 rounded-xl py-3 px-6 text-forest-700 font-serif italic text-lg animate-pulse-slow">
                  Mutlu günümüz bugün!
                </div>
              )}

              {/* Event Date & Location Summary */}
              <div className="space-y-2">
                <p className="font-serif text-lg md:text-2xl text-forest-700 font-semibold tracking-wide flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5 text-gold-600" />
                  19 Eylül 2026, Cumartesi • 19:00
                </p>
                <p className="font-sans text-sm md:text-base text-stone-600 flex items-center justify-center gap-1.5">
                  <MapPin className="w-4 h-4 text-forest-700" />
                  Wyndham Garden Otel, Diyarbakır
                </p>
              </div>

              {/* Scroll Call To Action */}
              <div>
                <a 
                  href="#rsvp" 
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-forest-700 text-white font-medium tracking-wide text-sm shadow-lg shadow-forest-700/25 hover:bg-forest-800 hover:shadow-xl hover:translate-y-[-1px] active:translate-y-[1px] transition-all cursor-pointer"
                >
                  Katılım Durumunu Bildir
                  <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
                </a>
              </div>

            </div>

            {/* Scroll indicator icon */}
            <div className="mt-8 animate-bounce opacity-50">
              <ChevronDown className="w-6 h-6 text-forest-700" />
            </div>

          </div>
        </div>
      </section>

      {/* Welcome Message Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-forest-50/20 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Soft Leaf/Flower Icon Overlay */}
        <div className="w-16 h-16 bg-cream-200 border border-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <Sparkles className="w-6 h-6 text-gold-600" />
        </div>

        <h2 className="font-serif text-3xl md:text-5xl text-forest-700 mb-6">
          Sevgili Ailemiz ve Dostlarımız,
        </h2>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="font-serif italic text-lg md:text-2xl text-stone-700 leading-relaxed">
            "Bu sayfada düğünümüzle ilgili ihtiyaç duyacağınız tüm bilgilere ulaşabilirsiniz. Bu özel anımızı sizlerle birlikte kutlamak için sabırsızlanıyoruz. Lütfen katılım durumunuzu bizimle paylaşmayı unutmayın."
          </p>
          
          <div className="pt-6">
            <p className="font-sans text-xs tracking-[0.2em] text-stone-500 uppercase">
              Ocak ve Topalan Aileleri adına
            </p>
            <p className="font-serif italic text-lg text-stone-600 mt-4">
              Sevgilerimizle,
            </p>
            <p className="font-script text-4xl text-forest-700 mt-1">
              Aleyna & Veysel
            </p>
          </div>
        </div>
        
        {/* Custom elegant divider line */}
        <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-16"></div>
      </section>

      {/* Program (Timeline) Section */}
      <section className="py-20 bg-cream-50/50 border-y border-forest-700/5 px-4 relative">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold tracking-[0.3em] text-gold-600 uppercase block mb-2">
              AKIŞ VE DETAYLAR
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-forest-700">Düğün Programı</h2>
            <div className="w-16 h-[2px] bg-forest-700 mx-auto mt-4"></div>
          </div>

          <div className="max-w-md mx-auto bg-white border border-forest-700/5 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 relative z-10">
            <div className="space-y-6">
              {[
                {
                  time: '19:00',
                  title: 'Kokteyl',
                  icon: GlassWater
                },
                {
                  time: '20:00',
                  title: 'Nikah',
                  icon: Heart
                },
                {
                  time: '21:00',
                  title: 'Eğlence',
                  icon: Music
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-6 p-4 rounded-2xl bg-cream-50/50 border border-forest-700/5 hover:border-gold-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center text-forest-700 shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-serif text-lg font-bold text-gold-600 tracking-wider">
                      {item.time}
                    </span>
                    <h3 className="font-serif text-2xl text-forest-700 font-semibold mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Mekan ve Ulaşım Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold tracking-[0.3em] text-gold-600 uppercase block mb-2">
              ULAŞIM KILAVUZU
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-forest-700">Mekan ve Ulaşım</h2>
            <div className="w-16 h-[2px] bg-forest-700 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Address Details & Transport Card */}
            <div className="lg:col-span-5 bg-white border border-forest-700/5 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between space-y-8">
              
              <div>
                <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center text-forest-700 mb-6">
                  <Hotel className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-forest-700 mb-2">Wyndham Garden Otel</h3>
                <p className="font-serif italic text-sm text-stone-500 mb-4">Diyarbakır</p>
                
                <p className="font-sans text-stone-700 text-sm md:text-base leading-relaxed mb-6">
                  Elazığ Caddesi No:34, Yenişehir / Diyarbakır
                </p>
              </div>

              {/* Transportation detail cards */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <div className="flex gap-3 text-sm">
                  <Navigation className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-stone-800 text-sm md:text-base">Ulaşım Kolaylığı</p>
                    <p className="text-stone-500 text-xs md:text-sm">Şehir merkezindeki konumda bulunup havalimanına 15 dakika, şehirlerarası otogara ise 10 dakika sürüş mesafesindedir.</p>
                  </div>
                </div>
              </div>

              {/* Direct Maps Action */}
              <div className="pt-6">
                <a
                  href="https://maps.app.goo.gl/4ES7rCHe1fb5VgWr5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl border border-forest-700 text-forest-700 font-semibold text-sm text-center hover:bg-forest-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  Google Haritalar'da Aç
                </a>
              </div>

            </div>

            {/* Embedded Google Map Preview Card */}
            <div className="lg:col-span-7 bg-white border border-forest-700/5 rounded-2xl overflow-hidden shadow-sm min-h-[350px] lg:min-h-auto relative">
              <iframe
                title="Wyndham Garden Otel Diyarbakır Haritası"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.12745300649!2d40.2173167!3d37.927237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40751f893d56d787%3A0xe54e60b29ff5e4ab!2sWyndham%20Garden%20Diyarbakir!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>

          </div>

        </div>
      </section>

      {/* RSVP Section (Katılım Onayı) */}
      <section id="rsvp" className="py-20 bg-cream-200 border-t border-forest-700/5 px-4 scroll-mt-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-[11px] font-semibold tracking-[0.3em] text-gold-600 uppercase block mb-2">
              REZERVASYON
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-forest-700">Katılım Onayı</h2>
            <div className="w-16 h-[2px] bg-forest-700 mx-auto mt-4"></div>
          </div>

          {/* Form Component Container */}
          <div className="relative">
            <RSVPForm />
          </div>

        </div>
      </section>

      {/* Footer Section */}
      <footer className="mt-auto py-12 border-t border-forest-700/5 bg-white text-center px-4 relative overflow-hidden">
        
        {/* Soft floral/divider decoration */}
        <div className="w-24 h-[1px] bg-gold-500 mx-auto mb-6"></div>

        <div className="space-y-4">
          <p className="font-script text-3xl text-forest-700">Aleyna & Veysel</p>
          <p className="font-sans text-xs text-stone-400 uppercase tracking-widest">
            19 Eylül 2026 • Wyndham Garden Otel, Diyarbakır
          </p>
          <p className="font-sans text-[11px] text-stone-400 mt-8">
            © 2026 Tüm Hakları Saklıdır. Mutlulukla Hazırlandı.
          </p>
        </div>
      </footer>

    </div>
  );
}
