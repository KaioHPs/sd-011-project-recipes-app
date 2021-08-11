import React from 'react';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function ExplorarComida() {
  return (
    <div>
      <Header lupa={ false } text="Explorar Comidas" />
      <LowerMenu />
    </div>
  );
}
