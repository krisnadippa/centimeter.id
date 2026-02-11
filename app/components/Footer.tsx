import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold font-sans tracking-tighter mb-4 block">
              <span className="text-white">centimeter</span>
              <span className="text-secondary">.id</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Your trusted partner for finding the perfect land and property in Bali.
              Professional service, premium listings.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-secondary transition-colors">Home</Link></li>
              <li><Link href="#about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="#properties" className="hover:text-secondary transition-colors">Properties</Link></li>
              <li><Link href="#contact" className="hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Jalan Sunset Road No. 88</li>
              <li>Kuta, Bali, Indonesia</li>
              <li>+62 812 3456 7890</li>
              <li>hello@centimeter.id</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="bg-zinc-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="bg-zinc-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="bg-zinc-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Twitter size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} centimeter.id. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
