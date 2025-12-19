import React from 'react';
import { Helmet } from 'react-helmet-async';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

const GalleryPage: React.FC = () => {
    return (
        <div className="flex-grow flex flex-col">
            <Helmet>
                <title>Gallery | Illustrazioni e Momenti Magici di Tiko</title>
                <meta name="description" content="Guarda le illustrazioni originali e i momenti più belli tratti dai libri di Tiko. Un viaggio visivo nel mondo della magia." />
            </Helmet>
            <div className="pt-24 pb-16">
                <Gallery />
            </div>
            <Footer />
        </div>
    );
};

export default GalleryPage;
