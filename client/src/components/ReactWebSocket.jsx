// import React from 'react'
// import { useState } from 'react';
// import { API_KEY, URL } from './constants';

// const ReactWebSocket = () => {
//   const [question, setQuestion] = useState('');
//   const [result, setResult] = useState(undefined);

//   const payload = {
//     "contents": [{
//       "parts": [{ "text": question }]
//     }]
//   }

//   const askQuestion = async () => {
//     let response = await fetch(URL + API_KEY, {
//       method: 'POST',
//       body: JSON.stringify(payload),
//     })
//     response = await response.json();
//     setResult(response.candidates[0].content.parts[0].text);
//   }

//   return (
//     <div className='grid grid-cols-5 h-screen bg-black text-center' >
//       <div className='col-span-1 bg-zinc-800'></div>
//       <div className='col-span-4 p-10'>
//         <div className='container h-110 text-white overflow-hidden overflow-y-auto mb-5 p-5 border border-zinc-700 rounded-4xl'>
//           {result}
//         </div>
//         <div className='bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-700 flex h-16'>
//           <input value={question} type="text" onChange={(event) => setQuestion(event.target.value)} className='w-full h-full p-3 outline-none' placeholder='Ask anything' />
//           <button onClick={askQuestion}>Ask</button>
//         </div>

//       </div>
//     </div >
//   )
// }

// export default ReactWebSocket
