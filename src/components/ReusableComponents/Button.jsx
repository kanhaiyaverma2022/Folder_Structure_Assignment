export const Button = ({text})=>(
   <button className={`px-px-25 py-py-05 ${text == "All Test Cases" ? "bg-active-blue":"bg-gray-100" }  font-normal  ${text == "All Test Cases" ? "text-white":"text-black" } text-xs rounded-full hover:bg-blue-600 transition-colors`}>
        <p className='whitespace-nowrap  '>{text}</p>
   </button>
)