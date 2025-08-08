import { BiSearchAlt, BiUserCircle } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import axiosPrivet from "../hooks/axiosPrivet";
import Loading from "./shared/Loading";


export default function RightSidebar() {

  const { data, isLoading, isError, error, refetch } = useQuery("getAllUsers", async () => await axiosPrivet.get("/api/users/suggestions"));
  console.log("data", data?.data)

  const handleFollow = async (id) => {
    try {
      await axiosPrivet.post(`/api/follow/${id}`)
      refetch()
    } catch (error) {
      console.log("error", error.message)
    }
  }


  return (
    <>
      <div className="min-h-full w-88">
        <div className="mt-[10px]">
          <form >
            <label className="relative max-w-[350px] md:block  hidden">
              <button
                type="submit"
                className="absolute inset-y-0 left-1 rounded pr-1 flex items-center pl-2"
              >
                <BiSearchAlt className="text-2xl text-gray-200 text-[18px]" />
              </button>
              <input
                // value={searchId}
                // onChange={(e) => setSearchId(e.target.value)}
                className=" placeholder:text-white block  w-full py-2 pl-8 pr-4 shadow-sm focus:border-blue-400 focus:outline-none border-[0.5px] border-gray-700 rounded-full focus:ring-0 text-[14px]"
                placeholder="Search"
                type="text"
                name="search"
              />
            </label>
          </form>
        </div>
        <div className="border-[0.5px] mt-[20px] border-gray-700 rounded-[16px]">
          <h3 className="text-[20px] font-semibold py-[12px] px-[16px]">Who to follow</h3>
          <div className="">
            {
              data?.data?.length > 0 && data?.data.map(user => <div key={user?.id} className="flex justify-between items-center py-[12px] px-[16px]">
                <div className="flex items-center gap-[6px]">
                  {
                    user?.avatarUrl ? <img src={user?.avatarUrl} alt={user.firstName} className="w-[40px] h-[40px] rounded-full" /> : <BiUserCircle className="w-[40px] h-[40px] rounded-full" />
                  }
                  <div>
                    <h5 className="text-[15px] font-bold">{user?.firstName} {user?.lastName}</h5>
                    <p className="text-[15px] text-gray-500">@{user?.username}</p>
                  </div>
                </div>
                <div>
                  <button className="btn text-black bg-white rounded-full" onClick={() => handleFollow(user.id)}>Follow</button>
                </div>
              </div>)
            }
          </div>
        </div>
      </div>
      {
        isLoading && <Loading />
      }
    </>

  );
}
