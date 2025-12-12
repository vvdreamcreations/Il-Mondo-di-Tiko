import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 py-12 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-black/30 backdrop-blur-md inline-block px-12 py-8 rounded-3xl border border-white/10">
            {/* VV Dream Creations Logo */}
            <div className="mb-6 flex justify-center">
                <img 
                    src="/vv-dream-creations-logo.png" 
                    alt="VV Dream Creations Logo" 
                    className="h-16 md:h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                            const fallback = document.createElement('span');
                            fallback.innerText = "VV Dream Creations";
                            fallback.className = "font-display font-bold text-2xl text-white";
                            parent.appendChild(fallback);
                        }
                    }}
                />
            </div>
            
            <div className="flex justify-center gap-8 mb-8 font-medium">
            <a href="#" className="hover:text-tiko-yellow transition-colors hover:scale-110 transform duration-200">Instagram</a>
            <a href="#" className="hover:text-tiko-yellow transition-colors hover:scale-110 transform duration-200">Facebook</a>
            <a href="#" className="hover:text-tiko-yellow transition-colors hover:scale-110 transform duration-200">Amazon</a>
            </div>

            <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} VV Dream Creations. Tutti i diritti riservati. <br/>
            Designed with ❤️ for magic moments.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;