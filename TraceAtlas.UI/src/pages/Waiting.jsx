import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Globe } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const pageLinks = [
  { to: '/about', label: 'Hakkımızda' },
  { to: '/privacy-policy', label: 'Gizlilik politikası' },
  { to: '/terms', label: 'Kullanım koşulları' },
];

export default function Waiting() {
  return (
    <div className="flex min-h-svh flex-col bg-[#071f18] font-sans text-[#f0efe4] selection:bg-[#dce2cb] selection:text-[#071f18] [&_a]:outline-offset-8 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-[#dce2cb]">
      <Helmet htmlAttributes={{ lang: 'tr' }}>
        <title>TraceAtlas — Yeniden buluşmak üzere</title>
        <meta name="description" content="TraceAtlas'a kısa bir süreliğine ara veriyoruz. 3.000'den fazla kullanıcımıza, kendi dünyasından bir parçayı bizimle paylaşan herkese teşekkürler. Yeniden buluşmak üzere." />
        <link rel="canonical" href="https://www.traceatlas.com.tr/" />
      </Helmet>

      <a href="#main" className="absolute -top-24 left-5 z-50 bg-[#dce2cb] p-3 text-[#071f18] focus:top-4">İçeriğe geç</a>

      <header className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-4 px-6 py-6 sm:px-10 sm:py-7 lg:px-14">
        <Link to="/" aria-label="TraceAtlas ana sayfa" className="inline-flex items-center gap-3">
          <img src="/android-chrome-192x192.png" alt="" width="40" height="40" className="size-9 rounded-full sm:size-10" />
          <span className="text-[21px] font-semibold tracking-[-1px] sm:text-[24px]">Trace<span className="font-light text-[#a8dbc4]">Atlas</span></span>
        </Link>
        <span className="flex items-center gap-2 font-mono text-[9px] tracking-[.08em] text-[#b5c2b4] sm:text-[10px]">
          <span className="size-1.5 shrink-0 rounded-full bg-[#d2aa71]" />
          KISA BİR ARA
        </span>
      </header>

      <main id="main" className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10 sm:py-16">
        <article className="mx-auto w-full max-w-[1000px] text-center" aria-labelledby="waiting-title">
          <h1 id="waiting-title" className="mx-auto max-w-[900px] text-balance font-[Georgia,'Times_New_Roman',serif] text-[clamp(36px,4.5vw,62px)] leading-[1.18] font-normal tracking-[-.045em]">
            TraceAtlas'a kısa bir<br className="hidden sm:block" /> süreliğine ara veriyoruz.
          </h1>

          <div className="mx-auto mt-8 max-w-[900px] space-y-6 text-pretty text-[18px] leading-[1.85] font-light text-[#bfcfc1] sm:mt-10 sm:text-[21px] lg:text-[23px]">
            <p>Her şey haritaya eklenen birkaç noktayla başladı. Sonra birileri sevdiği bir yeri, birileri kimseye anlatmadığı bir köşeyi paylaştı. Hiç tanışmadığımız insanlarla aynı haritada buluştuk. TraceAtlas'ı en çok bu yüzden sevdik.</p>
            <p>Şimdi yenilenmek için kısa bir ara veriyoruz. Bu sürede harita, giriş ve yeni yer işaretleme özellikleri kapalı olacak. Bir süre haritaya yeni bir nokta eklenmeyecek. Bunu söylemek bile biraz buruk.</p>
            <p>Buraya zaman ayıran, kendi dünyasından bir parçayı bizimle paylaşan herkese teşekkürler. Bu aranın ardından nasıl bir TraceAtlas'la buluşacağımızı biz de heyecanla düşünüyoruz.</p>
            <p className="font-[Georgia,'Times_New_Roman',serif] text-[25px] leading-relaxed tracking-[-.02em] text-[#e1e8d5] italic sm:text-[31px]">Sizinle büyüdük. Anlatacaklarımız henüz bitmedi.</p>
          </div>

          <div className="mt-10 sm:mt-12">
            <span className="mx-auto mb-6 block h-px w-10 bg-[#bdcda9]/40" aria-hidden="true" />
            <p className="text-sm text-[#aebfae] sm:text-base">Her birinize gönülden teşekkür ederim.</p>
            <p className="mt-3 font-[Georgia,'Times_New_Roman',serif] text-[29px] tracking-[-.035em] text-[#e1e8d5] italic sm:text-[34px]">Eyüp Kaya</p>
          </div>

          <nav aria-label="Proje ve kişisel portfolyo" className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a href="https://github.com/dpeyupkaya/TraceAtlas_API" target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 w-full max-w-72 items-center justify-center gap-3 rounded-lg border border-[#b8cbb0]/20 px-5 py-3 text-sm text-[#c7d6c3] transition-colors hover:border-[#b8cbb0]/50 hover:bg-white/[0.03] sm:w-auto">
              <Github size={17} strokeWidth={1.5} aria-hidden="true" />
              Projeyi GitHub'da incele
              <ArrowUpRight size={15} className="text-[#91aa95]" aria-hidden="true" />
              <span className="sr-only"> (yeni sekmede açılır)</span>
            </a>
            <a href="https://ekaya.com.tr/" target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 w-full max-w-72 items-center justify-center gap-3 rounded-lg border border-[#b8cbb0]/20 px-5 py-3 text-sm text-[#c7d6c3] transition-colors hover:border-[#b8cbb0]/50 hover:bg-white/[0.03] sm:w-auto">
              <Globe size={17} strokeWidth={1.5} aria-hidden="true" />
              Kişisel portfolyom
              <ArrowUpRight size={15} className="text-[#91aa95]" aria-hidden="true" />
              <span className="sr-only"> (yeni sekmede açılır)</span>
            </a>
          </nav>

          <p className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#91aa95] sm:mt-11 sm:text-sm" aria-label="TraceAtlas topluluğu">
            <span><strong className="font-medium text-[#b8cbb0]">3.000+</strong> kullanıcı</span>
            <span className="size-1 rounded-full bg-[#91aa95]/50" aria-hidden="true" />
            <span><strong className="font-medium text-[#b8cbb0]">100+</strong> işaretlenmiş yer</span>
          </p>
        </article>
      </main>

      <footer className="mx-auto flex w-[calc(100%-48px)] max-w-[1208px] flex-col items-center justify-between gap-3 border-t border-[#d3dfc4]/10 py-5 sm:w-[calc(100%-80px)] sm:flex-row sm:py-6">
        <p className="font-mono text-[10px] tracking-wide text-[#839b87]">© {new Date().getFullYear()} TRACEATLAS</p>
        <nav aria-label="Bilgi sayfaları" className="flex flex-wrap justify-center gap-x-6 gap-y-1">
          {pageLinks.map(({ to, label }) => (
            <Link key={to} to={to} className="py-2 text-xs text-[#aabdab] transition-colors hover:text-[#f0efe4]">{label}</Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}
