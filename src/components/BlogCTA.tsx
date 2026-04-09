import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  gradient: string;
};

export default function BlogCTA({ gradient }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToContact = () => {
    const el = document.getElementById("contact-title");
    if (el) {
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar ? navbar.offsetHeight : 120;
      const yOffset = -navbarHeight + 120;

      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-12 px-4">
      <div className="max-w-7xl mx-auto lg:px-8">
        <div
          className={`p-8 bg-gradient-to-br ${gradient} rounded-2xl text-white`}
        >
          <h3 className="text-2xl font-bold mb-4">
            Bu içerik size yardımcı oldu mu?
          </h3>
          <p className="text-gray-200 mb-6">
            Dijital dünyada başarılı olmak için profesyonel destek alın.
          </p>
          <button
            onClick={() => {
              if (location.pathname !== "/") {
                navigate("/");

                setTimeout(() => {
                  scrollToContact();
                }, 200);
              } else {
                scrollToContact();
              }
            }}
            className="px-8 py-4 bg-white text-primary rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Bizimle İletişime Geçin
          </button>
        </div>
      </div>
    </section>
  );
}
