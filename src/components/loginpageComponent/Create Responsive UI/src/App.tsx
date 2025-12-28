import { useState } from "react";
import svgPaths from "./imports/svg-p0ryx0fbhx";
import imgBwLogo1 from "figma:asset/82047ace63f043a9c60ca2a632bb00501ce9a8b9.png";
import imgAroundTheWorldInEightyDays from "figma:asset/9aaae29b6c07406edb1f6a65e4a6657422706cc6.png";
import imgTheWindInTheWillows from "figma:asset/aafc66062aa03a5ed3e5308bc867816729d83e4d.png";
import imgLesMiserables from "figma:asset/8f6ffdd24b559646ed4084463db4215720009996.png";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f1eee3] relative overflow-hidden">
      {/* Background with books - hidden on mobile, visible on larger screens */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden">
        <div className="absolute h-full w-full">
          {/* Around the World in Eighty Days */}
          <div className="absolute left-[37%] top-[41%] w-[315px] h-[473px] rotate-[15deg] rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.5)] overflow-hidden">
            <img 
              alt="" 
              className="w-full h-full object-cover" 
              src={imgAroundTheWorldInEightyDays} 
            />
          </div>

          {/* The Wind in the Willows */}
          <div className="absolute left-0 top-[36%] w-[450px] h-[659px] rotate-[-15deg] rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.5)] overflow-hidden">
            <img 
              alt="" 
              className="w-full h-full object-cover" 
              src={imgTheWindInTheWillows} 
            />
          </div>

          {/* Les Misérables */}
          <div className="absolute left-[16%] bottom-[1%] w-[558px] h-[817px] rounded-[20px] shadow-[0px_10px_20px_0px_rgba(0,0,0,0.5)] overflow-hidden">
            <img 
              alt="" 
              className="w-full h-full object-cover" 
              src={imgLesMiserables} 
            />
          </div>

          {/* White curved background */}
          <div className="absolute left-[21%] inset-y-0 right-0">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1686 1120">
              <g filter="url(#filter0_d_1_192)">
                <path d={svgPaths.p3e83480} fill="white" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1120" id="filter0_d_1_192" width="1686" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset dx="-5" />
                  <feGaussianBlur stdDeviation="10" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_192" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_192" mode="normal" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>

          {/* Logo */}
          <div className="absolute top-8 right-8 w-[242px] h-[74px] rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.3)] overflow-hidden">
            <img 
              alt="BibleWay Logo" 
              className="w-full h-full object-cover" 
              src={imgBwLogo1} 
            />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet logo */}
      <div className="lg:hidden absolute top-6 left-1/2 -translate-x-1/2 w-[180px] h-[56px] rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.3)] overflow-hidden">
        <img 
          alt="BibleWay Logo" 
          className="w-full h-full object-cover" 
          src={imgBwLogo1} 
        />
      </div>

      {/* Login Form Container */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-20 lg:py-8">
        <div className="w-full max-w-[400px] lg:ml-auto lg:mr-[10%] flex flex-col gap-4">
          <h1 className="text-[#181821]">Log in</h1>

          {/* Google Sign In Button */}
          <button className="bg-white h-[50px] rounded-[10px] border-2 border-[#181821] flex items-center justify-center gap-2.5 px-4 py-[15px] hover:bg-gray-50 transition-colors">
            <div className="w-5 h-5 shrink-0">
              <svg className="w-full h-full" fill="none" viewBox="0 0 20 20">
                <g>
                  <path d={svgPaths.p14eb5a00} fill="#4285F4" />
                  <path d={svgPaths.p14ade600} fill="#34A853" />
                  <path d={svgPaths.p19c9b3c0} fill="#FBBC05" />
                  <path d={svgPaths.p2fa07400} fill="#EB4335" />
                </g>
              </svg>
            </div>
            <span className="text-[#181821]">Log in using Google</span>
          </button>

          {/* Or Divider */}
          <div className="relative h-[21px] flex items-center opacity-50">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#181821]"></div>
            </div>
            <div className="relative mx-auto px-[5px] bg-[#f1eee3] lg:bg-white">
              <span className="text-[#181821] text-[14px]">Or</span>
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] px-3 pt-3 pb-1 rounded-[10px] border-2 border-[#181821] bg-white text-[#181821] outline-none focus:border-[#0e3a66] transition-colors"
              placeholder=" "
            />
            <label className={`absolute left-3 transition-all pointer-events-none ${email ? 'top-1 text-[12px]' : 'top-1/2 -translate-y-1/2 text-[16px]'} text-[#181821] bg-white px-[5px]`}>
              Email
            </label>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[50px] px-3 pt-3 pb-1 pr-14 rounded-[10px] border-2 border-[#181821] bg-white text-[#181821] outline-none focus:border-[#0e3a66] transition-colors"
              placeholder=" "
            />
            <label className={`absolute left-3 transition-all pointer-events-none ${password ? 'top-1 text-[12px]' : 'top-1/2 -translate-y-1/2 text-[16px]'} text-[#181821] bg-white px-[5px]`}>
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-[30px] h-[30px] flex items-center justify-center"
            >
              <svg className="w-full h-full" fill="none" viewBox="0 0 30 30">
                <path d={svgPaths.p2562cc0} fill="#181821" />
              </svg>
            </button>
          </div>

          {/* Stay signed in / Forgot password */}
          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={staySignedIn}
                onChange={(e) => setStaySignedIn(e.target.checked)}
                className="w-5 h-5 rounded-[5px] border-2 border-[#181821] cursor-pointer accent-[#0e3a66]"
              />
              <span className="text-[#181821] text-[14px]">Stay signed in</span>
            </label>
            <button className="text-[#0e3a66] text-[14px] hover:underline" onClick={() => navigate('/forgot-password')}>
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button className="bg-[#0e3a66] h-[50px] rounded-[10px] flex items-center justify-center px-4 py-2.5 hover:bg-[#0d3459] transition-colors">
            <span className="text-white text-[20px]">Login</span>
          </button>

          {/* Create Account Link */}
          <p className="text-[#181821] text-center">
            <span>Need an account? </span>
            <button className="text-[#0e3a66] underline hover:no-underline">
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
