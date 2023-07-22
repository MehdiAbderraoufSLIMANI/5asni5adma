import React, {useState} from 'react'

export default function StarRating({rating}) {
   
   //const getFullStars = () => {
    const emptyStars =[];
    const list = [];
    for(let i=0; i < 5; i++) {
        if(i < rating) {
            list.push(i);   
        } else {
            emptyStars.push(i)
        }
    }
    //return list;
   //}
    
   //const [fullStar, setFullStar] = useState(getFullStars())
   //const emptyStars = 5 - fullStar.length;
   //const emptyStars = 5 - list.length;

  return (
    <div className='rating-container'>
        
      { list.map(star => <i key={star} className="bi bi-star-fill"></i>)}
       
       { emptyStars.map(star => <i key={star} className="bi bi-star"></i>) }
    </div>
  )
}
