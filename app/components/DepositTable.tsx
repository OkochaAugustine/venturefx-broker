export default function DepositTable() { 
  return ( 
    <div className='bg-white shadow-lg rounded-xl p-6'> 
      <h2 className='text-xl font-semibold text-gray-700 mb-4'>Recent Deposits</h2> 
      <table className='w-full text-left border-collapse'> 
        <thead> 
          <tr className='border-b'> 
            <th className='py-2'>Date</th> 
            <th className='py-2'>Amount</th> 
            <th className='py-2'>Status</th> 
          </tr> 
        </thead> 
        <tbody> 
          <tr className='border-b'> 
            <td className='py-2'>2025-08-25</td> 
            <td className='py-2'>$1,000</td> 
            <td className='py-2 text-green-600'>Completed</td> 
          </tr> 
          <tr className='border-b'> 
            <td className='py-2'>2025-08-20</td> 
            <td className='py-2'>$500</td> 
            <td className='py-2 text-yellow-600'>Pending</td> 
          </tr> 
        </tbody> 
      </table> 
    </div> 
  ) 
} 
