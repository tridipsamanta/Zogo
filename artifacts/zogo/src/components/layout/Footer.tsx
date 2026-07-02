import React from 'react';
import { Link } from 'wouter';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Heart } from 'lucide-react';
import zogoLogo from '@assets/image_1783011281570.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 mt-12 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-[1440px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/">
              <img src={zogoLogo} alt="ZOGO" className="h-10 mb-6 drop-shadow-sm" />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Midnapore's own premium grocery delivery platform. Fresh groceries at unbeatable prices, delivered in 20 minutes.
            </p>
            <p className="font-bengali text-muted-foreground mb-6 text-sm">
              মেদিনীপুরের সেরা গ্রোসারি ডেলিভারি অ্যাপ। তাজা পণ্য, দ্রুত ডেলিভারি।
            </p>
            <div className="flex gap-4 mb-8">
              <Button variant="outline" size="icon" className="rounded-full bg-card hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors">
                <Facebook size={18} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-card hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors">
                <Instagram size={18} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-card hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors">
                <Twitter size={18} />
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <Phone size={16} />
                </div>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <Mail size={16} />
                </div>
                <span>support@zogo.in</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <MapPin size={16} />
                </div>
                <span>Midnapore, West Bengal 721101</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/press" className="hover:text-primary transition-colors">Press</Link></li>
              <li><Link href="/seller" className="hover:text-primary transition-colors">Become a Seller</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">Help & Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link href="/returns" className="hover:text-primary transition-colors">Return Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">Service Areas</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/locations/midnapore" className="hover:text-primary transition-colors">Midnapore Town</Link></li>
              <li><Link href="/locations/kharagpur" className="hover:text-primary transition-colors">Kharagpur</Link></li>
              <li><Link href="/locations/ghatal" className="hover:text-primary transition-colors">Ghatal</Link></li>
              <li><Link href="/locations/garbeta" className="hover:text-primary transition-colors">Garbeta</Link></li>
              <li><Link href="/locations/debra" className="hover:text-primary transition-colors">Debra</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-primary/5 rounded-3xl p-8 mb-12 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">Get Exclusive Offers</h3>
            <p className="text-muted-foreground text-sm">Subscribe to our newsletter for updates and promo codes.</p>
            <p className="font-bengali text-sm text-primary mt-1">এক্সক্লুসিভ অফার পেতে সাবস্ক্রাইব করুন</p>
          </div>
          <div className="flex w-full md:w-auto max-w-md gap-2">
            <Input type="email" placeholder="Your email address" className="bg-card border-primary/20" />
            <Button className="rounded-xl px-6">Subscribe</Button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-2 items-center flex-wrap justify-center">
            <span className="text-xs font-semibold text-muted-foreground border border-border px-2 py-1 rounded">VISA</span>
            <span className="text-xs font-semibold text-muted-foreground border border-border px-2 py-1 rounded">Mastercard</span>
            <span className="text-xs font-semibold text-muted-foreground border border-border px-2 py-1 rounded">RuPay</span>
            <span className="text-xs font-semibold text-muted-foreground border border-border px-2 py-1 rounded">UPI</span>
            <span className="text-xs font-semibold text-muted-foreground border border-border px-2 py-1 rounded">Paytm</span>
          </div>
          
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500 mx-1" /> in Midnapore, West Bengal
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ZOGO. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
