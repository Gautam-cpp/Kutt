'use client';
import { useEffect, useState } from 'react';

export function UserDashboard() {
  const [history, setHistory] = useState<{ id: string; longUrl: string; shortUrl: string }[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/history', {
          credentials: 'include', 
        });

        const data = await response.json();

        if (response.ok) {
          // const history = ;
          setHistory(data.history || []); 
          setCount(data.history.length)
        } else {
          setError(data.error || 'An error occurred');
        }
      } catch (error) {
        setError('An error occurred while fetching history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="w-[1200px] max-w-full flex flex-col flex-grow-1 flex-shrink-1 basis-auto items-start py-0 px-4 mx-0 my-28">
      <h2 className="font-[300] mb-4">Recent Shortened links.</h2>
      <table className="w-full flex bg-white flex-col rounded-xl text-center overflow-auto shadow-[0_6px_15px_#a3b8c24d]">
        <thead className="bg-[#f1f3f4] rounded-tr-xl rounded-tl-xl">
          <tr className="flex justify-start items-center border-b-[1px] border-[#d5dadb]">
            <th className="p-4 mr-0 flex flex-grow-1 flex-shrink-1 basis-auto overflow-hidden">
              <p className="flex items-center font-bold text-[15px] m-0">Usage this month:</p>
            </th>
            <th className="p-4 mr-2 flex flex-grow-1 flex-shrink-1 basis-auto overflow-hidden">
              <p className="flex items-center font-normal text-[15px] m-0">
                <span className="text-[#65bd89]">{count}</span>&nbsp; / 10 Links
              </p>
            </th>
            <th className="p-4 mr-2 flex flex-grow-1 flex-shrink-1 basis-auto overflow-hidden">
              <p className="flex items-center font-normal text-[15px] m-0">
                <span className="text-[#65bd89]">0</span>&nbsp; / 100 Tracked Views
              </p>
            </th>
            <th className="p-4 mr-2 flex flex-grow-1 flex-shrink-1 basis-auto overflow-hidden">
              <p className="flex items-center font-normal text-[15px] m-0">
                <span className="text-[#65bd89]">0</span>&nbsp; / 100 Total Views
              </p>
            </th>
          </tr>
          <tr className="flex justify-start items-center border-b-[1px] border-[#d5dadb]">
            <th className="flex flex-grow-1 flex-shrink-1 basis-auto items-center p-4">
              <input
                type="text"
                className="w-auto h-8 text-[13px] py-0 px-6 rounded-[3px] border-b-2 border-none focus:ring-0 focus:outline-none"
                placeholder="Search..."
              />
            </th>
          </tr>
          <tr className="flex justify-start items-center border-b-[1px] border-[#d5dadb]">
            <th className="p-4 flex flex-grow-[7] flex-shrink-[7] basis-0">Original URL</th>
            <th className="p-4 flex flex-grow-[2.5] flex-shrink-[2.5] basis-0">Created at</th>
            <th className="p-4 flex flex-grow-[3] flex-shrink-[3] basis-0">Short link</th>
            <th className="p-4 flex flex-grow-[1] flex-shrink-[1] basis-0 justify-end">Views</th>
            <th className="p-4 flex flex-grow-[3] flex-shrink-[3] basis-0 justify-end"></th>
          </tr>
        </thead>
        <tbody className="rounded-br-[12px] rounded-bl-[12px]">
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                <span>Loading...</span>
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-red-500">
                <span>{error}</span>
              </td>
            </tr>
          ) : (
            Array.isArray(history) &&
            history.map((hs) => (
              <tr key={hs.id} className="flex py-0 px-2 rounded-b-[1px] border-[#eef0f2]">
                <td className="flex flex-col items-start justify-center flex-grow-[7] flex-shrink-[7] basis-0 p-4 relative whitespace-nowrap overflow-hidden">
                  <a href={hs.longUrl} className="no-underline cursor-pointer text-blue-500">{hs.longUrl}</a>
                </td>
                <td className="flex flex-col items-start justify-center flex-grow-[2.5] flex-shrink-[2.5] basis-0 p-4 relative whitespace-nowrap overflow-hidden">23 Hours Ago                </td>
                <td className="flex flex-col items-start justify-center flex-grow-[3] flex-shrink-[3] basis-0 p-4 relative whitespace-nowrap overflow-hidden">
                  <a href={hs.longUrl} className="no-underline cursor-pointer text-blue-500">{hs.shortUrl}</a>
                </td>
                <td className="flex flex-col  justify-end flex-grow-[1] flex-shrink-[1] basis-0 p-4 relative whitespace-nowrap overflow-hidden">0</td>
                <td className="flex flex-col items-center justify-center flex-grow-[3] flex-shrink-[3] basis-0 p-4 relative whitespace-nowrap overflow-hidden ">
                  <button className='rounded-full bg-red-200 p-1'><svg className='text-red-800 w-4 h-auto ' xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 5v6m4-6v6"></path></svg></button>
                   </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
