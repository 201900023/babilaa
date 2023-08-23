import Image from "next/image"
import { FaImages } from "react-icons/fa"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";

const PostInputNew = () => {
    const router = useRouter()
    const { data: session } = useSession();
    const me = session?.user!;
    return (
        <>
            <button onClick={() => { router.push('create-post') }} className="w-full  rounded-full  grid grid-cols-[50px_auto_60px] items-center py-1 bg-gray-100  ">
                <button className="flex items-center justify-center">
                    <Image
                        src={me.image || '/images/avatar-fallback.svg'}
                        width="35"
                        height="35"
                        layout="fixed"
                        alt=""
                        className="rounded-full"
                        objectFit="cover"
                    />
                </button>

                <p className=" text-purple-0 font-bold  text-left pl-2">What is on your mind?</p>

                <button className="flex items-center justify-center">
                    <FaImages color="#86579F" className=" stroke-red-400" size={22} />
                </button>
            </button>

        </>
    )
}


export default PostInputNew
