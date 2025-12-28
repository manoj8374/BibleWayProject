import svgPaths from "./svg-p0ryx0fbhx";
import imgBwLogo1 from "figma:asset/82047ace63f043a9c60ca2a632bb00501ce9a8b9.png";
import imgAroundTheWorldInEightyDays from "figma:asset/9aaae29b6c07406edb1f6a65e4a6657422706cc6.png";
import imgTheWindInTheWillows from "figma:asset/aafc66062aa03a5ed3e5308bc867816729d83e4d.png";
import imgLesMiserables from "figma:asset/8f6ffdd24b559646ed4084463db4215720009996.png";
type TextTextProps = {
  text: string;
};

function TextText({ text }: TextTextProps) {
  return (
    <div className="[grid-area:1_/_1] bg-white content-stretch flex items-center justify-center ml-[12px] mt-0 px-[5px] py-0 relative">
      <p className="font-['Quicksand:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#181821] text-[16px] text-nowrap">{text}</p>
    </div>
  );
}

export default function LogUp() {
  return (
    <div className="bg-[#f1eee3] relative size-full" data-name="Log up 1">
      <div className="absolute contents left-[-152px] top-0" data-name="BG">
        <div className="absolute h-[1080px] left-[-152px] overflow-clip top-0 w-[2066px]">
          <div className="absolute flex h-[538.563px] items-center justify-center left-[762px] top-[445px] w-[426.618px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-[15deg]">
              <div className="h-[473.191px] relative rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.5)] w-[314.876px]" data-name="Around the World in Eighty Days">
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px]">
                  <img alt="" className="absolute h-[139.27%] left-[-55.29%] max-w-none top-[-17.33%] w-[214.29%]" src={imgAroundTheWorldInEightyDays} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[753.014px] items-center justify-center left-0 top-[394px] w-[605.228px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-[345deg]">
              <div className="h-[659px] relative rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.5)] w-[450px]" data-name="The Wind in the Willows">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgTheWindInTheWillows} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-[11px] h-[817px] left-[326px] rounded-[20px] shadow-[0px_10px_20px_0px_rgba(0,0,0,0.5)] w-[558px]" data-name="Les Misérables">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgLesMiserables} />
          </div>
          <div className="absolute h-[1080px] left-[426px] top-0 w-[1646px]" data-name="Subtract">
            <div className="absolute inset-[-1.85%_-0.91%_-1.85%_-1.52%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1686 1120">
                <g filter="url(#filter0_d_1_192)" id="Subtract">
                  <path d={svgPaths.p3e83480} fill="var(--fill-0, white)" />
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
          </div>
          <div className="absolute content-stretch flex flex-col h-[74px] items-start left-[1798px] overflow-clip pb-0 pl-px pr-[4px] pt-[6px] rounded-[16px] shadow-[0px_4px_4px_0px_black] top-[32px] w-[242px]">
            <div className="h-[68px] relative shrink-0 w-full" data-name="BW logo 1">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBwLogo1} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[16px] h-[428px] items-start left-[calc(79.17%-75.83px)] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[400px]">
        <p className="font-['Quicksand:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#181821] text-[30px] w-[min-content]">Log in</p>
        <div className="bg-white content-stretch flex gap-[10px] h-[50px] items-center justify-center px-0 py-[15px] relative rounded-[10px] shrink-0 w-full" data-name="Buttoon Sign in with google">
          <div aria-hidden="true" className="absolute border-2 border-[#181821] border-solid inset-0 pointer-events-none rounded-[10px]" />
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Google">
            <div className="absolute inset-[0_0.05%_0.34%_0]" data-name="Group">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9905 19.9313">
                <g id="Group">
                  <path d={svgPaths.p14eb5a00} fill="var(--fill-0, #4285F4)" id="Vector" />
                  <path d={svgPaths.p14ade600} fill="var(--fill-0, #34A853)" id="Vector_2" />
                  <path d={svgPaths.p19c9b3c0} fill="var(--fill-0, #FBBC05)" id="Vector_3" />
                  <path d={svgPaths.p2fa07400} fill="var(--fill-0, #EB4335)" id="Vector_4" />
                </g>
              </svg>
            </div>
          </div>
          <p className="font-['Quicksand:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#181821] text-[16px] text-nowrap">Log in using Google</p>
        </div>
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] opacity-50 place-items-start relative shrink-0" data-name="Or">
          <div className="[grid-area:1_/_1] h-0 ml-0 mt-[10.5px] relative w-[400px]" data-name="Line">
            <div className="absolute inset-[-0.5px_-0.13%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 401 1">
                <path d="M0.5 0.5H400.5" id="Line" stroke="var(--stroke-0, #181821)" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="[grid-area:1_/_1] bg-white content-stretch flex items-center justify-center ml-[187px] mt-0 px-[5px] py-0 relative" data-name="text">
            <p className="font-['Quicksand:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#181821] text-[14px] text-nowrap">Or</p>
          </div>
        </div>
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Email">
          <div className="[grid-area:1_/_1] border-2 border-[#181821] border-solid h-[50px] ml-0 mt-[10px] rounded-[10px] w-[400px]" data-name="Text Fields" />
          <TextText text="Email" />
        </div>
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Password">
          <div className="[grid-area:1_/_1] content-stretch flex h-[50px] items-center justify-end ml-0 mt-[10px] px-[20px] py-[10px] relative rounded-[10px] w-[400px]" data-name="Text Field">
            <div aria-hidden="true" className="absolute border-2 border-[#181821] border-solid inset-0 pointer-events-none rounded-[10px]" />
            <div className="relative shrink-0 size-[30px]" data-name="Eye Hide">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
                <g id="Eye Hide">
                  <path d={svgPaths.p2562cc0} fill="var(--fill-0, #181821)" id="Vector" />
                </g>
              </svg>
            </div>
          </div>
          <TextText text="Password" />
        </div>
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Stay signed in">
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Stay signed in">
            <div className="bg-white content-stretch flex flex-col items-start relative rounded-[5px] shrink-0 w-[20px]" data-name="Check">
              <div aria-hidden="true" className="absolute border-2 border-[#181821] border-solid inset-0 pointer-events-none rounded-[5px]" />
            </div>
            <p className="font-['Quicksand:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#181821] text-[14px] text-nowrap">Stay signed in</p>
          </div>
          <p className="font-['Quicksand:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0e3a66] text-[14px] text-nowrap">Forgot password?</p>
        </div>
        <div className="bg-[#0e3a66] h-[50px] relative rounded-[10px] shrink-0 w-full" data-name="Buttoon">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[10px] items-center justify-center px-[127px] py-[10px] relative size-full">
              <p className="font-['Quicksand:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[20px] text-nowrap text-white">Login</p>
            </div>
          </div>
        </div>
        <p className="font-['Quicksand:SemiBold',sans-serif] font-semibold leading-[normal] min-w-full relative shrink-0 text-[#181821] text-[16px] text-center w-[min-content]">
          <span>{`Need an account? `}</span>
          <span className="[text-underline-position:from-font] decoration-solid font-['Quicksand:Bold',sans-serif] font-bold text-[#0e3a66] underline">Create one</span>
        </p>
      </div>
    </div>
  );
}