import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-gray-300 py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Help & Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Partner with us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Ride with us
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Refund & Cancellation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Follow + Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-[#FFB30E]">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:text-[#FFB30E]">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-[#FFB30E]">
              <FaTwitter size={18} />
            </a>
          </div>

          <p className="text-sm mb-3">
            Receive exclusive offers in your mailbox
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-3 py-2 rounded-l-md bg-[#2A2A2A] text-gray-300 text-sm focus:outline-none"
            />
            <button className="bg-[#FFB30E] hover:bg-[#ffa200] text-white px-4 py-2 rounded-r-md text-sm font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm flex flex-col sm:flex-row justify-between items-center text-gray-400">
        <p>© Your Company, 2025. All rights reserved.</p>
        <p>
          Made with ❤️ by{" "}
          <a href="#" className="text-[#FFB30E] hover:underline">
            Themewagen
          </a>
        </p>
      </div>
    </footer>
  );
}
