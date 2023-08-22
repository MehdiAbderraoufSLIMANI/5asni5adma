import React from 'react'
import "./Comment.css"


import {ReactComponent as Star} from "../../resources/logos/star.svg"
import {ReactComponent as StarEmpty} from "../../resources/logos/empty-star.svg"

const Comment = () => {
  return (
    <div className="single-comment">
      <div className="img-comment">
        <div className='image'></div>
        <div className="comment-prof-infos">
          <p>@username</p>
          <p>il ya 1 mois</p>
        </div>
      </div>
      <div className="stars">
        <Star className="start-filled"/>
        <Star className="start-filled"/>
        <Star className="start-filled"/>
        <StarEmpty className="star-empty"/>
        <StarEmpty className="star-empty"/>
      </div>
      <p className='comment-context'>
        Dolorum id doloribus earum eos magni voluptas et aut. Sequi beatae ducimus at. Explicabo ducimus dicta nostrum. Est est pariatur. Sint ut aspernatur dolor consequuntur dolore aut. Nihil hic aliquid beatae magni.
      </p>
    </div>
  )
}

export default Comment