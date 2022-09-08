import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import paginationStyles from "/styles/Pagination.module.scss";

const Pagination = ({ current, total, setPagination, paginate }) => {
  return (
    <div className={paginationStyles.container}>
      <div className={paginationStyles.left}>
        <div className={paginationStyles.button} onClick={()=>{paginate(current-1>=1?current-1:current)}}>
          <FaArrowLeft />
        </div>
        <div className={paginationStyles.button} onClick={()=>{paginate(current+1<=total?current+1:total)}}>
          <FaArrowRight />
        </div>
      </div>
      <div className={paginationStyles.right}>
        {current > 3 ? (
            <div className={paginationStyles.button} onClick={()=>{paginate(1)}}>1</div>
        ) : (
          ""
        )}
        {current > 4 ? (
            <div className={`${paginationStyles.button} ${paginationStyles.spacer}`}>...</div>
        ) : (
          ""
        )}
        
          {new Array(total).fill(0).map((a,id)=>
            (id+1>=current - 2 && id+1 <= current + 2)?
              (<div key={id} className={`${paginationStyles.button} ${current == id+1 ? paginationStyles.active : ""}`} 
              onClick={()=>{paginate(id+1)}}
              >{id+1}</div>):('')
          )}

        {current < total-3 ? (

            <div className={`${paginationStyles.button} ${paginationStyles.spacer}`}>...</div>

        ) : (
          ""
        )}
        {current < total-2 ? (
            <div className={paginationStyles.button} onClick={()=>{paginate(total)}}>{total}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Pagination;
