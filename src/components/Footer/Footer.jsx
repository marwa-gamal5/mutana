import * as React from 'react';
import { Link } from 'react-router-dom';
import style from './Footer.module.css';
// import face from '../..//facebook.png'
// import linked from '../../img/linkedin.png'
// import youtube from '../../img/youtube.png'
// import { FontAwesomeIcon } from '@fortawesome/fontawesome-svg-core';



function Footer(props){
    return(
        <footer className= {`${style.footer_bage}  text-light `}>
    <div className=" container py-2">
       
        <hr/>
        <div className="py-3">
            <div className="row">
              
                <div className=" col-12 d-flex justify-content-end">
                    <div className="">
                        <Link className=" text-decoration-none" target="_blank" to="http://www.youtube.com/">
                            {/* <img src={youtube} alt="..."/> */}
                        </Link>
                        <Link className=" text-decoration-none" target="_blank" to=" http://www.linkedin.com/">
                            {/* <img src={linked} alt="..."/> */}
                        </Link>
                        <Link className=" text-decoration-none" target="_blank" to=" https://facebook.com/">
                            {/* <img src={face} alt="..."/> */}
                        </Link>
                    </div>
                </div>
                <div className=" col-12 d-flex justify-content-center ms-0 ">
                    <div className={`${style.prag} text-white `}>
                        <p>Arrowad Group &copy; 2022 All rights reserved.

                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
    )
}


export default Footer;