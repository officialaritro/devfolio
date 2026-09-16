import { DialogClose } from './dialog'

const DOT = 'inline-block h-3 w-3 shrink-0 rounded-full transition-opacity'

const TrafficLights = () => {
  return (
    <div className='group flex items-center gap-2 shrink-0'>
      <DialogClose className={`${DOT} bg-[#ff5f57] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}>
        <span className='sr-only'>Close</span>
      </DialogClose>
      <span className={`${DOT} bg-[#febc2e] opacity-90 group-hover:opacity-100`} />
      <span className={`${DOT} bg-[#28c840] opacity-90 group-hover:opacity-100`} />
    </div>
  )
}

export default TrafficLights
