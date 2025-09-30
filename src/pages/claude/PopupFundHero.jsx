import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Hero from '../hero/Hero';

export default function PopupFundHero() {
 
  return (
    <div className="hero-container">
     <Header />
      <Hero/>
    </div>
  );
}