import React, { useRef, useState } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);

  const email = "yashbagde2004july@gmail.com";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full px-4 md:px-8 pt-32 pb-20 bg-[#FDFDFD]"
      style={{ zIndex: 10 }}
    >
      <style>{`
        @font-face {
          font-family: 'Thunder-LC';
          /* src: url('/fonts/Thunder-LC.woff2') format('woff2'); */
          font-weight: 100;
        }

        #contact h2, 
        #contact h3 {
          font-weight: 100 !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          letter-spacing: -0.02em;
          -webkit-text-stroke: 0.8px #FDFDFD; /* Shaving effect to make it thinner */
        }

        #contact .contact-email {
          font-weight: 100 !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          letter-spacing: -0.02em;
          -webkit-text-stroke: 0.8px #769C81; /* Shaving effect for green background */
        }

        #contact p {
          font-weight: 100 !important;
          opacity: 0.6;
          -webkit-text-stroke: 0.4px #FDFDFD;
        }

        .contact-card {
          background-color: #FDFDFD;
          border-radius: 40px;
          min-height: 60vh;
          border: 1px solid rgba(0,0,0,0.15);
        }

        .contact-title {
          font-size: clamp(2.54rem, 5.92vw, 93.15px);
          font-family: 'Thunder-LC', 'Anton', sans-serif;
          font-weight: 100;
        }

        .contact-interactive-area {
          height: 140px;
          border-top: 1px solid rgba(0, 0, 0, 0.15);
        }

        .contact-talk {
          font-size: clamp(2.21rem, 4.41vw, 66.15px);
          font-family: 'Thunder-LC', 'Anton', sans-serif;
          font-weight: 100;
        }

        .contact-email-text {
          font-size: clamp(1.32rem, 3.53vw, 52.92px);
          font-family: 'Thunder-LC', 'Anton', sans-serif;
        }

        @media (max-width: 768px) {
          .contact-card {
            border-radius: 24px;
            min-height: 50vh;
          }
          .contact-title {
            font-size: clamp(2.5rem, 12vw, 4rem);
          }
          .contact-title br {
            display: none;
          }
          .contact-interactive-area {
            height: 100px;
          }
          .contact-talk {
            font-size: clamp(2rem, 8vw, 3rem);
          }
          .contact-email-text {
            font-size: clamp(1rem, 5.5vw, 2.5rem);
          }
        }
      `}</style>
      {/* The Massive CTA Card - Shorter height */}
      <div className="relative w-full overflow-hidden flex flex-col transition-all duration-700 contact-card">

        {/* Top Header Area */}
        <div className="flex-1 flex flex-col justify-center px-4 md:px-16 lg:px-24 pt-16 pb-20">
          <div className="relative w-full max-w-[1200px]">

            {/* Main Layer */}
            <h2 className="relative text-[#111111] tracking-tight leading-[0.95] contact-title">
              Let's build <br />something people <br />remember
            </h2>

            <p 
              className="mt-8 text-[#111111] text-lg md:text-xl lg:text-2xl opacity-70 tracking-wide"
              style={{ fontWeight: 100 }}
            >
              from global tech companies to growing startups.
            </p>
          </div>
        </div>

        {/* Bottom Interactive Area */}
        <div
          className="relative w-full flex items-center cursor-pointer overflow-hidden group contact-interactive-area"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Default State: Arrow + Let's Talk */}
          <div
            className="absolute inset-0 flex justify-between items-center px-4 md:px-16 lg:px-24 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{
              transform: isHovered ? "translateY(-100%)" : "translateY(0)",
              opacity: isHovered ? 0 : 1
            }}
          >
            <div className="text-[#111111]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            <h3 className="text-[#111111] tracking-tighter m-0 contact-talk">
              Let's talk
            </h3>
          </div>

          {/* Reveal State: Dark Block + Email */}
          <div
            className="absolute inset-0 bg-[#769C81] flex justify-center items-center px-4 md:px-16 lg:px-24 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] origin-bottom"
            style={{
              transform: isHovered ? "translateY(0)" : "translateY(100%)",
              borderRadius: isHovered ? "0" : "50% 50% 0 0",
            }}
          >
              <div className="contact-email text-[#FDFDFD] tracking-tight break-all md:break-normal text-center contact-email-text">
                {email}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}