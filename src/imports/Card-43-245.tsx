import svgPaths from "./svg-uf16f40luv";
import imgImageTheDiscovery from "figma:asset/fcadd24658cf9a2705e646271fb459f366d61939.png";

function ImageTheDiscovery() {
  return (
    <div className="absolute h-[157px] left-0 top-0 w-[317px]" data-name="Image (The Discovery)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageTheDiscovery} />
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[rgba(16,185,129,0.1)] h-[22px] left-[255.79px] rounded-[9999px] top-[14.5px] w-[47.539px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[11px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#10b981] text-[12px] text-nowrap">Free</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(16,185,129,0.2)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function ChapterCard() {
  return (
    <div className="bg-[#f5f5f5] h-[157.664px] overflow-clip relative shrink-0 w-full" data-name="ChapterCard">
      <ImageTheDiscovery />
      <Badge />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M6 3.5V10.5" id="Vector" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p14c49380} id="Vector_2" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Badge1() {
  return (
    <div className="absolute border border-[#e5e5e5] border-solid h-[22px] left-0 overflow-clip rounded-[9999px] top-[-0.34px] w-[157.781px]" data-name="Badge">
      <Icon />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[30px] not-italic text-[#1a1a1a] text-[12px] text-nowrap top-[3px]">The Quantum Quest</p>
    </div>
  );
}

function Badge2() {
  return (
    <div className="absolute bg-[rgba(255,168,0,0.1)] h-[22px] left-[165.78px] rounded-[9999px] top-[-0.34px] w-[77.469px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[11px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#ffa800] text-[12px] text-nowrap">Chapter 1</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,168,0,0.2)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function ChapterCard1() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="ChapterCard">
      <Badge1 />
      <Badge2 />
    </div>
  );
}

function ChapterCard2() {
  return (
    <div className="h-[28px] overflow-clip relative shrink-0 w-full" data-name="ChapterCard">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#1a1a1a] text-[18px] text-nowrap top-[-0.34px] tracking-[-0.4395px]">The Discovery</p>
    </div>
  );
}

function ChapterCard3() {
  return (
    <div className="h-[40px] overflow-clip relative shrink-0 w-full" data-name="ChapterCard">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b6b6b] text-[14px] top-[0.16px] tracking-[-0.1504px] w-[248px]">{`Emma finds a mysterious device in her grandmother's attic.`}</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p399eca00} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pc93b400} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[95.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b6b6b] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px]">Sarah Johnson</p>
      </div>
    </div>
  );
}

function ChapterCard4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="ChapterCard">
      <Icon1 />
      <Text />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b6b6b] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px]">0 pages</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[20px] relative shrink-0 w-[71.836px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon2 />
        <Text1 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[95.102px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-0 not-italic text-[#10b981] text-[16px] text-nowrap top-[11.5px] tracking-[-0.3125px] translate-y-[-50%]">
          <p className="leading-[24px]">Free to Read</p>
        </div>
      </div>
    </div>
  );
}

function ChapterCard5() {
  return (
    <div className="content-stretch flex h-[32px] items-end justify-between pb-0 pt-px px-0 relative shrink-0 w-full" data-name="ChapterCard">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container />
      <Text2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-[283.492px]">
      <ChapterCard1 />
      <ChapterCard2 />
      <ChapterCard3 />
      <ChapterCard4 />
      <ChapterCard5 />
    </div>
  );
}

export default function Card() {
  return (
    <div className="bg-white relative rounded-[24px] size-full" data-name="Card">
      <div className="content-stretch flex flex-col gap-[16px] items-center overflow-clip pb-[16px] pt-0 px-0 relative rounded-[inherit] size-full">
        <ChapterCard />
        <Frame />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}