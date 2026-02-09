import svgPaths from "./svg-rryr31abou";
import imgImageTheDiscovery from "figma:asset/fcadd24658cf9a2705e646271fb459f366d61939.png";

function Badge() {
  return (
    <div className="absolute bg-[rgba(16,185,129,0.1)] h-[22px] left-[252px] rounded-[9999px] top-[15px] w-[47.539px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[11px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#10b981] text-[12px] text-nowrap">Free</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(16,185,129,0.2)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function ImageTheDiscovery() {
  return (
    <div className="h-[177.367px] overflow-clip relative shrink-0 w-full" data-name="Image (The Discovery)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageTheDiscovery} />
      <Badge />
    </div>
  );
}

function ChapterCard() {
  return (
    <div className="bg-[#f5f5f5] h-[177.367px] relative shrink-0 w-[315.328px]" data-name="ChapterCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ImageTheDiscovery />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[11px] size-[12px] top-[5px]" data-name="Icon">
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
    <div className="h-[22px] relative rounded-[9999px] shrink-0 w-[157.781px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Icon />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[31px] not-italic text-[#1a1a1a] text-[12px] text-nowrap top-[4px]">The Quantum Quest</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[rgba(255,168,0,0.1)] h-[22px] relative rounded-[9999px] shrink-0 w-[77.469px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[11px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#ffa800] text-[12px] text-nowrap">Chapter 1</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,168,0,0.2)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-start relative shrink-0 w-full" data-name="Container">
      <Badge1 />
      <Badge2 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[28px] overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#1a1a1a] text-[18px] text-nowrap top-0 tracking-[-0.4395px]">The Discovery</p>
    </div>
  );
}

function ChapterCard1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[58px] items-start left-[16px] top-[20.73px] w-[283.328px]" data-name="ChapterCard">
      <Container />
      <Heading />
    </div>
  );
}

function ChapterCard2() {
  return (
    <div className="absolute h-[40px] left-[16px] overflow-clip top-[90.73px] w-[283.328px]" data-name="ChapterCard">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6b6b6b] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[248px]">{`Emma finds a mysterious device in her grandmother's attic.`}</p>
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

function ChapterCard3() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[20px] items-center left-[16px] top-[142.73px] w-[283.328px]" data-name="ChapterCard">
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

function Container1() {
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
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#10b981] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px]">Free to Read</p>
      </div>
    </div>
  );
}

function ChapterCard4() {
  return (
    <div className="absolute content-stretch flex h-[33px] items-end justify-between left-[16px] pb-0 pt-px px-0 top-[174.73px] w-[283.328px]" data-name="ChapterCard">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container1 />
      <Text2 />
    </div>
  );
}

function CardContent() {
  return (
    <div className="h-[228px] relative shrink-0 w-[315px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <ChapterCard1 />
        <ChapterCard2 />
        <ChapterCard3 />
        <ChapterCard4 />
      </div>
    </div>
  );
}

export default function Card() {
  return (
    <div className="bg-white relative rounded-[24px] size-full" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <ChapterCard />
        <CardContent />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}