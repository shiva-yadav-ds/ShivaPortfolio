import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary py-8 mt-12 border-t border-tertiary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="social-media flex gap-6 mb-6">
            <a
              href="https://www.linkedin.com/in/shiva-yadav-4043912b9/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex justify-center items-center border-2 border-accent-cyan rounded-full text-accent-cyan hover:bg-accent-cyan hover:text-primary hover:shadow-accent-cyan hover:shadow-[0_0_18px_3px] transition-all"
            >
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>

            <a
              href="https://www.instagram.com/shiva.datascience/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex justify-center items-center border-2 border-accent-cyan rounded-full text-accent-cyan hover:bg-accent-cyan hover:text-primary hover:shadow-accent-cyan hover:shadow-[0_0_18px_3px] transition-all"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>

            <a
              href="https://github.com/shiva-yadav-ds"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex justify-center items-center border-2 border-accent-cyan rounded-full text-accent-cyan hover:bg-accent-cyan hover:text-primary hover:shadow-accent-cyan hover:shadow-[0_0_18px_3px] transition-all"
            >
              <i className="fab fa-github text-xl"></i>
            </a>

            <a
              href="https://www.youtube.com/@noisegaming678"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex justify-center items-center border-2 border-accent-cyan rounded-full text-accent-cyan hover:bg-accent-cyan hover:text-primary hover:shadow-accent-cyan hover:shadow-[0_0_18px_3px] transition-all"
            >
              <i className="fab fa-youtube text-xl"></i>
            </a>
          </div>
          
          <div className="text-center">
            <p className="text-secondary text-[14px]">© 2024 Shiva Yadav | All rights reserved</p>
            <p className="text-secondary text-[14px] mt-1">Data Scientist | Web Developer</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 