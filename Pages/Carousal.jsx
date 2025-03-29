import React from "react";
import { Link } from "react-router-dom";
import demo from "../src/assets/demo.png";
import { motion } from "framer-motion";
 
const Carousal = () => {
  return (
    <motion.div className="flex flex-col h-full w-full relative z-50" 
    >
      <div className="border-b border-b-gray-400 w-full py-5 px-3 sm:px-16 h-[60px] sm:h-[80px] flex flex-row items-center justify-between  z-11">
        {/* <img className='h-8 sm:h-13' src={logo} alt="" /> */}
        <motion.h2 className="playwrite text-lg sm:text-4xl font-bold" initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>BuildMe</motion.h2>
        {/* <button className='p-1 sm:p-3 bg-purple-700 sm:w-35 w-25 text-sm sm:text-lg rounded-full text-white cursor-pointer z-10 border-b border-b-purple-400'>Give A Star</button> */}

        <div class="relative inline-flex  group">
          <div class="absolute transitiona-all duration-1000 opacity-60 -inset-px bg-gradient-to-r from-[#f9daa5] via-[#f8f474] to-[#f9daa5] rounded-full blur-lg  group-hover:opacity-80 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
          
          <motion.a
            href="https://github.com/Navneetdadhich/buildme"
            title="Star on github"
            class="relative inline-flex items-center justify-center px-3 sm:px-6 py-2 text-sm sm:text-lg font-bold text-white transition-all duration-200 bg-gray-800 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 border-b-2 border-amber-300"
            role="button"
            initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Star On Github ⭐
          </motion.a>
        </div>
      </div>

      <div className="flex flex-col gap-10 mt-10">
        
        <div className="flex flex-col items-center justify-center text-center px-6">
          <motion.h5 className="text-3xl sm:text-7xl font-bold" initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      transition={{ duration: 0.8, ease: "easeOut" }}>Let's Create  A<br /> Modern Resume</motion.h5>
          <motion.p className="mt-5 text-sm sm:text-lg sm:font-bold" initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>Create a stunning resume with the most famous latex  themed template.<br /> BuildMe Integrates various section to enhance your resume.</motion.p>
        </div>

        <motion.div className="flex items-center justify-center"
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div class="relative inline-flex  group">
            <div class="absolute transitiona-all duration-1000 opacity-60 -inset-px bg-gradient-to-r from-[#7bd1ff] via-[#44BCFF] to-[#7bd1ff] rounded-full blur-lg group-hover:opacity-80 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
            
            <Link 
          to="/app"
          className="relative inline-flex items-center justify-center px-3 sm:px-6 py-2 text-sm sm:text-lg text-white transition-all duration-200 bg-gray-800 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          role="button"
          >
           
              Get started

          </Link>
          </div>
        </motion.div>

        <motion.div className="w-full flex items-center justify-center overflow-auto pb-6 sm:p-12" initial={{ opacity: 0}}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>
          <img
            className="rounded-lg sm:rounded-3xl min-w-[260px] sm:min-w-[800px] min-h-[300px] sm:min-h-[400px] w-full h-full shadow-[0_10px_15px_rgba(0,_0,_0,_0.3)] sm:shadow-[0_20px_30px_rgba(0,_0,_0,_0.3)] border-gray-400 border-2"
            src={demo}
            alt="Demo"
            // style={{ width: '400px', height: '400px' }}
          />
        </motion.div>
      </div>

      <div className="text-xs text-center py-2">
  <p className="">Made with <span className="heart">❤</span> by <a className="font-bold" href="https://github.com/Navneetdadhich" target="_blank" rel="noopener noreferrer">Navneet Dadhich</a></p>
  {/* <p>This Website Is Still In It's Refinement Period. Last Update Received On 20 December 2024</p> */}
</div>
    </motion.div>
  );
};

export default Carousal;
