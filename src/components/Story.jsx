import React,{useRef} from 'react'
import AnimatedTitle from './AnimatedTitle'
import gsap from 'gsap'
import RoundedCorners from './RoundedCorners'
import Button from './Button'
const Story = () => {
    const frameRef=useRef('null')
    const handleMouseLeave = () => {
        const element=frameRef.current;
        gsap.to(element, {
            duration:0.3,
            rotateX:0,
            rotateY:0,
            
            ease:'power1.inOut'

})
    }
    const handleMouseMove = (e) => {
        const {clientX,clientY}=e;
        const element=frameRef.current;
        if(!element)return ;
        const react = element.getBoundingClientRect();
        const x = clientX - react.left;
        const y = clientY - react.top;

        const centerX = react.width / 2;
        const centerY = react.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -20;
        const rotateY = ((x - centerX) / centerX) * 20;

        gsap.to(element, {
                duration:0.3,
                rotateX,rotateY,
                transformPreserve:500,
                ease:'power1.inOut'

    })
    }

  return (
    <section  id="story" className=' min-h-dvh w-screen bg-black text-blue-50'>
        <div className='flex size-full flex-col items-center py-10 pb-24'>

        <p className='font-general text-sm uppercase md:text-[10px]'>
            the multiverse ip world</p>
            <div className='relative size-full'>
                <AnimatedTitle
                title="the st<b>o</b>ry of<br/> the <b>m</b>etaverse"
                sectionId="#story"
                containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
                />

                <div className='story-img-container'>
                    <div className='story-img-mask'>
                        <div className='story-img-content'>
                            <img 
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseLeave}
                            onMouseEnter={handleMouseLeave}
                            onMouseMove={handleMouseMove}
                            ref={frameRef}
                            src="/img/entrance.webp"
                             alt="story"
                            className='object-contain'
                             
                             />
                        </div>
                    </div>
                    <RoundedCorners/>
                </div>
            </div>

            <div className='-mt-80 flex w-full justify-center md:-mt-64
            md:me-44 md:justify-end'>
                <div className='flex h-full w-fit flex-col 
               items-center md:items-start'>
                <p className='mt-3 max-w-sm text-center font-circular-web
                text-violet-50 md:text-start'>
                    where relams coverage lises and zentry the boundless pillar discover its secrets
                    and shape your fate amidst infinite opportuities.
                </p>
                <Button
                id="realm-button"
                title="dicover prologue"
                containerClasses="mt-5"
                />

               </div>
            </div>
        </div>
    </section>
  )
}

export default Story