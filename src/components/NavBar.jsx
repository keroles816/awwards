import React,{useEffect, useRef,useState} from 'react'
import { TiLocationArrow } from 'react-icons/ti'
import Button from './Button'
const navItems=['Nexus','Vault','Prologue','About','Contact']  
import { useWindowScroll } from 'react-use'; 
import gsap from 'gsap'
const NavBar = () => {
   
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const navContainer=useRef(null)
    const audioElementRef=useRef(null)
    const { y: currentScrollY } = useWindowScroll();
    //allow us to know when the user go back
    const[isNavVisible, setIsNavVisible] = useState(true);
    const[lastScrollY, setLastScrollY] = useState(0);
  

    useEffect(() => {
      console.log('currentScrollY:', currentScrollY);
      console.log('lastScrollY:', lastScrollY);
      console.log('navContainer.current:', navContainer.current);

      if (currentScrollY === 0) {
       
        setIsNavVisible(true);
        navContainer.current.classList.remove('floating-nav');
  
      
    }
        else if (currentScrollY > lastScrollY) {
          setIsNavVisible(false)
          navContainer.current.classList.add('floating-nav')

        }
        else if (currentScrollY < lastScrollY) {
          setIsNavVisible(true)
          navContainer.current.classList.add('floating-nav')
        }

        setLastScrollY(currentScrollY)
        


    }, [currentScrollY,lastScrollY])

    useEffect(() => {
       gsap.to(navContainer.current,{
        y :isNavVisible ? 0 : -100,
       opacity:isNavVisible ? 1 : 0,
        duration:0.2
       })



      }, [isNavVisible]);

    const toggleAudioIndicator=()=>{
        setIsAudioPlaying((prev)=>!prev)
        setIsIndicatorActive((prev)=>!prev)
    }
      useEffect(() => {
        if (isAudioPlaying) {
          audioElementRef.current.play();
        } else {
          audioElementRef.current.pause();
        }
      }, [isAudioPlaying]);


  return (
    <div ref={navContainer} className="fixed inset-x-0 
    top-4 z-50 h-16 border-none transition-all
     duration-700 sm:inset-x-6">

        <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className='flex size-full items-center justify-between p-4' >

        <div className='flex items-center gap-7'>
            <img src="/img/logo.png" alt="logo" className='w-10' />
            <Button
            id="product-button"
            title="products"
            rightIcon={<TiLocationArrow/>}
            containerClasses="bg-blue-50 
             gap-2 md:flex hidden items-center justify-center "

            />
        </div>

        <div className=' flex h-full items-center'>
          <div className='hideen md:block'>
            {navItems.map((item,index)=>(
              <a key={index} href={`#${item.toLowerCase()}`}
              className='nav-hover-btn'>{item}</a>
            ))}

          </div>

          
          <button onClick={toggleAudioIndicator}
           className='ml-10 flex items-center space-x-0.5 '>
            <audio ref={audioElementRef} 
            src="/audio/loop.mp3" 
            className='hidden'
            loop />
             
            {[1,2,3,4].map((bar)=>(
              <div key={bar} className={`indicator-line
                ${isIndicatorActive ? 'active' : ''}
              `}
              style={{animationDelay:`${bar*0.1}s`}}
              />

            ))}

          </button>
        </div>
        </nav>
        </header>
    </div>
  )
}

export default NavBar