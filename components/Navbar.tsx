// NAVBAR COMPONENT

import { NavLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import AuthProviders from './AuthProviders';

const Navbar = () => {

  const session = {};

  return (
    <nav className='flexBetween navbar'>
      <div className='flex-1 flexStart gap-10'>
        {/* Mostramos el logo con el link a / */}
        <Link href="/">
          <Image
            src="/logo.svg"
            width={115}
            height={43}
            alt='Flexibble'
          />
        </Link>
        {/* Hacemos map entre todos los link del archivo de constantes */}
        <ul className='xl:flex hidden text-small gap-7'>
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

            {/* Si no hay session, mostramos los authproviders, si la hay, la foto y shared work */}
      <div className='flexCenter gap-4'>
            {session ? (
              <>
              UserPhoto
              <Link href="/create-project">
                Share Work
              </Link>
              </>

            ) : (
              <AuthProviders />
            )

          }
      </div>
    </nav>
  )
}

export default Navbar