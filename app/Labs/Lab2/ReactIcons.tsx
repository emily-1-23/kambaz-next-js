import React from 'react'
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import { GoNorthStar } from "react-icons/go";
import { GiFallingStar } from "react-icons/gi";
import { GiStaryu } from "react-icons/gi";
import { BsStars } from "react-icons/bs";

export default function ReactIcons() {
  return (
    <div id="wd-react-icons-sampler" className="mb-4">
      <h3>React Icons Sampler</h3>
      <div className="d-flex">
        <FaRegStar className="fs-3 text" />
        <FaStarHalfStroke className="fs-3 text" />
        <GoNorthStar className="fs-3 text" />
        <GiFallingStar className="fs-3 text" />
        <GiStaryu  className="fs-3 text" />
        <BsStars  className="fs-3 text" />
      </div>
    </div>

  )
}
