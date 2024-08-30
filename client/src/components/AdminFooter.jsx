import Logo from "/public/buka-logo.png";

function AdminFooter() {
  return (
    <footer className="bg-[#F1F1F1] text-black py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-evenly items-center">
        <article className="mb-6 md:mb-0">
          <img src={Logo} alt="logo" className="w-32 h-auto" />
        </article>
        <article className="mb-6 md:mb-0">Terms & Conditions</article>
        <article className="mb-6 md:mb-0">Policy</article>
        <article className="mb-6 md:mb-0">Help & Support</article>
      </div>
      <div className="bg-gray-200 text-center py-4 mt-6">
        2024 © Buka. All rights reserved.
      </div>
    </footer>
  );
}

export default AdminFooter;
