import { minidenticon } from 'minidenticons'
import { useMemo } from 'react'
import Image from 'next/image'

export const Avatar = ({ username, saturation, lightness, ...props }) => {
  const svgURI = useMemo(
    () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  )
  return (<Image src={svgURI} alt={username} {...props} />)
}