import { useEffect } from 'react'

const SECTION_IDS = ['top', 'how', 'languages', 'care', 'legal']

/** @param {(id: string) => void} onChange */
export function useScrollSpySections(onChange) {
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    )

    if (els.length === 0) return undefined

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          onChange(visible[0].target.id)
        }
      },
      {
        rootMargin: '-18% 0px -45% 0px',
        threshold: [0, 0.12, 0.25, 0.45],
      },
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [onChange])
}
