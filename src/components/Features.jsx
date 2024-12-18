
import { useRef, useState } from "react"
import { TiLocationArrow } from "react-icons/ti"
const BentoTilt=({children,className=''})=>{
  const[transformStyle,SetTransformStyle]=useState('')
  const itemRef=useRef()
   const handleMouseMove=(e)=>{
    if(!itemRef.current) return
    const {left ,width,top,height }=itemRef.current.getBoundingClientRect()
    const relativeX=(e.clientX - left)/width
    const relativeY=(e.clientY - top)/height
    
    const tiltX=(relativeY-0.5) * 5
    const tiltY=(relativeX-0.5) * -5
   

    const newTransform=`perspective(700px) 
    rotateX(${tiltX}deg)
    rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;

    SetTransformStyle(newTransform)
    
    }
    const handleMouseLeave=(e)=>{
        SetTransformStyle('')
    }

    return(
        <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={itemRef}
        className={className}
        style={{transform : transformStyle}}
        >
            {children}

            </div>
    )
}
const BentoCard = ({src, title, description, isComingSoon}) => {
    return (
        <div className=" relative size-full">
            <video
             src={src}
             loop 
             muted
             //autoPlay
             className="absolute
              left-0 top-0 size-full object-center object-cover"
             />
             <div className="relative z-10 flex size-full
             flex-col p-5 text-blue-50">
                    <div>
                        <h1 className="bento-title
                        special-font ">{title}</h1>
            {description && (
           <p className="mt-3 max-w-80 text-xs md:text-base">
            {description}</p>
            )}

                    </div>

                    
             </div>
        </div>
    )
}

const Features = () => {
  return (
   <section className='bg-black pb-52'>
    <div className='container mx-auto px-3 md:px-10'>
        <div className='px-5 py-32'>
            <p className='font-circular-web  text-lg text-blue-50'>
                Into the Metagame
                 </p>
        <p className='font-circular-web max-w-md text-lg text-blue-50 opacity-50'> Imerse yourself in a rich and ever-expanding universe wher a 
            vibrant array of products and services converge to create a 
            captivating metaverse experience.
        </p>
        </div>

     <BentoTilt className='border-hsla relative mb-7
     h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
            <BentoCard
            src="videos/feature-1.mp4"
            title={<>radi<b>n</b>t</>}
            description="The metaverse is a digital environment that simulates the physical world,
            allowing users to interact with virtual objects and experiences."
            isComingSoon
            />
             </BentoTilt>
             <div className="grid h-[135vh] grid-cols-2 grid-rows-3
             gap-7">
                <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1
                md:row-span-2">
                    <BentoCard
                    src="videos/feature-2.mp4"
                    title={<>Zig<b>m</b>a</>}
                    description="The metaverse is a digital environment that simulates the physical world,
                    allowing users to interact with virtual objects and experiences."
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_1 row-span-1 ms-32
                md:col-span-1 md:ms-0" >
                    <BentoCard
                    src="videos/feature-3.mp4"
                    title={<><b>n</b>eus</>}
                    description="A game that combines elements of real life and virtual reality,
                     a new dimension of play that transcends the physical ."
                    />

                </BentoTilt>

                <BentoTilt className="bento-tilt_1  me-14
                md:col-span-1 md:me-0" >
                    <BentoCard
                    src="videos/feature-4.mp4"
                    title={<>az<b>u</b>l</>}
                    description="A game that combines elements of real life and virtual reality,
                     a new dimension of play that transcends the physical ."
                    />

                </BentoTilt>

                <BentoTilt className="bento-tilt_2">
                <div className="flex size-full flex-col justify-between
                bg-violet-300 p-5">

                    <h1 className="bento-title
                    max-w-64 special-font">mo<b>r</b>e coming soon </h1>

                    <TiLocationArrow className="m-5 scale-[5] self-end"  />
                </div>
                </BentoTilt>
                <BentoTilt className="bento-tilt_2">
                    <video src="videos/feature-5.mp4"
                    loop
                    muted
                   // autoPlay
                    className="size-full object-center object-cover"
                    />


                   
                </BentoTilt>



             </div>
            </div>

   </section>
  )
}

export default Features