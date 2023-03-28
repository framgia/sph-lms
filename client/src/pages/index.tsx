import React, { Fragment } from 'react';
import Head from 'next/head';
import NavbarSection from '../sections/landing-page/Navbar';
import HeroSection from '../sections/landing-page/Hero';
import BenefitsSection from '../sections/landing-page/Benefits';
import TestimonialsSection from '../sections/landing-page/Testimonials';

const LandingPage: React.FunctionComponent = () => {
  return (
    <Fragment>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="sticky top-0 overflow-hidden">
        <NavbarSection
          navItems={['About', 'Benefits', 'Testimonies']}
        ></NavbarSection>
      </div>
      <div className="h-screen w-auto pl-40 pr-10">
        <HeroSection></HeroSection>
      </div>
      <div className="h-screen w-auto pl-40 pr-20">
        <BenefitsSection></BenefitsSection>
      </div>
      <div className="h-screen w-auto pl-20 pr-20">
        <TestimonialsSection></TestimonialsSection>
      </div>
    </Fragment>
  );
};

export default LandingPage;
