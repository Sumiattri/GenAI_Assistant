function SpinnerOverlay() {
  return (
    <div className="fixed inset-0  bg-[#1B1C1D] flex items-center justify-center">
      <div className="relative h-12 w-12 animate-spin rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500">
        <div className="absolute inset-0 m-[3px] bg-[#1B1C1D] rounded-full"></div>
      </div>{" "}
    </div>
  );
}

export default SpinnerOverlay;
