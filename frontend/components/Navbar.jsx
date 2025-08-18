import icon from '../src/assets/sticky-note.png';

const Navbar = () => {
  return (
    <div className='p-4 flex items-center bg-[#03045e]'>
      <img src={icon} className='w-18 h-18'/>
      <h3 className='text-3xl font-bold ml-2 font-mono text-white'> Notifyy </h3>
    </div>
  )
}

export default Navbar
