import { CiUser } from "react-icons/ci";
import { HiOutlineMail, HiUsers } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoBookmarkSharp, IoSearchOutline } from "react-icons/io5";
import { MdHome } from "react-icons/md";


export const leftSideRoute = [
    { name: "Home", path: "", icon: MdHome },
    { name: "Profile", path: "me", icon: CiUser },
    { name: "Explore", path: "explore", icon: IoSearchOutline },
    { name: "Notifications", path: "notifications", icon: IoMdNotificationsOutline},
    { name: "Messages", path: "messages", icon: HiOutlineMail },
    { name: "Bookmarks", path: "bookmarks", icon: IoBookmarkSharp },
    { name: "Communities", path: "communities", icon: HiUsers  },
]