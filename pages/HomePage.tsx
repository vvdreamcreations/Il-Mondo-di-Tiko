import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
const Values = React.lazy(() => import('../components/Values'));
const ScrollVideo = React.lazy(() => import('../components/ScrollVideo'));
const About = React.lazy(() => import('../components/About'));
const BooksStack = React.lazy(() => import('../components/BooksStack'));
const Reviews = React.lazy(() => import('../components/Reviews'));
const Newsletter = React.lazy(() => import('../components/Newsletter'));
const Footer = React.lazy(() => import('../components/Footer'));

const HomePage: React.FC = () => {
    return (
        <div className="flex-grow flex flex-col">
            <Helmet>
                <title>Il Mondo di Tiko | Libri illustrati per bambini e crescita emotiva</title>
                <meta name="description" content="Scopri il mondo di Tiko: libri illustrati per bambini che insegnano a gestire le emozioni con dolcezza. Storie educative su rabbia, calma e gentilezza per crescere felici." />
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "VV Dream Creations",
                        "url": "https://www.vvdreamcreations.it",
                        "logo": "https://www.vvdreamcreations.it/vv-dream-creations-logo.webp",
                        "sameAs": [
                            "https://www.facebook.com/vvdreamcreations",
                            "https://www.instagram.com/vvdreamcreations"
                        ]
                    }
                `}
                </script>
            </Helmet>

            <Hero />

            <React.Suspense fallback={<div className="h-screen w-full" />}>
                {/* Su mobile spacing ridotto per non allungare ulteriormente la Home */}
                <div className="space-y-16 md:space-y-32 pb-12 md:pb-24 mt-6 md:mt-10">
                    <div className="content-visibility-auto">
                        <Values />
                    </div>
                    <ScrollVideo />
                    <div className="content-visibility-auto">
                        <About />
                    </div>
                </div>

                {/* BooksStack fuori dal space-y per non interferire col pin desktop */}
                <div className="mt-16 md:mt-32">
                    <BooksStack />
                </div>

                <div className="space-y-16 md:space-y-32 pb-12 md:pb-24 mt-16 md:mt-32">
                    <div className="content-visibility-auto">
                        <Reviews />
                    </div>
                    <div className="content-visibility-auto">
                        <Newsletter />
                    </div>
                </div>

                <Footer />
            </React.Suspense>
        </div>
    );
};

export default HomePage;
