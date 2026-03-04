'use client';

export default function Pagination() {
  return (
    <div>
      <div className="flex p-2 justify-center bg-blue-950 gap-2">
        <button>First</button>
        <button>Previous</button>
        <button>Current</button>
        <button>Next</button>
        <button>Last</button>
      </div>
    </div>
  );
}
