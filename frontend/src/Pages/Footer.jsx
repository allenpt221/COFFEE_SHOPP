import { Dot } from 'lucide-react'
import React from 'react'

import facebook from '/Image/facebook.webp';
import github from '/Image/github.webp';
import instagram from '/Image/instagram.webp';
import linkedIn from '/Image/linkedin.png';


import NavbarImage from '/image/KPT.webp';





const socialMedia = [{
  social: facebook,
  link: 'https://www.facebook.com/allenpt26'
}, {
    social: instagram,
    link: 'https://www.instagram.com/ptrcklln_/'
}, {
    social: github,
    link: 'https://github.com/allenpt221'
},{
    social: linkedIn,
    link: 'https://www.linkedin.com/in/pe%C3%B1a-patrick-allen-d-9b98b8374/?trk=opento_sprofile_pfeditor'
}]

const rightItems = [
  { 
    header: 'Products',
    productItem: [
      { label: 'Payment', href: '#' },
      { label: 'Menu', href: '/Menu' },
      { label: 'Exclusive', href: '#discounted-section' },
    ]
  },
  { 
    header: 'Developer',
    productItem: [
      { label: 'Documantation', href: 'https://react.dev/' }
    ]
  },
  { 
    header: 'Resources',
    productItem: [
      { label: 'References', href: 'https://unsplash.com/' }
    ]
  }
];


const Footer = () => {
  return (
    <div className='border-t sm:mx-20 mx-5 mb-3'>
        <div className='max-w-7xl mx-auto mt-5 flex md:flex-row flex-col justify-between'>
          <div>
            <div className='flex items-center justify-center md:justify-normal'>
                <img src={NavbarImage} alt="" className='w-25 h-25 object-cover'/>
                <h1 className='text-xl font-medium'>Kape Tayo</h1>
            </div>
            <div>
              <span className='flex text-xs items-center justify-center md:justify-normal text-black/50'>
                © Copyright <Dot /> 2025 <Dot /> All rights resevered
              </span>
              <div className='flex gap-5 items-center justify-center md:justify-normal mt-3 md:mb-0 mb-4'>
                {socialMedia.map((icon, index) => (
                <a href={icon.link} target='_blank'><img key={index} src={icon.social} alt={`social-icon-${index}`} className='w-5 h-5 cursor-pointer hover:opacity-75 transition'/></a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-normal gap-10">
            {rightItems.map((item, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{item.header}</h3>
                <ul className="space-y-1">
                  {item.productItem?.map((product, i) => (
                    <li key={i} 
                    className={`text-sm text-gray-700 ${product.href === "#" ? '' : 'hover:underline cursor-pointer'}`}>
                        <a target={product.label === "Menu" ? '_self' : '_blank'}
                        onClick={(e) => {
                          if (product.href.startsWith('#')) {
                            e.preventDefault();
                            const el = document.querySelector(product.href);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth' });
                            }
                          }
                        }}  
                     href={product.href}> {product.label} </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Footer