import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-10">
        {/* Mobile Footer */}
        <div className="flex flex-col items-center py-6 text-center md:hidden">
          <h2 className="text-base font-semibold text-gray-700 font-heading">
            ReactShop
          </h2>

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
            <Link href="/" className="transition hover:text-indigo-600">
              Home
            </Link>

            <Link href="/about" className="transition hover:text-indigo-600">
              About
            </Link>

            <Link href="/support" className="transition hover:text-indigo-600">
              Support
            </Link>
          </div>

          <p className="mt-4 text-xs text-gray-400">© 2026 ReactShop</p>
        </div>

        {/* Desktop Footer */}
        <div className="hidden py-10 md:block">
          <div className="flex justify-between gap-10 text-left">
            {/* Brand */}
            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-700 font-heading">
                ReactShop
              </h2>

              <p className="max-w-xs text-sm text-gray-500">
                Simple modern e-commerce experience with clean UI and smooth UX.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-12 text-sm">
              {/* Shop */}
              <div>
                <p className="mb-2 font-medium text-gray-700">Shop</p>

                <ul className="space-y-1 text-gray-500">
                  <li>
                    <Link href="/" className="transition hover:text-indigo-600">
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/cart"
                      className="transition hover:text-indigo-600"
                    >
                      Cart
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <p className="mb-2 font-medium text-gray-700">Company</p>

                <ul className="space-y-1 text-gray-500">
                  <li>
                    <Link
                      href="/about"
                      className="transition hover:text-indigo-600"
                    >
                      About
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/support"
                      className="transition hover:text-indigo-600"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <p className="mt-10 text-xs text-center text-gray-400">
            © 2026 ReactShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
