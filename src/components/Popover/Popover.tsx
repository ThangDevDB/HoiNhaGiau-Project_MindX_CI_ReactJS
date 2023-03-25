import React, { useState, useRef, useId } from 'react'
import { useFloating, FloatingPortal, arrow, shift, offset } from '@floating-ui/react-dom-interactions'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  renderPopover: React.ReactNode
}

export default function Popover({ children, renderPopover, className }: Props) {
  const [open, setOpen] = useState(false)
  const arrowRef = useRef<HTMLElement>(null)
  // strategy la chien luoc hien thi cua popover
  const { x, y, strategy, reference, floating, middlewareData } = useFloating({
    middleware: [offset(10), shift(), arrow({ element: arrowRef })]
    // placement: 'bottom-end'
  })
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }
  const id = useId()
  return (
    <div className={className} ref={reference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                // transformOrigin thay đổi vị trí phóng to của popover, lấy từ vị trí arrow phóng to ra
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
            >
              <span
                className='absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent
               border-b-white border-t-transparent '
                ref={arrowRef}
                // left là vị trí của arrow
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
