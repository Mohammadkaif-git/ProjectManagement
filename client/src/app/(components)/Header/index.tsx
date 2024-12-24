"use client";

import React from 'react'

type Props = {
    name: string;
    buttonComponent?: React.ReactNode;
    isSmallText?: boolean;
}

const Header = ({ name, buttonComponent, isSmallText = false }: Props) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h1 className={`${
        isSmallText ? 'text-xl' : 'text-3xl'
      } font-bold tracking-tight text-gray-900 dark:text-white font-sans-serif`}>
        {name}
      </h1>
      {buttonComponent}
    </div>
  );
};

export default Header;