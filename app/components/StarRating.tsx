"use client"

import React, { useState } from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

interface StarRatingProps {
  value?: number
  count?: number
  showCount?: boolean
  size?: string
  editable?: boolean
  onChange?: (rating: number) => void
}

const StarRating = ({
  value = 0,
  count,
  showCount = false,
  size = 'text-base',
  editable = false,
  onChange,
}: StarRatingProps) => {
  const [hover, setHover] = useState(0)

  // In editable mode, hover takes precedence so the user sees a live preview.
  const active = editable && hover > 0 ? hover : value

  const stars = [1, 2, 3, 4, 5].map((i) => {
    let Icon = FaRegStar
    if (active >= i) Icon = FaStar
    else if (active >= i - 0.5) Icon = FaStarHalfAlt

    return (
      <Icon
        key={i}
        className={`${size} text-dgreen dark:text-dred ${editable ? 'cursor-pointer transition-transform hover:scale-110' : ''}`}
        onClick={editable && onChange ? () => onChange(i) : undefined}
        onMouseEnter={editable ? () => setHover(i) : undefined}
        onMouseLeave={editable ? () => setHover(0) : undefined}
      />
    )
  })

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">{stars}</div>
      {showCount && (
        <span className="text-xs text-black dark:text-white opacity-60">
          {count && count > 0 ? `${value.toFixed(1)} (${count})` : 'No reviews yet'}
        </span>
      )}
    </div>
  )
}

export default StarRating
