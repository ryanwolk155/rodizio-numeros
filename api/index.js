export default function handler(req, res) {
  // 1. Lista de links BASE (sem parâmetros)
  const baseLinks = [
    "https://modelapi.my.canva.site/",
    "https://modelapi.my.canva.site/c-pia-de-in-cio"
  ];

  // 2. Adiciona timestamp COMO PARÂMETRO (não no path!)
  const links = baseLinks.map(link => `${link}?ts=${Date.now()}`);

  // 3. Cabeçalhos ANTI-CACHE (versão reforçada)
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Surrogate-Control', 'no-store');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('CDN-Cache-Control', 'no-store, max-age=0');
  res.setHeader('Vary', '*');

  // 4. Seleção aleatória com verificação
  if (baseLinks.length === 0) {
    res.status(500).send('Nenhum link configurado');
    return;
  }
  const selectedLink = links[Math.floor(Math.random() * links.length)];

  // 5. Log detalhado (útil no painel do Vercel)
  console.log(`Redirecionando para: ${selectedLink} | IP: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`);
  
  // 6. Redirecionamento 307 + Prevenção de cache extra
  res.redirect(307, selectedLink);
}
