import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import earth from "./images/earth.png";
import "./hero.css";
import First from "../assets/First.jpg";
import Second from "../assets/Second.webp";
import Third from "../assets/Third.webp";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate()


  useEffect(() => {
    // Dynamically load the LiveCoinWatch script
    const script = document.createElement("script");
    script.src = "https://www.livecoinwatch.com/static/lcw-widget.js";
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const Context = [
    {
      id: 1,
      image: First,
      HeadText: "Naxtro Tradeplus",
      HeadText2: "EFFICIENT AND RELIABLE",
      SubHeaderText:
        "24/7 live support, our support channels are available anytime everyday",
    },
    {
      id: 2,
      image: Second,
      HeadText: "Naxtro Tradeplus CORE",
      HeadText2: "EASY WAY TO TRADE",
      SubHeaderText:
        "Trade in the most popular currencies of your choice; USD,GBD, AUD, BTC, CNY, EUR, CAD",
    },
    {
      id: 3,
      image: Third,
      HeadText: "THE MOST SECURE",
      HeadText2: "TRADING PLATFORM",
      SubHeaderText: "Profitable investments when you trade and invest with us",
    },
  ];

  const totalSlides = Context.length;

  const splitLastWord = (text) => {
    const words = text.split(" ");
    const lastWord = words.pop();
    const initialText = words.join(" ");
    return { initialText, lastWord };
  };

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide) => (currentSlide + 1) % Context.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [Context.length]);

  return (
    <div className="hero_section">
      <div className="the_hero">
        <div className="hero_writeup" 
          style={{
            backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.934), rgba(0, 0, 0, 0.918), rgba(0, 0, 0, 0.893)),
            url(${Context[currentSlide].image}`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }} >
          <div className="hero_writeup_text">
            {(() => {
              const { initialText, lastWord } = splitLastWord(
                Context[currentSlide].HeadText
              );
              return (
                <h1>
                  {initialText}{" "}
                  <span style={{ color: "gold" }}>{lastWord}</span>
                </h1>
              );
            })()}
            {(() => {
              const { initialText, lastWord } = splitLastWord(
                Context[currentSlide].HeadText2
              );
              return (
                <h1>
                  <span style={{ color: "gold" }}>{initialText}</span>{" "}
                  {lastWord}
                </h1>
              );
            })()}
            <p>{Context[currentSlide].SubHeaderText}</p>
            <div className="button_part">
              <button className="get_started_btn" onClick={()=>navigate("/login")}>Invest Now</button>
            </div>
            <div className="counter-container">
              <div className="counter">
                <div>
                  <CountUp start={0} end={7} delay={3} duration={5} />+
                </div>
                <p className="counter-detail"> Years of Service</p>
              </div>
              <div className="counter">
                <div>
                  <CountUp start={0} end={12} delay={3} duration={5} />M{" "}
                </div>
                <p className="counter-detail"> Global Investors</p>
              </div>
              <div className="counter">
                <div>
                  <CountUp start={0} end={95} delay={3} duration={5} />%
                </div>
                <p className="counter-detail"> Client satisfaction</p>
              </div>
            </div>
          </div>
          <div className="home-widget">
          <div className="home-widget-wrapper">
            {/* <TradingViewWidget /> */}
            <script
              defer
              src="https://www.livecoinwatch.com/static/lcw-widget.js"></script>{" "}
            <div
              className="livecoinwatch-widget-5"
              lcw-base="USD"
              lcw-color-tx="#999999"
              lcw-marquee-1="coins"
              lcw-marquee-2="movers"
              lcw-marquee-items="10"></div>
          </div>
      </div>
        </div>
        <button onClick={prevSlide} className="prev_btn">
          &#10094;
        </button>
        <button onClick={nextSlide} className="next_btn">
          &#10095;
        </button>

        
      </div>
      
    </div>
  );
};

export default Hero;
