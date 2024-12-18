import React,{useState,useRef, useEffect} from 'react'
import { TiLocationArrow } from 'react-icons/ti'
import Button from './Button'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
 // State to manage the current video index
 const [currentIndex, setCurrentIndex] = useState(1);
 // State to check if the user has clicked the video
 const [hasClicked, setHasClicked] = useState(false);
 // State to manage loading status
 const [isLoading, setIsLoading] = useState(true);
 // State to track how many videos have loaded
 const [loadedVideos, setLoadedVideos] = useState(0);

 // Total number of videos in the sequence
 const totalVideos = 4;


  const nextVideoRef=useRef(null)

//0 % 4 = 0 + 1 => 1
//1 % 4 = 1 + 1 => 2
//2 % 4 = 2 + 1 => 3
//3 % 4 = 3 + 1 => 4
//4 % 4 = 0 + 1 => 1
  const  upcomingVideoIndex=()=>(currentIndex % totalVideos + 1)

  const handleMinVdClick=()=>{
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex());

  }



  // Handler to increment the count of loaded videos
  const handledVideoLoad = () => {
    setLoadedVideos((prevLoadedVideos) => prevLoadedVideos + 1);
  };

   // Effect to check if all videos (except one) have loaded
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false); // Stop loading screen
    }
  }, [loadedVideos]);


  useGSAP(()=>{
    if(hasClicked){
      gsap.set('#next-video',{visibility:'visible'})

      gsap.to('#next-video',{
        transformOrigin:'center center',
        scale:1,
        width:'100%',
        height:'100%',
        duration:1.5,
        ease:'power1.inOut',
        //onStart:()=>nextVideoRef.current.play(),
      })

      gsap.from('#current-video',{

        transformOrigin:'center center',
        scale:0,
        duration:1.5,
        ease:'power1.inOut',

      })

    }


  },{dependencies:[currentIndex] , revertOnUpdate: true})



  useGSAP(()=>{
    gsap.set('#video-frame',{
      clipPath: 'polygon(14% 0, 72% 0%,88% 90%, 0% 95%)',
      borderRadius:'0 0 40% 10%',
    
    }) 

    gsap.from('#video-frame',{
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      borderRadius:'0 0 0 0',
      ease:'power1.out',
    
      scrollTrigger:{
        trigger:'#video-frame',
        start:'center center',
        end:'bottom center',
        scrub:true,
        
      }
    })

  })

  




  const getVideosSrc= (index) => `videos/hero-${index}.mp4`

  return (
    <div className=' relative h-dvh w-screen overflow-x-hidden'>
 

        {isLoading && (
        <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
          <div className='three-body'>
          <div className='three-body__dot'/>
          <div className='three-body__dot'/>
          <div className='three-body__dot'/>

          </div>
        </div>
        )}



      <div id="video-frame" className='
       relative z-10 h-dvh w-screen
       overflow-hidden rounded-lg bg-blue-75
       '>

        <div>
          <div className='mask-clip-path absolute-center absolute
          z-40 size-64 cursor-pointer overflow-hidden rounded-lg
          
          '>

            <div onClick={handleMinVdClick} className='
            sacle-50 opacity-0 transition-all
            duration-500 ease-in hover:opacity-100
             hover:scale-100  origin-center'>

             <video
             ref={nextVideoRef}
             src={getVideosSrc(upcomingVideoIndex())}
             loop
             muted
             id='current-video'
             className=' size-64 origin-center scale-150 cursor-pointer
             object-cover object-center'
             onLoadedData={handledVideoLoad}
             />
            </div>
          </div>

            <video 
            ref={nextVideoRef}
            src={getVideosSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className=' size-64 absolute-center absolute invisible z-20
             object-cover object-center'
             onLoadedData={handledVideoLoad}
            
            />

            <video src={getVideosSrc(currentIndex === totalVideos-1
              ? 1 :currentIndex
            )}
          // autoPlay
            loop 
            muted
            className=' absolute left-0 top-0 size-full object-cover object-center'
            onLoadedData={handledVideoLoad}
            
            />
        
        </div>

        <h1 className='text-blue-75 absolute bottom-5 right-5 z-40 special-font hero-heading'>
          G<b>a</b>ming
        </h1>

        <div className=' absolute left-0 top-0 z-40 size-full'>
          <div className=' mt-24 px-5 sm:px-10'>
            <h1 className=' special-font hero-heading text-blue-100 '>redefi<b>n</b>e</h1>
            <p className=' mb-5 max-w-64 font-robert-regular text-blue-100'>
              Enter the Metagame <br/>Unleash the play Economy
            </p>

                <Button id="watch-trailer" title='Watch Trailer'
                leftIcon={<TiLocationArrow />}
                containerClasses="!bg-yellow-300 flex-center gap-1"
                />
          </div>
        </div>
      </div>
      <h1 className='text-black
       absolute
        bottom-5 right-5 special-font hero-heading'>
          G<b>a</b>ming
        </h1>

    </div>
  )
}

export default Hero