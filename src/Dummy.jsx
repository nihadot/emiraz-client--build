// import React, { useState } from 'react';

// function App() {
//   const [count, setCount] = useState(0); // Initialize state

//   // Log render time and current count
//   console.log(`[Render] Time: ${new Date().toLocaleTimeString()}, Count: ${count}`);

//   // Function to handle button click
//   const handleIncrement = () => {
//     console.log(`[Event] Button clicked at ${new Date().toLocaleTimeString()}`);
//     setCount(count + 1); // Update state
//   };

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={handleIncrement}>Increment</button>
//       {/* Tracker UI */}
//       <div style={{ marginTop: '20px', borderTop: '1px solid black', paddingTop: '10px' }}>
//         <h3>Tracker:</h3>
//         <ul id="tracker-log"></ul>
//       </div>
//     </div>
//   );
// }

// // Tracker Logger
// function logToTracker(message) {
//   const trackerLog = document.getElementById('tracker-log');
//   if (trackerLog) {
//     const li = document.createElement('li');
//     li.textContent = message;
//     trackerLog.appendChild(li);
//   }
// }

// export default App;



import React, { useState, useMemo } from 'react';
console.log(`[Render] first code: ${new Date().toLocaleTimeString()}`);

function App() {
  console.log("Component executed");

  const [count, setCount] = useState(0);
  console.log(`[Render] Time: ${new Date().toLocaleTimeString()}, Count: ${count}`);

  // Memoize the array so it’s created only once
  const divsArray = useMemo(() => {
    return Array.from({ length: 100000 }, (_, index) => index + 1);
  }, []);

  const handleIncrement = () => {
    console.log("Button clicked");
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <div style={{ maxHeight: "300px", overflow: "scroll", border: "1px solid black" }}>
        {divsArray.map((num) => (
          <div key={num} style={{ padding: "2px" }}>
            Div #{num}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;