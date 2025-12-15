import React from 'react';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

const GalleryPage: React.FC = () => {
    return (
        <div className="flex-grow flex flex-col">
            <div className="pt-24 pb-16">
                <Gallery />
            </div>
            <Footer />
        </div>
    );
};

export default GalleryPage;
