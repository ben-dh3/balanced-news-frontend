const DesktopLanding = () => {
    return (
      <div className="space-y-4 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
        <img className="self-center w-60" src="/title.svg" alt='Balanced News Title'></img>
        <p className="font-display text-lg text-center mb-6">
        Download the mobile app or view it right here in your browser by resizing this window to mobile size.
        </p>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <img src="/logo.png" alt="Balanced News Logo" className="w-20 h-20" />
        </div>
      </div>
    );
  };
  
  export default DesktopLanding;