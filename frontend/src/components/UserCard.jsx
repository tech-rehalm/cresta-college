

const UserCard = ({ type, cl }) => {
  return (
    <div className={`rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px] ${cl} flex justify-between`}>
      <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="font-bold">Professional Events</h1>
         <h1 className="text-xl font-light ">Commitment</h1>
      <h2 className="capitalize text-sm font-medium  ">{type}s</h2>
      </div>
      </div>
      <div
        className="radial-progress bg-primary text-primary-content border-primary border-4"
        style={{ "--value": 70 }}
        role="progressbar">
        70%
      </div>
     
    </div>
  );
};

export default UserCard;
