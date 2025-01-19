/**
 * The landing page
 * @returns 
 */
export default function Index() {
  return <div className="grid grid-cols-1 sm:grid-cols-2">
    <div className="flex flex-col  justify-center">
      <h1 className="text-5xl bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent font-bold">Manage your tasks with ease</h1>
      <p className="text-lg mt-8 text-gray-500">Manage your tasks with ease, and get things done.</p>
    </div>
    <div className="flex flex-col items-center justify-center">
    <iframe className="h-[70vh] w-[500px]" src="https://lottie.host/embed/6453cea7-5c64-48b1-92dd-8f70670c5d8e/c2rSKZui2L.lottie"></iframe>
    </div>
  </div>
}

