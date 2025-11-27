import Link from 'next/link';
import Image from 'next/image';
import { getLocalizedPath } from '@/utils/locale-helper';
import type { GlobalOptions } from '@/types/api';
import type { Locale } from '@/i18n/config';

interface FooterProps {
  globalOptions: GlobalOptions;
  locale: Locale;
}

export default function Footer({ globalOptions, locale }: FooterProps) {
  const menu_2 = globalOptions.option?.menu_2 || [];
  const footerMenu = globalOptions.option?.footer_menu || [];
  const addresses = globalOptions.option?.addresses || [];
  const socials = globalOptions.option?.socials || [];

  return (
    <footer className="border-t border-border bg-[#0a0a0a] mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Menu</h3>
            <nav className="flex flex-col gap-2">
              {footerMenu.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {addresses.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Contact</h3>
              <div className="space-y-4">
                {addresses.map((address, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    {address.title && (
                      <h4 className="font-semibold text-foreground mb-2">{address.title}</h4>
                    )}
                    {address.exp && <p className="mb-1">{address.exp}</p>}
                    {address.address && <p className="mb-1">{address.address}</p>}
                    {address.phone && (
                      <p>
                        <a href={`tel:${address.phone}`} className="hover:text-foreground transition-colors">
                          {address.phone}
                        </a>
                      </p>
                    )}
                    {address.email && (
                      <p>
                        <a href={`mailto:${address.email}`} className="hover:text-foreground transition-colors">
                          {address.email}
                        </a>
                      </p>
                    )}
                    {address.map_image && (
                      <div className="mt-2 relative w-full h-32 rounded-md overflow-hidden">
                        <Image
                          src={address.map_image}
                          alt={address.title || 'Map'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {socials.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Social Media</h3>
              <div className="flex flex-wrap gap-3">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {social.select}
                  </a>
                ))}
              </div>
            </div>
          )}
          

          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Information</h3>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

