type Feature = {
  title: string;
  description: string;
  icon: string;
};

export const features: Feature[] = [
  {
    title: "Rápido y sencillo",
    description: "Acortar URLs instantáneamente. Carga más rápida.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='text-purple'><path d='m8 3 4 8 5-5 5 15H2L8 3z'></path></svg>",
  },
  {
    title: "Análisis sencillo",
    description: "Seguimiento de clicks y rendimiento en un vistazo.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='text-orange'><path d='M3 3v18h18'></path><path d='m19 9-5 5-4-4-3 3'></path></svg>",
  },
  {
    title: "Enlaces personalizados",
    description: "Enlaces brandeados que reflejen tu identidad.",
    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='text-purple'><path d='M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5'></path><path d='M8.5 8.5v.01'></path><path d='M16 15.5v.01'></path><path d='M12 12v.01'></path><path d='M11 17v.01'></path><path d='M7 14v.01'></path></svg>",
  },
];
