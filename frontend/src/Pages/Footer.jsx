import { Dot } from 'lucide-react'
import React from 'react'

import facebook from '/Image/facebook.webp';
import github from '/Image/github.webp';
import instagram from '/Image/instagram.webp';


const socialMedia = [facebook, instagram, github]

const rightItems = [
  { 
    header: 'Products',
    productItem: [
      { label: 'Payment', href: 'https://example.com/payment' },
      { label: 'Menu', href: 'https://example.com/menu' }
    ]
  },
  { 
    header: 'Developer',
    productItem: [
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'Docs', href: 'https://example.com/docs' }
    ]
  },
  { 
    header: 'Resources',
    productItem: [
      { label: 'Support', href: 'https://example.com/support' },
      { label: 'Blog', href: 'https://example.com/blog' }
    ]
  }
];


const Footer = () => {
  return (
    <div className='border-t sm:mx-20 mx-5 mb-50'>
        <div className='max-w-7xl mx-auto mt-5 flex justify-between'>
          <div>
            <div className='flex items-center'>
                <img src='/Image/KPT.webp' alt="" className='w-25 h-25 object-cover'/>
                <h1 className='text-xl font-medium'>Kape Tayo</h1>
            </div>
            <div>
              <span className='flex text-xs items-center text-black/50'>
                © Copyright <Dot /> 2025 <Dot /> All rights resevered
              </span>
              <div className='flex gap-5 items-center mt-3'>
                {socialMedia.map((icon, index) => (
                    <img key={index} src={icon} alt={`social-icon-${index}`} className="w-5 h-5 cursor-pointer hover:opacity-75 transition"/>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-10">
            {rightItems.map((item, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{item.header}</h3>
                <ul className="space-y-1">
                  {item.productItem?.map((product, i) => (
                    <li key={i} className="text-sm text-gray-700 hover:underline cursor-pointer">
                        <a target='_blank' href={product.href}> {product.label} </a>
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